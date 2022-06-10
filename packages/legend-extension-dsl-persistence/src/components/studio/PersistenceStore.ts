import type { ApplicationStore } from '@finos/legend-application';
import type {
  LegendStudioConfig,
  LegendStudioPluginManager,
} from '@finos/legend-studio';
import type { PersistenceEditorState } from '../PersistenceEditorState';
import type { PersistenceServerClient } from './PersistenceServerClient';
import { makeAutoObservable } from 'mobx';
import type { GraphManagerState } from '@finos/legend-graph';
import type { PackageableElement } from '@finos/legend-graph';
//import { EditorState } from '@finos/legend-studio/lib/stores/editor-state/EditorState';
import { guaranteeType } from '@finos/legend-shared';
import type { Persistence } from '../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_Persistence';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Clazz<T> = { new (...args: any[]): T };

export class PersistenceStore {
  applicationStore: ApplicationStore<LegendStudioConfig>;
  persistenceServerClient: PersistenceServerClient;
  pluginManager: LegendStudioPluginManager;

  //persistenceState: PersistenceEditorState;
  element: PackageableElement;

  // Tabs
  currentEditorState?: PersistenceEditorState | undefined;

  constructor(
    applicationStore: ApplicationStore<LegendStudioConfig>,
    persistenceServerClient: PersistenceServerClient,
    graphManagerState: GraphManagerState,
    pluginManager: LegendStudioPluginManager,
    element: Persistence,
  ) {
    makeAutoObservable(this, {
      applicationStore: false,
      persistenceServerClient: false,
      //setCurrentEditorState: action,
    });

    this.applicationStore = applicationStore;
    this.persistenceServerClient = persistenceServerClient;
    this.pluginManager = pluginManager;
    this.element = element;

    //this.persistenceState = new PersistenceEditorState(this, this.element);

    /*
    setCurrentEditorState(val: EditorState | undefined):
    void {
      this.currentEditorState = val;
    }
     */
  }

  getCurrentEditorState<T extends PersistenceEditorState>(clazz: Clazz<T>): T {
    return guaranteeType(
      this.currentEditorState,
      clazz,
      `Current editor state is not of the specified type (this is likely caused by calling this method at the wrong place)`,
    );
  }
}
