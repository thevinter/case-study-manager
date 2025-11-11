import type { AppState, Section, Objective, Heading, ObjectiveHeadingLink } from '@/types/schema';

export function getProgress(state: AppState): {
  totalSections: number;
  totalObjectives: number;
  completedObjectives: number;
  totalDeliverables: number;
  completedDeliverables: number;
  overallProgress: number;
} {
  const totalSections = state.sections.length;
  let totalObjectives = 0;
  let completedObjectives = 0;
  let totalDeliverables = 0;
  let completedDeliverables = 0;

  state.sections.forEach((section) => {
    totalObjectives += section.objectives.length;
    completedObjectives += section.objectives.filter((o) => o.isCompleted).length;

    if (section.deliverables) {
      totalDeliverables += section.deliverables.length;
      completedDeliverables += section.deliverables.filter((d) => d.isCompleted).length;
    }
  });

  const totalItems = totalObjectives + totalDeliverables;
  const completedItems = completedObjectives + completedDeliverables;
  const overallProgress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return {
    totalSections,
    totalObjectives,
    completedObjectives,
    totalDeliverables,
    completedDeliverables,
    overallProgress,
  };
}

export function getSectionProgress(section: Section): {
  totalObjectives: number;
  completedObjectives: number;
  totalDeliverables: number;
  completedDeliverables: number;
  progress: number;
} {
  const totalObjectives = section.objectives.length;
  const completedObjectives = section.objectives.filter((o) => o.isCompleted).length;
  const totalDeliverables = section.deliverables?.length || 0;
  const completedDeliverables = section.deliverables?.filter((d) => d.isCompleted).length || 0;

  const totalItems = totalObjectives + totalDeliverables;
  const completedItems = completedObjectives + completedDeliverables;
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

  return {
    totalObjectives,
    completedObjectives,
    totalDeliverables,
    completedDeliverables,
    progress,
  };
}

export function getNextStep(state: AppState): { section: Section; objective: Objective } | null {
  for (const section of state.sections) {
    const incomplete = section.objectives.find((o) => !o.isCompleted);
    if (incomplete) {
      return { section, objective: incomplete };
    }
  }
  return null;
}

export function getMissingSteps(state: AppState): Array<{ section: Section; objective: Objective }> {
  const missing: Array<{ section: Section; objective: Objective }> = [];
  for (const section of state.sections) {
    section.objectives
      .filter((o) => !o.isCompleted)
      .forEach((objective) => {
        missing.push({ section, objective });
      });
  }
  return missing;
}

export function getCaseStudyHeadings(state: AppState): Heading[] {
  return state.caseStudy?.headingIndex || [];
}

export function getObjectiveHeadingLinks(state: AppState, sectionId: string, objectiveId: string): ObjectiveHeadingLink[] {
  const links = state.objectiveHeadingLinks || [];
  return links.filter((link) => link.sectionId === sectionId && link.objectiveId === objectiveId);
}

export function getLinkedHeadingsForObjective(state: AppState, sectionId: string, objectiveId: string): Heading[] {
  const links = getObjectiveHeadingLinks(state, sectionId, objectiveId);
  const headings = getCaseStudyHeadings(state);
  const headingMap = new Map(headings.map((h) => [h.id, h]));
  return links.map((link) => headingMap.get(link.headingId)).filter((h): h is Heading => h !== undefined);
}

export function getObjectivesForHeading(state: AppState, headingId: string): Array<{ section: Section; objective: Objective }> {
  const links = state.objectiveHeadingLinks || [];
  const matchingLinks = links.filter((link) => link.headingId === headingId);
  const sectionMap = new Map(state.sections.map((s) => [s.id, s]));
  const results: Array<{ section: Section; objective: Objective }> = [];
  
  matchingLinks.forEach((link) => {
    const section = sectionMap.get(link.sectionId);
    if (section) {
      const objective = section.objectives.find((o) => o.id === link.objectiveId);
      if (objective) {
        results.push({ section, objective });
      }
    }
  });
  
  return results;
}

