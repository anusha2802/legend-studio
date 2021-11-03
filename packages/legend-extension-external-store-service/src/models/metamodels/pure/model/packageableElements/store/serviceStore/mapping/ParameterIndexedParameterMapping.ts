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

import { hashArray } from '@finos/legend-shared';
import type { Hashable } from '@finos/legend-shared';
import type { RawLambda } from '@finos/legend-graph';
import { SERVICE_STORE_HASH_STRUCTURE } from '../../../../../../../ESService_ModelUtils';
import { ServiceParameterMapping } from './ServiceParameterMapping';
import { action, computed, makeObservable, observable } from 'mobx';

export class ParameterIndexedParameterMapping
  extends ServiceParameterMapping
  implements Hashable
{
  transform!: RawLambda;

  constructor() {
    super();

    makeObservable(this, {
      transform: observable,
      setTransform: action,
      hashCode: computed,
    });
  }

  setTransform(value: RawLambda): void {
    this.transform = value;
  }

  override get hashCode(): string {
    return hashArray([
      SERVICE_STORE_HASH_STRUCTURE.PARAMETER_INDEXED_PARAMETER_MAPPING,
      this.serviceParameter.name,
      this.transform,
    ]);
  }
}