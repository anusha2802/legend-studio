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
	console.log("RAJAMONY debug");
	console.log(element);

    makeObservable(this, {
      persistence: computed,
      //persistenceStore: false,
      reprocess: action,
      helloNew: observable,
      setTriggerName: action,
      persistenceTrigger: flow,
      persistenceMonitor: flow,
    });
  }

  *persistenceTrigger(): GeneratorFn<void> {
    try {
	  const jobName = 'denali-trigger-' + Date.now();
	  const postobj = { jobName: jobName };
	  const baseUrl = "http://localhost:6060/api/pure/v1/codeGeneration/awsPersistence/triggertest";
      fetch(baseUrl, {
	    method: 'POST',
		body: JSON.stringify(postobj),
        headers: {
          'Content-Type': 'application/json'
	    }
	  }).then(response => {
        if (response.ok) {
          response.json().then(json => {
			this.currentMonitor = json.map((r: any, index: number) => new Monitor(r["StartedOn"], r["CompletedOn"], r["JobRunState"], r["ErrorMessage"]));
          });
        }
      });

      this.helloNew = 'Trigger ' + Date.now();

    } catch (error) {
      assertErrorThrown(error);
      this.editorStore.applicationStore.log.error(
        LogEvent.create(TRIGGER_LOG_EVENT_TYPE),
        error,
      );
      this.editorStore.applicationStore.notifyError(error);
    }
  }

  *persistenceMonitor(): GeneratorFn<void> {
    try {
      this.helloNew = 'Monitor ' + Date.now();		// FIXME: Remove this when done

	  const baseUrl = "http://localhost:6060/api/pure/v1/codeGeneration/awsPersistence/monitortest/";
	  const jobName = 'denali-monitor-' + Date.now();
	  const url = baseUrl + jobName;

      fetch(url).then(response => {
        if (response.ok) {
          response.json().then(json => {
			this.currentMonitor = json.map((r: any, index: number) => new Monitor(r["StartedOn"], r["CompletedOn"], r["JobRunState"], r["ErrorMessage"]));
          });
        }
      });
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
