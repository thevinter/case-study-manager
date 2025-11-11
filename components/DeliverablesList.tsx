'use client';

import { useState } from 'react';
import { useAppContext } from '@/lib/store/context';
import { ConfirmDialog } from './ConfirmDialog';
import type { Deliverable } from '@/types/schema';

interface DeliverablesListProps {
  sectionId: string;
}

export function DeliverablesList({ sectionId }: DeliverablesListProps) {
  const { state, dispatch } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deliverableToDelete, setDeliverableToDelete] = useState<string | null>(null);

  const section = state.sections.find((s) => s.id === sectionId);
  if (!section || !section.deliverables) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const newDeliverable: Deliverable = {
      id: `deliv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      label: newLabel.trim(),
      isCompleted: false,
    };

    dispatch({ type: 'ADD_DELIVERABLE', payload: { sectionId, deliverable: newDeliverable } });
    setNewLabel('');
    setShowAddForm(false);
  };

  const handleToggle = (deliverableId: string) => {
    dispatch({ type: 'TOGGLE_DELIVERABLE_COMPLETE', payload: { sectionId, deliverableId } });
  };

  const handleDeleteClick = (deliverableId: string) => {
    setDeliverableToDelete(deliverableId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deliverableToDelete) {
      dispatch({ type: 'DELETE_DELIVERABLE', payload: { sectionId, deliverableId: deliverableToDelete } });
      setDeliverableToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Deliverables</h2>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
          >
            Add Deliverable
          </button>
        )}
      </div>

      {showAddForm && (
        <form onSubmit={handleAdd} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Deliverable name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setNewLabel('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {section.deliverables.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No deliverables yet.</div>
      ) : (
        <div className="space-y-2">
          {section.deliverables.map((deliverable) => (
            <div
              key={deliverable.id}
              className={`flex items-center gap-3 p-3 rounded-md border ${
                deliverable.isCompleted
                  ? 'bg-gray-50 border-gray-200'
                  : 'bg-white border-gray-200'
              }`}
            >
              <input
                type="checkbox"
                checked={deliverable.isCompleted}
                onChange={() => handleToggle(deliverable.id)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                aria-label={`Mark "${deliverable.label}" as ${deliverable.isCompleted ? 'incomplete' : 'complete'}`}
              />
              <span
                className={`flex-1 ${deliverable.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}
              >
                {deliverable.label}
              </span>
              <button
                onClick={() => handleDeleteClick(deliverable.id)}
                className="px-2 py-1 text-sm text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeliverableToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Deliverable"
        message="Are you sure you want to delete this deliverable? This action cannot be undone."
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  );
}

