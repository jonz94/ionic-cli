import { strong } from '../../lib/color';
import { CommandMap, Namespace } from '../../lib/namespace';

export class CapacitorNamespace extends Namespace {
  async getMetadata() {
    return {
      name: 'capacitor',
      summary: 'Capacitor functionality',
      description: `
These commands integrate with Capacitor, Ionic's new native layer project which provides an alternative to Cordova for native functionality in your app.

Learn more about Capacitor:
- Main documentation: ${strong('https://ion.link/capacitor')}
      `,
    };
  }

  async getCommands(): Promise<CommandMap> {
    return new CommandMap([
      ['add', async () => { const { AddCommand } = await import('./add.js'); return new AddCommand(this); }],
      ['build', async () => { const { BuildCommand } = await import('./build.js'); return new BuildCommand(this); }],
      ['copy', async () => { const { CopyCommand } = await import('./copy.js'); return new CopyCommand(this); }],
      ['open', async () => { const { OpenCommand } = await import('./open.js'); return new OpenCommand(this); }],
      ['run', async () => { const { RunCommand } = await import('./run.js'); return new RunCommand(this); }],
      ['sync', async () => { const { SyncCommand } = await import('./sync.js'); return new SyncCommand(this); }],
      ['update', async () => { const { UpdateCommand } = await import('./update.js'); return new UpdateCommand(this); }],
    ]);
  }
}
