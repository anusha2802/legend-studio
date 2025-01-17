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

import type { V1_RawVariable } from '../../model/rawValueSpecification/V1_RawVariable';
import type { V1_RawLambda } from '../../model/rawValueSpecification/V1_RawLambda';
import type { V1_RawPrimitiveInstanceValue } from './V1_RawPrimitiveInstanceValue';

export interface V1_RawValueSpecificationVisitor<T> {
  visit_Lambda(valueSpecification: V1_RawLambda): T;
  visit_Variable(valueSpecification: V1_RawVariable): T;
  visit_PrimitiveInstanceValue(
    valueSpecification: V1_RawPrimitiveInstanceValue,
  ): T;
}

export abstract class V1_RawValueSpecification {
  abstract accept_RawValueSpecificationVisitor<T>(
    visitor: V1_RawValueSpecificationVisitor<T>,
  ): T;
}
