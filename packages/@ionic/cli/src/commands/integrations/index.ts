import { CommandMap, Namespace } from '../../lib/namespace';

export class IntegrationsNamespace extends Namespace {
  async getMetadata() {
    return {
      name: 'integrations',
      summary: 'Manage various integrations in your app',
      description: 'Integrations, such as Cordova, can be enabled or disabled in your app with these commands.',
    };
  }

  async getCommands(): Promise<CommandMap> {
    return new CommandMap([
      ['enable', async () => { const { IntegrationsEnableCommand } = await import('./enable.js'); return new IntegrationsEnableCommand(this); }],
      ['disable', async () => { const { IntegrationsDisableCommand } = await import('./disable.js'); return new IntegrationsDisableCommand(this); }],
      ['list', async () => { const { IntegrationsListCommand } = await import('./list.js'); return new IntegrationsListCommand(this); }],
      ['ls', 'list'],
      ['en', 'enable'],
      ['add', 'enable'],
      ['dis', 'disable'],
      ['delete', 'disable'],
      ['del', 'disable'],
      ['remove', 'disable'],
      ['rm', 'disable'],
    ]);
  }
}
