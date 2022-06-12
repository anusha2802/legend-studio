import { createModelSchema, primitive } from 'serializr';
import { SerializationFactory } from '@finos/legend-shared';

export class Monitor {
  key!: string;
  startedOn!: string;
  completedOn!: string;
  jobState!: string;
  exception!: string;

  constructor(key: string, startedOn: string, completedOn: string, jobState: string, exception: string) {
    this.key = key;
    this.startedOn = startedOn;
    this.completedOn = completedOn;
    this.jobState = jobState;
    this.exception = exception;
  }

  static readonly serialization = new SerializationFactory(
    createModelSchema(Monitor, {
	  key: primitive(),
      startedOn: primitive(),
      completedOn: primitive(),
      jobState: primitive(),
      exception: primitive(),
    }),
    {},
  );
}
