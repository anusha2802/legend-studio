import { createModelSchema, primitive } from 'serializr';
import { SerializationFactory } from '@finos/legend-shared';

export class Monitor {
  startedOn!: string;
  completedOn!: string;
  jobState!: string;
  exception!: string;

  static readonly serialization = new SerializationFactory(
    createModelSchema(Monitor, {
      startedOn: primitive(),
      completedOn: primitive(),
      jobState: primitive(),
      exception: primitive(),
    }),
    {},
  );
}
