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

import { type Hashable, hashArray } from '@finos/legend-shared';
import { CORE_HASH_STRUCTURE } from '../../../../../../../MetaModelConst';
import type { SetImplementationVisitor } from '../../../mapping/SetImplementation';
import type {
  RelationalMappingSpecification,
  TableAlias,
} from '../model/RelationalOperationElement';
import type { ColumnMapping } from '../model/ColumnMapping';
import { RelationalInstanceSetImplementation } from './RelationalInstanceSetImplementation';
import type { GroupByMapping } from './GroupByMapping';
import type { FilterMapping } from './FilterMapping';

export class RootRelationalInstanceSetImplementation
  extends RelationalInstanceSetImplementation
  implements RelationalMappingSpecification, Hashable
{
  columnMappings: ColumnMapping[] = [];
  filter?: FilterMapping | undefined;
  distinct?: boolean | undefined;
  groupBy?: GroupByMapping | undefined;
  mainTableAlias?: TableAlias;
  superSetImplementationId?: string | undefined;

  override accept_SetImplementationVisitor<T>(
    visitor: SetImplementationVisitor<T>,
  ): T {
    return visitor.visit_RootRelationalInstanceSetImplementation(this);
  }

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.ROOT_RELATIONAL_INSTANCE_SET_IMPLEMENTATION,
      super.hashCode,
      this.mainTableAlias?.relation.pointerHashCode ?? '',
      this.distinct?.toString() ?? '',
      hashArray(this.groupBy?.columns ?? []),
      this.filter ?? '',
      this.superSetImplementationId ?? '',
    ]);
  }
}
