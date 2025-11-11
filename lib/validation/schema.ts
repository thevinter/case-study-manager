import { z } from 'zod';

const checklistItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  done: z.boolean(),
});

const textObjectiveSchema = z.object({
  id: z.string(),
  type: z.literal('text'),
  title: z.string(),
  description: z.string().optional(),
  value: z.string().optional(),
  maxLength: z.number().optional(),
  isCompleted: z.boolean(),
});

const numberObjectiveSchema = z.object({
  id: z.string(),
  type: z.literal('number'),
  title: z.string(),
  description: z.string().optional(),
  value: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  isCompleted: z.boolean(),
});

const checklistObjectiveSchema = z.object({
  id: z.string(),
  type: z.literal('checklist'),
  title: z.string(),
  description: z.string().optional(),
  items: z.array(checklistItemSchema),
  isCompleted: z.boolean(),
});

const objectiveSchema = z.discriminatedUnion('type', [
  textObjectiveSchema,
  numberObjectiveSchema,
  checklistObjectiveSchema,
]);

const deliverableSchema = z.object({
  id: z.string(),
  label: z.string(),
  isCompleted: z.boolean(),
  note: z.string().optional(),
});

const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  objectives: z.array(objectiveSchema),
  deliverables: z.array(deliverableSchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const appStateSchema = z.object({
  version: z.literal(1),
  sections: z.array(sectionSchema),
});

export type ValidatedAppState = z.infer<typeof appStateSchema>;

