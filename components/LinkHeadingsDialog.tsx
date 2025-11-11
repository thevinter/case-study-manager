'use client';

import { useState, useEffect } from 'react';
import { useAppContext } from '@/lib/store/context';
import { getCaseStudyHeadings, getLinkedHeadingsForObjective } from '@/lib/store/selectors';
import type { Heading } from '@/types/schema';

interface LinkHeadingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string;
  objectiveId: string;
}

export function LinkHeadingsDialog({ isOpen, onClose, sectionId, objectiveId }: LinkHeadingsDialogProps) {
  const { state, dispatch } = useAppContext();
  const allHeadings = getCaseStudyHeadings(state);
  const linkedHeadings = getLinkedHeadingsForObjective(state, sectionId, objectiveId);
  const linkedHeadingIds = new Set(linkedHeadings.map((h) => h.id));
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      const ids = Array.from(linkedHeadingIds);
      setSelectedIds(new Set(ids));
    }
  }, [isOpen, sectionId, objectiveId, linkedHeadings.length]);

  if (!isOpen) return null;

  const handleToggle = (headingId: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(headingId)) {
      newSelected.delete(headingId);
    } else {
      newSelected.add(headingId);
    }
    setSelectedIds(newSelected);
  };

  const handleSave = () => {
    dispatch({
      type: 'LINK_OBJECTIVE_HEADINGS',
      payload: {
        sectionId,
        objectiveId,
        headingIds: Array.from(selectedIds),
      },
    });
    onClose();
  };

  const getHeadingPrefix = (level: number) => {
    return '#'.repeat(level) + ' ';
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="link-dialog-title"
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 id="link-dialog-title" className="text-xl font-semibold text-gray-900">
            Link Headings to Objective
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Select headings from your case study to link to this objective
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {allHeadings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No headings found in your case study.</p>
              <p className="text-sm mt-2">Create headings in the case study editor first.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {allHeadings.map((heading) => (
                <label
                  key={heading.id}
                  className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(heading.id)}
                    onChange={() => handleToggle(heading.id)}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 text-sm font-mono">
                        {getHeadingPrefix(heading.level)}
                      </span>
                      <span className="text-gray-900 font-medium">{heading.text}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 ml-6">
                      Line {heading.line + 1}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Links
          </button>
        </div>
      </div>
    </div>
  );
}

