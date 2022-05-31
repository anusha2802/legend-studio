import type { EditorStore } from '@finos/legend-studio';
import { ElementEditorState } from '@finos/legend-studio';
import { action, computed, makeObservable, observable } from 'mobx';
import type { PackageableElement } from '@finos/legend-graph';
import { guaranteeType } from '@finos/legend-shared';
import { Persistence } from '../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_Persistence';

export enum SERVICE_TAB {
  GENERAL = 'GENERAL',
  EXECUTION = 'EXECUTION',
  REGISTRATION = 'REGISTRATION',
}

export class PersistenceEditorState extends ElementEditorState {
  selectedTab = SERVICE_TAB.GENERAL;

  constructor(editorStore: EditorStore, element: PackageableElement) {
    super(editorStore, element);

    makeObservable(this, {
      selectedTab: observable,
      setSelectedTab: action,
      persistence: computed,
      reprocess: action,
    });
  }

  setSelectedTab(tab: SERVICE_TAB): void {
    this.selectedTab = tab;
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
    persistenceEditorState.selectedTab = this.selectedTab;
    return persistenceEditorState;
  }
}
