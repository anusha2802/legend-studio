import {
  AppendOnly,
  Auditing,
  BatchMilestoningMode,
  BatchPersister,
  BitemporalDelta,
  BitemporalSnapshot,
  DeduplicationStrategy,
  FlatTargetSpecification,
  GroupedFlatTargetSpecification,
  MergeStrategy,
  NestedTargetSpecification,
  NonMilestonedDelta,
  NonMilestonedSnapshot,
  OpaqueTrigger,
  PersistencePipe,
  Persister,
  Reader,
  ServiceReader,
  StreamingPersister,
  TargetSpecification,
  TransactionMilestoning,
  Trigger,
  UnitemporalDelta,
  UnitemporalSnapshot,
  ValidityDerivation,
  ValidityMilestoning,
} from '../../../../../../metamodels/pure/model/packageableElements/persistence/Persistence';
import {
  V1_AppendOnly,
  V1_Auditing,
  V1_BatchMilestoningMode,
  V1_BatchPersister,
  V1_BitemporalDelta,
  V1_BitemporalSnapshot,
  V1_DeduplicationStrategy,
  V1_FlatTargetSpecification,
  V1_GroupedFlatTargetSpecification,
  V1_MergeStrategy,
  V1_NestedTargetSpecification,
  V1_NonMilestonedDelta,
  V1_NonMilestonedSnapshot,
  V1_OpaqueTrigger,
  V1_PersistencePipe,
  V1_Persister,
  V1_Reader,
  V1_ServiceReader,
  V1_StreamingPersister,
  V1_TargetSpecification,
  V1_TransactionMilestoning,
  V1_Trigger,
  V1_UnitemporalDelta,
  V1_UnitemporalSnapshot,
  V1_ValidityDerivation,
  V1_ValidityMilestoning,
} from '../../../model/packageableElements/persistence/V1_Persistence';
import type { V1_GraphTransformerContext } from '@finos/legend-graph';
import { UnsupportedOperationError } from '@finos/legend-shared';

/**********
 * pipe
 **********/

export const V1_transformPersistencePipe = (
  element: PersistencePipe,
  context: V1_GraphTransformerContext,
): V1_PersistencePipe => {
  const protocol = new V1_PersistencePipe();
  protocol.documentation = element.documentation;
  protocol.owners = element.owners;
  protocol.trigger = V1_transformTrigger(element.trigger, context);
  protocol.reader = V1_transformReader(element.reader, context);
  protocol.persister = V1_transformPersister(element.persister, context);
  return protocol;
};

/**********
 * trigger
 **********/

export const V1_transformTrigger = (
  element: Trigger,
  context: V1_GraphTransformerContext,
): V1_Trigger => {
  if (element instanceof OpaqueTrigger) {
    return new V1_OpaqueTrigger();
  }
  throw new UnsupportedOperationError(
    `Unable to transform trigger '${element}'`,
  );
};

/**********
 * reader
 **********/

export const V1_transformReader = (
  element: Reader,
  context: V1_GraphTransformerContext,
): V1_Reader => {
  if (element instanceof ServiceReader) {
    const protocol = new V1_ServiceReader();
    protocol.service = `${element.service.value.package}::${element.service.value.name}`;
    return protocol;
  }
  throw new UnsupportedOperationError(
    `Unable to transform reader '${element}'`,
  );
};

/**********
 * persister
 **********/

export const V1_transformPersister = (
  element: Persister,
  context: V1_GraphTransformerContext,
): V1_Persister => {
  if (element instanceof StreamingPersister) {
    return new V1_StreamingPersister();
  } else if (element instanceof BatchPersister) {
    const protocol = new V1_BatchPersister();
    protocol.targetSpecification = V1_transformTargetSpecification(
      element.targetSpecification,
      context,
    );
    return protocol;
  }
  throw new UnsupportedOperationError(
    `Unable to transform persister '${element}'`,
  );
};

/**********
 * target specification
 **********/

export const V1_transformTargetSpecification = (
  element: TargetSpecification,
  context: V1_GraphTransformerContext,
): V1_TargetSpecification => {
  if (element instanceof GroupedFlatTargetSpecification) {
    return V1_transformGroupedFlatTargetSpecification(element, context);
  } else if (element instanceof FlatTargetSpecification) {
    return V1_transformFlatTargetSpecification(element, context);
  } else if (element instanceof NestedTargetSpecification) {
    return V1_transformNestedTargetSpecification(element, context);
  }
  throw new UnsupportedOperationError(
    `Unable to transform target specification '${element}'`,
  );
};

export const V1_transformGroupedFlatTargetSpecification = (
  element: GroupedFlatTargetSpecification,
  context: V1_GraphTransformerContext,
): V1_GroupedFlatTargetSpecification => {
  const protocol = new V1_GroupedFlatTargetSpecification();
  return protocol;
};

export const V1_transformFlatTargetSpecification = (
  element: FlatTargetSpecification,
  context: V1_GraphTransformerContext,
): V1_FlatTargetSpecification => {
  const protocol = new V1_FlatTargetSpecification();
  protocol.modelClass = `${element.modelClass.value.package}::${element.modelClass.value.name}`;
  protocol.targetName = element.targetName;
  protocol.partitionProperties = element.partitionProperties;
  protocol.deduplicationStrategy = V1_transformDeduplicationStrategy(
    element.deduplicationStrategy,
    context,
  );
  protocol.batchMode = V1_transformBatchMilestoningMode(
    element.batchMilestoningMode,
    context,
  );
  return protocol;
};

export const V1_transformNestedTargetSpecification = (
  element: NestedTargetSpecification,
  context: V1_GraphTransformerContext,
): V1_NestedTargetSpecification => {
  const protocol = new V1_NestedTargetSpecification();
  return protocol;
};

/**********
 * deduplication strategy
 **********/

export const V1_transformDeduplicationStrategy = (
  element: DeduplicationStrategy,
  context: V1_GraphTransformerContext,
): V1_DeduplicationStrategy => {
  throw new UnsupportedOperationError(
    `Unable to transform deduplicationStrategy '${element}'`,
  );
};

/**********
 * batch mode
 **********/

export const V1_transformBatchMilestoningMode = (
  element: BatchMilestoningMode,
  context: V1_GraphTransformerContext,
): V1_BatchMilestoningMode => {
  if (element instanceof NonMilestonedSnapshot) {
    const protocol = new V1_NonMilestonedSnapshot();
    protocol.auditing = V1_transformAuditing(element.auditing, context);
    return protocol;
  } else if (element instanceof UnitemporalSnapshot) {
    const protocol = new V1_UnitemporalSnapshot();
    protocol.transactionMilestoning = V1_transformTransactionMilestoning(
      element.transactionMilestoning,
      context,
    );
    return protocol;
  } else if (element instanceof BitemporalSnapshot) {
    const protocol = new V1_BitemporalSnapshot();
    protocol.transactionMilestoning = V1_transformTransactionMilestoning(
      element.transactionMilestoning,
      context,
    );
    protocol.validityMilestoning = V1_transformValidityMilestoning(
      element.validityMilestoning,
      context,
    );
    protocol.validityDerivation = V1_transformValidityDerivation(
      element.validityDerivation,
      context,
    );
    return protocol;
  } else if (element instanceof NonMilestonedDelta) {
    const protocol = new V1_NonMilestonedDelta();
    protocol.auditing = V1_transformAuditing(element.auditing, context);
    return protocol;
  } else if (element instanceof UnitemporalDelta) {
    const protocol = new V1_UnitemporalDelta();
    protocol.mergeStrategy = V1_transformMergeStrategy(
      element.mergeStrategy,
      context,
    );
    protocol.transactionMilestoning = V1_transformTransactionMilestoning(
      element.transactionMilestoning,
      context,
    );
    return protocol;
  } else if (element instanceof BitemporalDelta) {
    const protocol = new V1_BitemporalDelta();
    protocol.mergeStrategy = V1_transformMergeStrategy(
      element.mergeStrategy,
      context,
    );
    protocol.transactionMilestoning = V1_transformTransactionMilestoning(
      element.transactionMilestoning,
      context,
    );
    protocol.validityMilestoning = V1_transformValidityMilestoning(
      element.validityMilestoning,
      context,
    );
    protocol.validityDerivation = V1_transformValidityDerivation(
      element.validityDerivation,
      context,
    );
    return protocol;
  } else if (element instanceof AppendOnly) {
    return new V1_AppendOnly();
  }
  throw new UnsupportedOperationError(
    `Unable to transform batch milestoning mode '${element}'`,
  );
};

// merge strategy

export const V1_transformMergeStrategy = (
  element: MergeStrategy,
  context: V1_GraphTransformerContext,
): V1_MergeStrategy => {
  throw new UnsupportedOperationError(
    `Unable to transform merge strategy '${element}'`,
  );
};

/**********
 * auditing
 **********/

export const V1_transformAuditing = (
  element: Auditing,
  context: V1_GraphTransformerContext,
): V1_Auditing => {
  throw new UnsupportedOperationError(
    `Unable to transform auditing '${element}'`,
  );
};

/**********
 * transaction milestoning
 **********/

export const V1_transformTransactionMilestoning = (
  element: TransactionMilestoning,
  context: V1_GraphTransformerContext,
): V1_TransactionMilestoning => {
  throw new UnsupportedOperationError(
    `Unable to transform transaction milestoning '${element}'`,
  );
};

/**********
 * validity milestoning
 **********/

export const V1_transformValidityMilestoning = (
  element: ValidityMilestoning,
  context: V1_GraphTransformerContext,
): V1_ValidityMilestoning => {
  throw new UnsupportedOperationError(
    `Unable to transform validity milestoning '${element}'`,
  );
};

export const V1_transformValidityDerivation = (
  element: ValidityDerivation,
  context: V1_GraphTransformerContext,
): V1_ValidityDerivation => {
  throw new UnsupportedOperationError(
    `Unable to transform validity derivation '${element}'`,
  );
};
