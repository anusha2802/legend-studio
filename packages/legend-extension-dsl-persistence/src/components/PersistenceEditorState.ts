import type { EditorStore } from '@finos/legend-studio';
import {
  ElementEditorState,
  LEGEND_STUDIO_APP_EVENT,
} from '@finos/legend-studio';
import { action, computed, makeObservable, observable, flow } from 'mobx';
import type { PackageableElement } from '@finos/legend-graph';
import type { GeneratorFn, PlainObject } from '@finos/legend-shared';
import {
  assertErrorThrown,
  guaranteeType,
  LogEvent,
} from '@finos/legend-shared';
import { Persistence } from '../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_Persistence';
import { Monitor } from './studio/Monitor';
import { PersistenceServerClient } from './studio/PersistenceServerClient';
import type { PersistenceStore } from './studio/PersistenceStore';

const TRIGGER_LOG_EVENT_TYPE = 'TRIGGER_FAILURE';

export class PersistenceEditorState extends ElementEditorState {
  helloNew?: string | undefined;
  currentMonitor?: Array<Monitor> | undefined;
  //private element: Persistence | undefined;
  constructor(editorStore: EditorStore, element: PackageableElement) {
    super(editorStore, element);

    makeObservable(this, {
      persistence: computed,
      //persistenceStore: false,
      reprocess: action,
      helloNew: observable,
      setTriggerName: action,
      setMonitorOutput: action,
      persistenceTrigger: flow,

    });
  }

  *persistenceTrigger(): GeneratorFn<void> {
    try {
      this.helloNew = 'hello new' + Date.now();
      this.currentMonitor = Array(10).fill(0).map((_, i) => new Monitor(i.toString(), Date().toString(), 'SUCCESS', 'mangoes taste great'));
    } catch (error) {
      assertErrorThrown(error);
      this.editorStore.applicationStore.log.error(
        LogEvent.create(TRIGGER_LOG_EVENT_TYPE),
        error,
      );
      this.editorStore.applicationStore.notifyError(error);
    }
  }

  setTriggerName(helloNew: string | undefined): void {
    this.helloNew = helloNew;
  }

  setMonitorOutput(): void {
//	const baseUrl = `${this.baseUrl}/codeGeneration/awsPersistence/monitor/JOBNAME`;
//	this.get(baseUrl).then((response) => alert (response));
/*
	fetch("http://ip.jsontest.com/").then(response => {
	  if (response.ok) {
		response.json().then(json => {
		  alert(json);
		  console.log(json);
		});
      }
    });
*/
	// Make the monitor array be of size 10
    this.currentMonitor = Array(10).fill(0).map((_, i) => new Monitor(i.toString(), Date().toString(), 'SUCCESS', 'mangoes taste great'));
  }

  /*
  // difference in * and async fn?
  *fetchMonitorData(groupId: string, artifactId: string): GeneratorFn<void> {
    try {
      this.currentMonitor = Monitor.serialization.fromJson(
        (yield this.persistenceStore.persistenceServerClient.getMonitor(
          // create a new file for these client classes+fns ?(PersistenceStore?)
          // or in this file itself - where to define persistenceServerClient
          groupId,
          artifactId,
        )) as PlainObject<Monitor>,
      );
    } catch (error) {
      assertErrorThrown(error);
      this.persistenceStore.applicationStore.log.error(
        LogEvent.create(LEGEND_STUDIO_APP_EVENT.SDLC_MANAGER_FAILURE), // replace with right error st.
        error,
      );
    }
  }
   */

  get persistence(): Persistence {
    return guaranteeType(
      this.element,
      Persistence,
      'Element inside service editor state must be a persistence',
    );
  }

  reprocess(
    newElement: PackageableElement,
    editorStore: EditorStore,
  ): PersistenceEditorState {
    const persistenceEditorState = new PersistenceEditorState(
      editorStore,
      newElement,
    );
    return persistenceEditorState;
  }
}
