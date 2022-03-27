import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type LocationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Location {
  readonly id: string;
  readonly location1latitude?: string;
  readonly location1longitude?: string;
  readonly location2latitude?: string;
  readonly location2longitude?: string;
  readonly location3latitude?: string;
  readonly location3longitude?: string;
  readonly location4latitude?: string;
  readonly location4longitude?: string;
  readonly isComplete?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Location, LocationMetaData>);
  static copyOf(source: Location, mutator: (draft: MutableModel<Location, LocationMetaData>) => MutableModel<Location, LocationMetaData> | void): Location;
}