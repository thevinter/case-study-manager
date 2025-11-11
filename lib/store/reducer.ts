import type { AppState, Section, Objective, Deliverable, ObjectiveHeadingLink } from '@/types/schema';
import type { AppAction } from '@/types/actions';
import type { ChecklistItem } from '@/types/schema';

const initialState: AppState = {
  version: 1,
  sections: [],
};

function updateSectionTimestamp(section: Section): Section {
  return {
    ...section,
    updatedAt: new Date().toISOString(),
  };
}

function findSectionIndex(sections: Section[], sectionId: string): number {
  return sections.findIndex((s) => s.id === sectionId);
}

function findObjectiveIndex(objectives: Objective[], objectiveId: string): number {
  return objectives.findIndex((o) => o.id === objectiveId);
}

function findDeliverableIndex(deliverables: Deliverable[], deliverableId: string): number {
  return deliverables.findIndex((d) => d.id === deliverableId);
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_SECTION': {
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };
    }

    case 'UPDATE_SECTION': {
      const index = findSectionIndex(state.sections, action.payload.id);
      if (index === -1) return state;

      const updated = updateSectionTimestamp({
        ...state.sections[index],
        ...action.payload.updates,
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, index),
          updated,
          ...state.sections.slice(index + 1),
        ],
      };
    }

    case 'DELETE_SECTION': {
      const links = state.objectiveHeadingLinks || [];
      return {
        ...state,
        sections: state.sections.filter((s) => s.id !== action.payload.id),
        objectiveHeadingLinks: links.filter((l) => l.sectionId !== action.payload.id),
      };
    }

    case 'ADD_OBJECTIVE': {
      const index = findSectionIndex(state.sections, action.payload.sectionId);
      if (index === -1) return state;

      const section = state.sections[index];
      const updated = updateSectionTimestamp({
        ...section,
        objectives: [...section.objectives, action.payload.objective],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, index),
          updated,
          ...state.sections.slice(index + 1),
        ],
      };
    }

    case 'UPDATE_OBJECTIVE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const objectiveIndex = findObjectiveIndex(section.objectives, action.payload.objectiveId);
      if (objectiveIndex === -1) return state;

      const updatedObjective = {
        ...section.objectives[objectiveIndex],
        ...action.payload.updates,
      };

      const updated = updateSectionTimestamp({
        ...section,
        objectives: [
          ...section.objectives.slice(0, objectiveIndex),
          updatedObjective,
          ...section.objectives.slice(objectiveIndex + 1),
        ],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'DELETE_OBJECTIVE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const updated = updateSectionTimestamp({
        ...section,
        objectives: section.objectives.filter((o) => o.id !== action.payload.objectiveId),
      });

      const links = state.objectiveHeadingLinks || [];
      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
        objectiveHeadingLinks: links.filter(
          (l) => !(l.sectionId === action.payload.sectionId && l.objectiveId === action.payload.objectiveId)
        ),
      };
    }

    case 'UPDATE_OBJECTIVE_VALUE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const objectiveIndex = findObjectiveIndex(section.objectives, action.payload.objectiveId);
      if (objectiveIndex === -1) return state;

      const objective = section.objectives[objectiveIndex];
      let updatedObjective: Objective;

      if (objective.type === 'text' && typeof action.payload.value === 'string') {
        updatedObjective = { ...objective, value: action.payload.value };
      } else if (objective.type === 'number' && typeof action.payload.value === 'number') {
        updatedObjective = { ...objective, value: action.payload.value };
      } else if (objective.type === 'checklist' && Array.isArray(action.payload.value)) {
        updatedObjective = { ...objective, items: action.payload.value as ChecklistItem[] };
      } else {
        return state;
      }

      const updated = updateSectionTimestamp({
        ...section,
        objectives: [
          ...section.objectives.slice(0, objectiveIndex),
          updatedObjective,
          ...section.objectives.slice(objectiveIndex + 1),
        ],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'TOGGLE_OBJECTIVE_COMPLETE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const objectiveIndex = findObjectiveIndex(section.objectives, action.payload.objectiveId);
      if (objectiveIndex === -1) return state;

      const objective = section.objectives[objectiveIndex];
      const updatedObjective = { ...objective, isCompleted: !objective.isCompleted };

      const updated = updateSectionTimestamp({
        ...section,
        objectives: [
          ...section.objectives.slice(0, objectiveIndex),
          updatedObjective,
          ...section.objectives.slice(objectiveIndex + 1),
        ],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'ADD_DELIVERABLE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const deliverables = section.deliverables || [];
      const updated = updateSectionTimestamp({
        ...section,
        deliverables: [...deliverables, action.payload.deliverable],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'UPDATE_DELIVERABLE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const deliverables = section.deliverables || [];
      const deliverableIndex = findDeliverableIndex(deliverables, action.payload.deliverableId);
      if (deliverableIndex === -1) return state;

      const updatedDeliverable = {
        ...deliverables[deliverableIndex],
        ...action.payload.updates,
      };

      const updated = updateSectionTimestamp({
        ...section,
        deliverables: [
          ...deliverables.slice(0, deliverableIndex),
          updatedDeliverable,
          ...deliverables.slice(deliverableIndex + 1),
        ],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'DELETE_DELIVERABLE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const deliverables = section.deliverables || [];
      const updated = updateSectionTimestamp({
        ...section,
        deliverables: deliverables.filter((d) => d.id !== action.payload.deliverableId),
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'TOGGLE_DELIVERABLE_COMPLETE': {
      const sectionIndex = findSectionIndex(state.sections, action.payload.sectionId);
      if (sectionIndex === -1) return state;

      const section = state.sections[sectionIndex];
      const deliverables = section.deliverables || [];
      const deliverableIndex = findDeliverableIndex(deliverables, action.payload.deliverableId);
      if (deliverableIndex === -1) return state;

      const deliverable = deliverables[deliverableIndex];
      const updatedDeliverable = { ...deliverable, isCompleted: !deliverable.isCompleted };

      const updated = updateSectionTimestamp({
        ...section,
        deliverables: [
          ...deliverables.slice(0, deliverableIndex),
          updatedDeliverable,
          ...deliverables.slice(deliverableIndex + 1),
        ],
      });

      return {
        ...state,
        sections: [
          ...state.sections.slice(0, sectionIndex),
          updated,
          ...state.sections.slice(sectionIndex + 1),
        ],
      };
    }

    case 'REORDER_SECTIONS': {
      const orderedSections = action.payload.sectionIds
        .map((id) => state.sections.find((s) => s.id === id))
        .filter((s): s is Section => s !== undefined);

      const remainingSections = state.sections.filter(
        (s) => !action.payload.sectionIds.includes(s.id)
      );

      return {
        ...state,
        sections: [...orderedSections, ...remainingSections],
      };
    }

    case 'UPDATE_CASE_STUDY': {
      return {
        ...state,
        caseStudy: {
          content: action.payload.content,
          headingIndex: action.payload.headingIndex,
          updatedAt: new Date().toISOString(),
        },
        objectiveHeadingLinks: (state.objectiveHeadingLinks || []).filter((link) =>
          action.payload.headingIndex.some((h) => h.id === link.headingId)
        ),
      };
    }

    case 'LINK_OBJECTIVE_HEADINGS': {
      const existingLinks = state.objectiveHeadingLinks || [];
      const otherLinks = existingLinks.filter(
        (l) => !(l.sectionId === action.payload.sectionId && l.objectiveId === action.payload.objectiveId)
      );
      const newLinks: ObjectiveHeadingLink[] = action.payload.headingIds.map((headingId) => ({
        sectionId: action.payload.sectionId,
        objectiveId: action.payload.objectiveId,
        headingId,
      }));
      return {
        ...state,
        objectiveHeadingLinks: [...otherLinks, ...newLinks],
      };
    }

    case 'IMPORT_STATE': {
      return {
        ...action.payload.state,
        caseStudy: action.payload.state.caseStudy,
        objectiveHeadingLinks: action.payload.state.objectiveHeadingLinks || [],
      };
    }

    case 'RESET_STATE': {
      return initialState;
    }

    default:
      return state;
  }
}

export { initialState };

