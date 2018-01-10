import chalk from 'chalk';

import * as lodash from 'lodash';

import { contains, separateArgv, validate, validators } from '@ionic/cli-framework';
import { CommandLineInputs, CommandLineOptions, CommandMetadata, CommandPreRun } from '@ionic/cli-utils';
import { FatalException } from '@ionic/cli-utils/lib/errors';

import { CordovaCommand } from './base';

export class PlatformCommand extends CordovaCommand implements CommandPreRun {
  async getMetadata(): Promise<CommandMetadata> {
    return {
      name: 'platform',
      type: 'project',
      description: 'Manage Cordova platform targets',
      longDescription: `
Like running ${chalk.green('cordova platform')} directly, but adds default Ionic icons and splash screen resources (during ${chalk.green('add')}) and provides friendly checks.
      `,
      exampleCommands: ['', 'add ios', 'add android', 'rm ios'],
      inputs: [
        {
          name: 'action',
          description: `${chalk.green('add')}, ${chalk.green('remove')}, or ${chalk.green('update')} a platform; ${chalk.green('ls')}, ${chalk.green('check')}, or ${chalk.green('save')} all project platforms`,
        },
        {
          name: 'platform',
          description: `The platform that you would like to add (${['android', 'ios'].map(v => chalk.green(v)).join(', ')})`,
        },
      ],
      options: [
        {
          name: 'resources',
          description: `Do not pregenerate icons and splash screen resources (corresponds to ${chalk.green('add')})`,
          type: Boolean,
          default: true,
        },
      ],
    };
  }

  async preRun(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void> {
    await this.preRunChecks();

    if (options['r'] || options['noresources']) {
      options['resources'] = false;
    }

    inputs[0] = (typeof inputs[0] === 'undefined') ? 'ls' : inputs[0];
    inputs[0] = (inputs[0] === 'rm') ? 'remove' : inputs[0];
    inputs[0] = (inputs[0] === 'list') ? 'ls' : inputs[0];

    validate(inputs[0], 'action', [contains(['add', 'remove', 'update', 'ls', 'check', 'save'], {})]);

    // If the action is list, check, or save, then just end here.
    if (['ls', 'check', 'save'].includes(inputs[0])) {
      await this.runCordova(['platform', inputs[0]], {});
      throw new FatalException('', 0);
    }

    if (!inputs[1]) {
      const platform = await this.env.prompt({
        type: 'input',
        name: 'platform',
        message: `What platform would you like to ${inputs[0]} (${['android', 'ios'].map(v => chalk.green(v)).join(', ')}):`,
      });

      inputs[1] = platform.trim();
    }

    validate(inputs[1], 'platform', [validators.required]);
  }

  async run(inputs: CommandLineInputs, options: CommandLineOptions): Promise<void> {
    const { getPlatforms } = await import('@ionic/cli-utils/lib/integrations/cordova/project');
    const { filterArgumentsForCordova } = await import('@ionic/cli-utils/lib/integrations/cordova/utils');

    const [ action, platformName ] = inputs;

    const metadata = await this.getMetadata();

    const platforms = await getPlatforms(this.env.project.directory);

    if (action === 'add' && platforms.includes(platformName)) {
      this.env.log.msg(`Platform ${platformName} already exists.`);
      return;
    }

    const cordovaArgs = filterArgumentsForCordova(metadata, inputs, options);

    if ((action === 'add' || action === 'remove') && lodash.intersection(cordovaArgs, ['--save', '--nosave', '--no-save']).length === 0) {
      cordovaArgs.push('--save');
    }

    if (action === 'add') {
      const { installPlatform } = await import('@ionic/cli-utils/lib/integrations/cordova/project');
      const [ , extraArgs ] = separateArgv(inputs);
      await installPlatform(this.env, platformName, extraArgs);
    } else {
      await this.runCordova(cordovaArgs, {});
    }

    const isLoggedIn = await this.env.session.isLoggedIn();

    if (isLoggedIn && action === 'add' && options['resources'] && ['ios', 'android'].includes(platformName)) {
      await this.env.runCommand(['cordova', 'resources', platformName, '--force']);
    }

    this.env.tasks.end();
  }
}
