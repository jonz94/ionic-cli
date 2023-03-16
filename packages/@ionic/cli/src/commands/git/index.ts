import { MetadataGroup } from '@ionic/cli-framework';

import { CommandMap, Namespace } from '../../lib/namespace';

export class GitNamespace extends Namespace {
  async getMetadata() {
    return {
      name: 'git',
      summary: 'Commands relating to managing Appflow git',
      groups: [MetadataGroup.PAID],
    };
  }

  async getCommands(): Promise<CommandMap> {
    return new CommandMap([
      ['clone', async () => { const { GitCloneCommand } = await import('./clone.js'); return new GitCloneCommand(this); }],
      ['remote', async () => { const { GitRemoteCommand } = await import('./remote.js'); return new GitRemoteCommand(this); }],
    ]);
  }
}
