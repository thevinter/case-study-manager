'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/lib/store/context';
import { emptyTemplate, caseStudyTemplate } from '@/lib/templates';
import type { Section } from '@/types/schema';

interface TemplateSelectorProps {
  onClose: () => void;
}

export function TemplateSelector({ onClose }: TemplateSelectorProps) {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const [selectedTemplate, setSelectedTemplate] = useState<'empty' | 'case-study' | null>(null);

  const handleSelectTemplate = (template: Section[]) => {
    template.forEach((section) => {
      dispatch({ type: 'ADD_SECTION', payload: section });
    });
    onClose();
    if (template.length > 0) {
      router.push(`/sections/${template[0].id}`);
    } else {
      router.push('/sections');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose a Template</h2>
        <p className="text-gray-600 mb-6">
          Start with a template to get you going, or start from scratch.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => handleSelectTemplate(emptyTemplate)}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Empty</h3>
            <p className="text-sm text-gray-600">
              Start with a blank canvas and create your own structure.
            </p>
          </button>

          <button
            onClick={() => handleSelectTemplate(caseStudyTemplate)}
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Case Study Template</h3>
            <p className="text-sm text-gray-600">
              Pre-populated with sections and objectives based on best practices for UX case studies.
            </p>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

