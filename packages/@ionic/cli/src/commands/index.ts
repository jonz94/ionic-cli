import { IProject, IonicEnvironment } from '../definitions';
import { CommandMap, Namespace, NamespaceMap } from '../lib/namespace';

export interface IonicEnvironmentDeps {
  readonly env: IonicEnvironment;
  readonly project?: IProject;
}

export class IonicNamespace extends Namespace {
  protected _env: IonicEnvironment;
  protected _project: IProject | undefined;

  constructor({ env, project }: IonicEnvironmentDeps) {
    super(undefined);
    this._env = env;
    this._project = project;
  }

  get project(): IProject | undefined {
    return this._project;
  }

  set project(p: IProject | undefined) {
    this._project = p;
  }

  get env(): IonicEnvironment {
    return this._env;
  }

  set env(env: IonicEnvironment) {
    this._env = env;
  }

  async getMetadata() {
    return {
      name: 'ionic',
      summary: '',
    };
  }

  async getNamespaces(): Promise<NamespaceMap> {
    return new NamespaceMap([
      ['config', async () => { const { ConfigNamespace } = await import('./config/index.js'); return new ConfigNamespace(this); }],
      ['cordova', async () => { const { CordovaNamespace } = await import('./cordova/index.js'); return new CordovaNamespace(this); }],
      ['capacitor', async () => { const { CapacitorNamespace } = await import('./capacitor/index.js'); return new CapacitorNamespace(this); }],
      ['deploy', async () => { const { DeployNamespace } = await import('./deploy/index.js'); return new DeployNamespace(this); }],
      ['git', async () => { const { GitNamespace } = await import('./git/index.js'); return new GitNamespace(this); }],
      ['package', async () => { const { PackageNamespace } = await import('./package/index.js'); return new PackageNamespace(this); }],
      ['ssl', async () => { const { SSLNamespace } = await import('./ssl/index.js'); return new SSLNamespace(this); }],
      ['ssh', async () => { const { SSHNamespace } = await import('./ssh/index.js'); return new SSHNamespace(this); }],
      ['monitoring', async () => { const { MonitoringNamespace } = await import('./monitoring/index.js'); return new MonitoringNamespace(this); }],
      ['doctor', async () => { const { DoctorNamespace } = await import('./doctor/index.js'); return new DoctorNamespace(this); }],
      ['integrations', async () => { const { IntegrationsNamespace } = await import('./integrations/index.js'); return new IntegrationsNamespace(this); }],
      ['enterprise', async () => { const { EnterpriseNamespace } = await import('./enterprise/index.js'); return new EnterpriseNamespace(this); }],
      ['cap', 'capacitor'],
      ['cdv', 'cordova'],
      ['i', 'integrations'],
      ['integration', 'integrations'],
    ]);
  }

  async getCommands(): Promise<CommandMap> {
    return new CommandMap([
      ['build', async () => { const { BuildCommand } = await import('./build.js'); return new BuildCommand(this); }],
      ['completion', async () => { const { CompletionCommand } = await import('./completion.js'); return new CompletionCommand(this); }],
      ['docs', async () => { const { DocsCommand } = await import('./docs.js'); return new DocsCommand(this); }],
      ['generate', async () => { const { GenerateCommand } = await import('./generate.js'); return new GenerateCommand(this); }],
      ['help', async () => { const { HelpCommand } = await import('./help.js'); return new HelpCommand(this); }],
      ['info', async () => { const { InfoCommand } = await import('./info.js'); return new InfoCommand(this); }],
      ['init', async () => { const { InitCommand } = await import('./init.js'); return new InitCommand(this); }],
      ['ionitron', async () => { const { IonitronCommand } = await import('./ionitron.js'); return new IonitronCommand(this); }],
      ['link', async () => { const { LinkCommand } = await import('./link.js'); return new LinkCommand(this); }],
      ['login', async () => { const { LoginCommand } = await import('./login.js'); return new LoginCommand(this); }],
      ['logout', async () => { const { LogoutCommand } = await import('./logout.js'); return new LogoutCommand(this); }],
      ['repair', async () => { const { RepairCommand } = await import('./repair.js'); return new RepairCommand(this); }],
      ['serve', async () => { const { ServeCommand } = await import('./serve.js'); return new ServeCommand(this); }],
      ['share', async () => { const { ShareCommand } = await import('./share.js'); return new ShareCommand(this); }],
      ['signup', async () => { const { SignupCommand } = await import('./signup.js'); return new SignupCommand(this); }],
      ['start', async () => { const { StartCommand } = await import('./start.js'); return new StartCommand(this); }],
      ['state', async () => { const { StateCommand } = await import('./state.js'); return new StateCommand(this); }],
      ['telemetry', async () => { const { TelemetryCommand } = await import('./telemetry.js'); return new TelemetryCommand(this); }],
      ['version', async () => { const { VersionCommand } = await import('./version.js'); return new VersionCommand(this); }],
      ['lab', async () => { const { LabCommand } = await import('./serve.js'); return new LabCommand(this); }],
      ['g', 'generate'],
      ['s', 'serve'],
    ]);
  }
}
