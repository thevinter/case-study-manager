export interface ObjectiveBase {
  id: string;
  title: string;
  description?: string;
  type: 'text' | 'number' | 'checklist';
  isCompleted: boolean;
}

export interface TextObjective extends ObjectiveBase {
  type: 'text';
  value?: string;
  maxLength?: number;
}

export interface NumberObjective extends ObjectiveBase {
  type: 'number';
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface ChecklistObjective extends ObjectiveBase {
  type: 'checklist';
  items: ChecklistItem[];
}

export type Objective = TextObjective | NumberObjective | ChecklistObjective;

export interface Deliverable {
  id: string;
  label: string;
  isCompleted: boolean;
  note?: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  objectives: Objective[];
  deliverables?: Deliverable[];
  createdAt: string;
  updatedAt: string;
}

export interface Heading {
  id: string;
  level: number;
  text: string;
  line: number;
}

export interface CaseStudy {
  content: string;
  headingIndex: Heading[];
  updatedAt: string;
}

export interface ObjectiveHeadingLink {
  sectionId: string;
  objectiveId: string;
  headingId: string;
}

export interface AppState {
  version: 1;
  sections: Section[];
  caseStudy?: CaseStudy;
  objectiveHeadingLinks?: ObjectiveHeadingLink[];
}

