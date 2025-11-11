'use client';

import { useState } from 'react';
import { useAppContext } from '@/lib/store/context';
import { ObjectiveForm } from './ObjectiveForm';
import { ConfirmDialog } from './ConfirmDialog';
import type { Objective } from '@/types/schema';

interface ObjectiveListProps {
  sectionId: string;
}

export function ObjectiveList({ sectionId }: ObjectiveListProps) {
  const { state, dispatch } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [objectiveToDelete, setObjectiveToDelete] = useState<string | null>(null);

  const section = state.sections.find((s) => s.id === sectionId);
  if (!section) return null;

  let objectives = section.objectives;
  if (filter === 'completed') {
    objectives = objectives.filter((o) => o.isCompleted);
  } else if (filter === 'pending') {
    objectives = objectives.filter((o) => !o.isCompleted);
  }

  const handleAdd = (objective: Objective) => {
    dispatch({ type: 'ADD_OBJECTIVE', payload: { sectionId, objective } });
    setShowAddForm(false);
  };

  const handleDeleteClick = (objectiveId: string) => {
    setObjectiveToDelete(objectiveId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (objectiveToDelete) {
      dispatch({ type: 'DELETE_OBJECTIVE', payload: { sectionId, objectiveId: objectiveToDelete } });
      setObjectiveToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleToggleComplete = (objectiveId: string) => {
    dispatch({ type: 'TOGGLE_OBJECTIVE_COMPLETE', payload: { sectionId, objectiveId } });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Objectives</h2>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
            >
              Add Objective
            </button>
          )}
        </div>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <ObjectiveForm
            onSave={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {objectives.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {filter === 'all' ? 'No objectives yet.' : `No ${filter} objectives.`}
        </div>
      ) : (
        <div className="space-y-4">
          {objectives.map((objective) => (
            <div
              key={objective.id}
              className={`border rounded-lg p-4 ${
                objective.isCompleted ? 'bg-gray-50 border-gray-200' : 'border-gray-200 bg-white'
              }`}
            >
              {editingId === objective.id ? (
                <ObjectiveForm
                  objective={objective}
                  onSave={(updated) => {
                    dispatch({
                      type: 'UPDATE_OBJECTIVE',
                      payload: {
                        sectionId,
                        objectiveId: objective.id,
                        updates: updated,
                      },
                    });
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={objective.isCompleted}
                          onChange={() => handleToggleComplete(objective.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                          aria-label={`Mark "${objective.title}" as ${objective.isCompleted ? 'incomplete' : 'complete'}`}
                        />
                        <h3 className={`text-lg font-semibold ${objective.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {objective.title}
                        </h3>
                      </div>
                      {objective.description && (
                        <p className="text-sm text-gray-600 mt-1 ml-8">{objective.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => setEditingId(objective.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(objective.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="ml-8 mt-3">
                    <ObjectiveForm
                      objective={objective}
                      mode="view"
                      onSave={(updated) => {
                        if (objective.type === 'text' && updated.type === 'text') {
                          dispatch({
                            type: 'UPDATE_OBJECTIVE_VALUE',
                            payload: {
                              sectionId,
                              objectiveId: objective.id,
                              value: updated.value || '',
                            },
                          });
                        } else if (objective.type === 'number' && updated.type === 'number') {
                          dispatch({
                            type: 'UPDATE_OBJECTIVE_VALUE',
                            payload: {
                              sectionId,
                              objectiveId: objective.id,
                              value: updated.value || 0,
                            },
                          });
                        } else if (objective.type === 'checklist' && updated.type === 'checklist') {
                          dispatch({
                            type: 'UPDATE_OBJECTIVE_VALUE',
                            payload: {
                              sectionId,
                              objectiveId: objective.id,
                              value: updated.items,
                            },
                          });
                        }
                      }}
                      onCancel={() => {}}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setObjectiveToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Objective"
        message="Are you sure you want to delete this objective? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}

