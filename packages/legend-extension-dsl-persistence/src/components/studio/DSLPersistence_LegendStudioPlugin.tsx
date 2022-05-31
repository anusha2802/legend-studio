/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import packageJson from '../../../package.json';
import { MeteorIcon } from '@finos/legend-art';
import type { PackageableElement } from '@finos/legend-graph';
import {
  type DSL_LegendStudioPlugin_Extension,
  type EditorStore,
  type ElementEditorState,
  type ElementEditorStateCreator,
  type ElementIconGetter,
  type ElementProjectExplorerDnDTypeGetter,
  type ElementTypeGetter,
  type NewElementFromStateCreator,
  type NewElementState,
  LegendStudioPlugin,
  UnsupportedElementEditorState,
} from '@finos/legend-studio';
import { Persistence } from '../../models/metamodels/pure/model/packageableElements/persistence/DSLPersistence_Persistence';
import { PersistenceEditorState } from '../PersistenceEditorState';

const PERSISTENCE_ELEMENT_TYPE = 'PERSISTENCE';
const PERSISTENCE_ELEMENT_PROJECT_EXPLORER_DND_TYPE =
  'PROJECT_EXPLORER_PERSISTENCE';

export class DSLPersistence_LegendStudioPlugin
  extends LegendStudioPlugin
  implements DSL_LegendStudioPlugin_Extension
{
  constructor() {
    super(packageJson.extensions.studioPlugin, packageJson.version);
  }

  getExtraSupportedElementTypes(): string[] {
    return [PERSISTENCE_ELEMENT_TYPE];
  }

  getExtraElementTypeGetters(): ElementTypeGetter[] {
    return [
      (element: PackageableElement): string | undefined => {
        if (element instanceof Persistence) {
          return PERSISTENCE_ELEMENT_TYPE;
        }
        return undefined;
      },
    ];
  }

  getExtraElementIconGetters(): ElementIconGetter[] {
    return [
      (type: string): React.ReactNode | undefined => {
        if (type === PERSISTENCE_ELEMENT_TYPE) {
          return (
            <div className="icon icon--persistence">
              <MeteorIcon />
            </div>
          );
        }
        return undefined;
      },
    ];
  }

  getExtraNewElementFromStateCreators(): NewElementFromStateCreator[] {
    return [
      (
        type: string,
        name: string,
        state: NewElementState,
      ): PackageableElement | undefined => {
        if (type === PERSISTENCE_ELEMENT_TYPE) {
          return new Persistence(name);
        }
        return undefined;
      },
    ];
  }

  getExtraElementEditorStateCreators(): ElementEditorStateCreator[] {
    return [
      (
        editorStore: EditorStore,
        element: PackageableElement,
      ): ElementEditorState | undefined => {
        if (element instanceof Persistence) {
          return new PersistenceEditorState(editorStore, element);
        }
        return undefined;
      },
    ];
  }

  getExtraElementProjectExplorerDnDTypeGetters(): ElementProjectExplorerDnDTypeGetter[] {
    return [
      (element: PackageableElement): string | undefined => {
        if (element instanceof Persistence) {
          return PERSISTENCE_ELEMENT_PROJECT_EXPLORER_DND_TYPE;
        }
        return undefined;
      },
    ];
  }

  getExtraGrammarTextEditorDnDTypes(): string[] {
    return [PERSISTENCE_ELEMENT_PROJECT_EXPLORER_DND_TYPE];
  }
}
