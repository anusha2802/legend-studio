import type { PlainObject } from '@finos/legend-shared';
import { AbstractServerClient } from '@finos/legend-shared';
import type { Monitor } from './Monitor';

export interface PersistenceServerClientConfig {
  groupId: string;
  artifactId: string;
  serverUrl: string;
}

export class PersistenceServerClient extends AbstractServerClient {
  constructor(config: PersistenceServerClientConfig) {
    super({
      baseUrl: config.serverUrl, //add groupId, artifactId here?
    });
  }

  // EXPERIMENTAL
  // const result = fetch("http://ip.jsontest.com/");
  // const engine = new V1_Engine({}, console.log);
  // private kaka = engine.getEngineServerClient();

  // SERVER

  private _server = (): string => `${this.baseUrl}/monitor`; //replace with proper url
  // groupId: com.rajamony, artifactId: cnas3, persistence: demo::crypto::fincloudtoredshift
  // suffix : com_rajamony_cnas3__demo_cr..

  // MONITOR

  private _monitor = (groupId: string, artifactId: string): string => {
    let suffix = 'to edit';
    return `${this._server()}/${suffix}`;
  };
  // replace with right url

  getMonitor = (
    groupId: string,
    artifactId: string,
  ): Promise<PlainObject<Monitor>> =>
    this.get(`${this._monitor(groupId, artifactId)}`);
}
