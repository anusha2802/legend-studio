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

import { V1_Connection, type V1_ConnectionVisitor } from './V1_Connection';
import { CORE_HASH_STRUCTURE } from '../../../../../../../MetaModelConst';
import { Hashable, hashArray } from '@finos/legend-shared';
import type { V1_AuthenticationStrategy } from '../store/relational/connection/V1_AuthenticationStrategy';

export class V1_AwsFinCloudConnection
  extends V1_Connection
  implements Hashable
{
  authenticationStrategy!: V1_AuthenticationStrategy;
  datasetId!: string;
  apiUrl!: string;
  queryInfo!: string;

  accept_ConnectionVisitor<T>(visitor: V1_ConnectionVisitor<T>): T {
    return visitor.visit_Connection(this);
  }

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.AWS_FIN_CLOUD_CONNECTION,
      this.authenticationStrategy,
      this.datasetId,
      this.apiUrl,
      this.queryInfo,
    ]);
  }
}
