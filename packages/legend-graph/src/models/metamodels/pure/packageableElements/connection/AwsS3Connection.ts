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

import { Connection, type ConnectionVisitor } from './Connection';
import { CORE_HASH_STRUCTURE } from '../../../../../MetaModelConst';
import { hashArray } from '@finos/legend-shared';

export class AwsS3Connection extends Connection {
  partition!: AwsPartition;
  region!: string;
  bucket!: string;

  accept_ConnectionVisitor<T>(visitor: ConnectionVisitor<T>): T {
    return visitor.visit_Connection(this);
  }

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.AWS_S3_CONNECTION,
      this.partition,
      this.region,
      this.bucket,
    ]);
  }
}

export enum AwsPartition {
  AWS = 'AWS',
  AWS_CN = 'AWS_CN',
  AWS_US_GOV = 'AWS_US_GOV',
}
