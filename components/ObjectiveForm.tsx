'use client';

import { useState, useEffect } from 'react';
import type { Objective, TextObjective, NumberObjective, ChecklistObjective, ChecklistItem } from '@/types/schema';

interface ObjectiveFormProps {
  objective?: Objective;
  mode?: 'edit' | 'view';
  onSave: (objective: Objective) => void;
  onCancel: () => void;
}

export function ObjectiveForm({ objective, mode = 'edit', onSave, onCancel }: ObjectiveFormProps) {
  const [type, setType] = useState<Objective['type']>(objective?.type || 'text');
  const [title, setTitle] = useState(objective?.title || '');
  const [description, setDescription] = useState(objective?.description || '');
  const [textValue, setTextValue] = useState((objective as TextObjective)?.value || '');
  const [numberValue, setNumberValue] = useState((objective as NumberObjective)?.value || 0);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    (objective as ChecklistObjective)?.items || []
  );
  const [maxLength, setMaxLength] = useState((objective as TextObjective)?.maxLength);
  const [min, setMin] = useState((objective as NumberObjective)?.min);
  const [max, setMax] = useState((objective as NumberObjective)?.max);
  const [step, setStep] = useState((objective as NumberObjective)?.step || 1);

  useEffect(() => {
    if (objective) {
      setType(objective.type);
      setTitle(objective.title);
      setDescription(objective.description || '');
      if (objective.type === 'text') {
        setTextValue(objective.value || '');
        setMaxLength(objective.maxLength);
      } else if (objective.type === 'number') {
        setNumberValue(objective.value || 0);
        setMin(objective.min);
        setMax(objective.max);
        setStep(objective.step || 1);
      } else if (objective.type === 'checklist') {
        setChecklistItems(objective.items);
      }
    }
  }, [objective]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    let newObjective: Objective;

    if (type === 'text') {
      newObjective = {
        id: objective?.id || `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'text',
        title: title.trim(),
        description: description.trim() || undefined,
        value: textValue,
        maxLength,
        isCompleted: objective?.isCompleted || false,
      } as TextObjective;
    } else if (type === 'number') {
      newObjective = {
        id: objective?.id || `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'number',
        title: title.trim(),
        description: description.trim() || undefined,
        value: numberValue,
        min,
        max,
        step,
        isCompleted: objective?.isCompleted || false,
      } as NumberObjective;
    } else {
      newObjective = {
        id: objective?.id || `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'checklist',
        title: title.trim(),
        description: description.trim() || undefined,
        items: checklistItems,
        isCompleted: objective?.isCompleted || false,
      } as ChecklistObjective;
    }

    onSave(newObjective);
  };

  const addChecklistItem = () => {
    setChecklistItems([
      ...checklistItems,
      {
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        label: '',
        done: false,
      },
    ]);
  };

  const updateChecklistItem = (id: string, updates: Partial<ChecklistItem>) => {
    setChecklistItems(
      checklistItems.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeChecklistItem = (id: string) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id));
  };

  const handleViewModeSave = () => {
    if (!objective) return;
    let updated: Objective;
    if (objective.type === 'text') {
      updated = { ...objective, value: textValue } as typeof objective;
    } else if (objective.type === 'number') {
      updated = { ...objective, value: numberValue } as typeof objective;
    } else {
      updated = { ...objective, items: checklistItems } as typeof objective;
    }
    onSave(updated);
  };

  if (mode === 'view' && objective) {
    if (objective.type === 'text') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
          <textarea
            value={textValue}
            onChange={(e) => {
              const value = e.target.value;
              if (!maxLength || value.length <= maxLength) {
                setTextValue(value);
              }
            }}
            onBlur={handleViewModeSave}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your answer..."
            maxLength={maxLength}
          />
          {maxLength && (
            <p className="text-xs text-gray-500 mt-1">
              {textValue.length} / {maxLength} characters
            </p>
          )}
        </div>
      );
    } else if (objective.type === 'number') {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <input
            type="number"
            value={numberValue}
            onChange={(e) => setNumberValue(Number(e.target.value))}
            onBlur={handleViewModeSave}
            min={min}
            max={max}
            step={step}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      );
    } else {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Items</label>
          <ul className="list-disc list-inside space-y-1">
            {checklistItems.map((item) => (
              <li key={item.id} className={item.done ? 'line-through text-gray-500' : 'text-gray-900'}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="objective-title" className="block text-sm font-medium text-gray-700 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="objective-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., What is the problem statement?"
        />
      </div>

      <div>
        <label htmlFor="objective-description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="objective-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Additional context or guidance..."
        />
      </div>

      <div>
        <label htmlFor="objective-type" className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          id="objective-type"
          value={type}
          onChange={(e) => setType(e.target.value as Objective['type'])}
          disabled={!!objective}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="checklist">Checklist</option>
        </select>
      </div>

      {type === 'text' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="text-value" className="block text-sm font-medium text-gray-700 mb-2">
              Default Value
            </label>
            <textarea
              id="text-value"
              value={textValue}
              onChange={(e) => {
                const value = e.target.value;
                if (!maxLength || value.length <= maxLength) {
                  setTextValue(value);
                }
              }}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter default text..."
              maxLength={maxLength}
            />
          </div>
          <div>
            <label htmlFor="max-length" className="block text-sm font-medium text-gray-700 mb-2">
              Max Length (optional)
            </label>
            <input
              type="number"
              id="max-length"
              value={maxLength || ''}
              onChange={(e) => setMaxLength(e.target.value ? Number(e.target.value) : undefined)}
              min={1}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {type === 'number' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="number-value" className="block text-sm font-medium text-gray-700 mb-2">
              Default Value
            </label>
            <input
              type="number"
              id="number-value"
              value={numberValue}
              onChange={(e) => setNumberValue(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="step" className="block text-sm font-medium text-gray-700 mb-2">
              Step
            </label>
            <input
              type="number"
              id="step"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              min={0.01}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-2">
              Min (optional)
            </label>
            <input
              type="number"
              id="min"
              value={min || ''}
              onChange={(e) => setMin(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-2">
              Max (optional)
            </label>
            <input
              type="number"
              id="max"
              value={max || ''}
              onChange={(e) => setMax(e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {type === 'checklist' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">Checklist Items</label>
            <button
              type="button"
              onClick={addChecklistItem}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add Item
            </button>
          </div>
          <div className="space-y-2">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex gap-2">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateChecklistItem(item.id, { label: e.target.value })}
                  placeholder="Item label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeChecklistItem(item.id)}
                  className="px-3 py-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              </div>
            ))}
            {checklistItems.length === 0 && (
              <p className="text-sm text-gray-500">No items yet. Click "Add Item" to get started.</p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {objective ? 'Update' : 'Create'} Objective
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

