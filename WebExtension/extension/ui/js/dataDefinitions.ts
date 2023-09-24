// dataDefinitions.ts

// Interfaces
export interface Item {
  helpIcon: string;
  helpIconText: string;
  helpCheck?: string;
  helpUrl?: string;
  name: string;
  id: string;
  resource_path: string;
  css: string | string[];
  addScript: string | string[];
  removeScript: string | string[];
  refForCheck?: string;
  refForCheckLink?: string;
  description?: string;
}

export interface Fieldset {
  name: string;
  helpSection: string;
  items: Item[];
  refForGroup?: string;
  refForGroupLink?: string;
}

export interface Tab {
  name: string;
  helpUrl: string;
  fieldsets: Fieldset[];
}

// Classes
export class TabClass {
  name: string = "";
  fieldsets: Fieldset[] = [];
  helpUrl?: string;
}

export class FieldsetClass {
  name: string = "";
  helpSection?: string;
  items: Item[] = [];
}

export class ItemClass {
  helpCheck?: string;
  helpUrl?: string;
  helpIcon?: string;
  helpIconText?: string;
  name: string = "";
  id: string = "";
  resource_path: string = "";
  css: string[] | string | null = null;
  addScript?: string[] | string | null = null;
  removeScript?: string[] | string | null = null;
}

export class InternalRequest {
  type: string = "";
  setting?: string = "";
  value?: boolean = false;
  values?: Array<any>;
}

export class InternalResponse {
  setting?: string;
  value?: boolean;
  values?: Map<string, boolean>;
}

export class Options {
  tabs: Tab[] = [];
}
