import { Injectable } from '@angular/core';
import { Step, Steps, TypeFactory } from '../../model';


export interface StepKind extends Step {
  name: string;
  description: string;
  properties: any;
}
export type StepKinds = Array<StepKind>;

@Injectable()
export class StepStore {

  steps: StepKind[] = [
    {
      id: undefined,
      connection: undefined,
      action: undefined,
      name: 'Log',
      stepKind: 'log',
      description: 'Sends a message to the integration\'s log',
      configuredProperties: undefined,
      properties: {
        message: {
          type: 'string',
          displayName: 'Log Message',
          required: true,
        },
        loggingLevel: {
          type: 'hidden',
          displayName: 'Level',
          defaultValue: 'INFO',
          required: true,
        },
      },
    },
    {
      id: undefined,
      connection: undefined,
      action: undefined,
      name: 'Filter',
      description: 'Filter messages using simple scripting',
      stepKind: 'filter',
      configuredProperties: undefined,
      // TODO need to find out what properties are needed for the filter
      properties: {},
    },
    {
      id: undefined,
      connection: undefined,
      action: undefined,
      name: 'Data Mapper',
      description: 'Map fields from the input type to the output type',
      stepKind: 'datamapper',
      properties: {},
      configuredProperties: undefined,
    },
  ];

  getStepConfig(kind: string) {
    return this.steps.find((step) => step.stepKind === kind);
  }

  getSteps() {
    return this.steps;
  }


}