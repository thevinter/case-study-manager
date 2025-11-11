import type { Section, Objective, Deliverable, AppState, Heading, ChecklistItem } from './schema';

export type AppAction =
  | { type: 'ADD_SECTION'; payload: Section }
  | { type: 'UPDATE_SECTION'; payload: { id: string; updates: Partial<Omit<Section, 'id' | 'createdAt' | 'updatedAt'>> } }
  | { type: 'DELETE_SECTION'; payload: { id: string } }
  | { type: 'ADD_OBJECTIVE'; payload: { sectionId: string; objective: Objective } }
  | { type: 'UPDATE_OBJECTIVE'; payload: { sectionId: string; objectiveId: string; updates: Partial<Objective> } }
  | { type: 'DELETE_OBJECTIVE'; payload: { sectionId: string; objectiveId: string } }
  | { type: 'UPDATE_OBJECTIVE_VALUE'; payload: { sectionId: string; objectiveId: string; value: string | number | ChecklistItem[] } }
  | { type: 'TOGGLE_OBJECTIVE_COMPLETE'; payload: { sectionId: string; objectiveId: string } }
  | { type: 'ADD_DELIVERABLE'; payload: { sectionId: string; deliverable: Deliverable } }
  | { type: 'UPDATE_DELIVERABLE'; payload: { sectionId: string; deliverableId: string; updates: Partial<Deliverable> } }
  | { type: 'DELETE_DELIVERABLE'; payload: { sectionId: string; deliverableId: string } }
  | { type: 'TOGGLE_DELIVERABLE_COMPLETE'; payload: { sectionId: string; deliverableId: string } }
  | { type: 'REORDER_SECTIONS'; payload: { sectionIds: string[] } }
  | { type: 'UPDATE_CASE_STUDY'; payload: { content: string; headingIndex: Heading[] } }
  | { type: 'LINK_OBJECTIVE_HEADINGS'; payload: { sectionId: string; objectiveId: string; headingIds: string[] } }
  | { type: 'IMPORT_STATE'; payload: { state: AppState } }
  | { type: 'RESET_STATE' };

