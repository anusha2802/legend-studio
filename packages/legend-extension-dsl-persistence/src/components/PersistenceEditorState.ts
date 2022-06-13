import type { EditorStore } from '@finos/legend-studio';
import {
  ElementEditorState,
  LEGEND_STUDIO_APP_EVENT,
} from '@finos/legend-studio';
import { action, computed, makeObservable, observable, flow } from 'mobx';
import type { Package, PackageableElement } from '@finos/legend-graph';
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
  // element: PackageableElement | undefined;

  // FIXME: This needs to come from engine
  static baseUrl: string = 'http://localhost:6060/api/pure/v1/codeGeneration/awsPersistence/';

  constructor(editorStore: EditorStore, element: PackageableElement) {
    super(editorStore, element);

    makeObservable(this, {
      persistence: computed,
      //persistenceStore: false,
      reprocess: action,
      helloNew: observable,
	  currentMonitor: observable,
      setTriggerName: action,
      persistenceTrigger: flow,
      persistenceMonitor: flow,
    });
  }

  getPersistenceName(p: Package | undefined): Array<string> {
    if (p === undefined) {
	    return [] as string[];
	}
	else {
	    return (p!.name == 'ROOT') ? [] as string[] : [ ...this.getPersistenceName(p!.package), p!.name];
	}
  }

  *persistenceTrigger(): GeneratorFn<void> {
    try {
	  const pname = [ ...this.getPersistenceName(this.element.package), this.element.name].join('_');
	  console.log('Triggering : ' + pname);

	  const jobName = pname; // FIXME: This should include groupId and artifactId
	  const postobj = { jobName: jobName };
	  const url = PersistenceEditorState.baseUrl + 'trigger';
      fetch(url, {
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

      this.helloNew = 'Trigger ' + Date.now();		// FIXME: Remove this when debug done

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
	  const pname = [ ...this.getPersistenceName(this.element.package), this.element.name].join('_');
	  console.log('Monitoring : ' + pname);

	  const jobName = pname; // FIXME: This should include groupId and artifactId
	  const url = PersistenceEditorState.baseUrl + 'monitor/' + jobName;

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
