'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/lib/store/context';
import { ProgressSummary } from '@/components/ProgressSummary';
import { NextStepCard } from '@/components/NextStepCard';
import { SectionCard } from '@/components/SectionCard';
import { TemplateSelector } from '@/components/TemplateSelector';

export default function Dashboard() {
  const { state } = useAppContext();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  useEffect(() => {
    if (state.sections.length === 0) {
      const hasSeenTemplateSelector = localStorage.getItem('ux-case-study:has-seen-template');
      if (!hasSeenTemplateSelector) {
        setShowTemplateSelector(true);
      }
    }
  }, [state.sections.length]);

  const handleTemplateClose = () => {
    setShowTemplateSelector(false);
    localStorage.setItem('ux-case-study:has-seen-template', 'true');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">UX Case Study Builder</h1>
            <nav className="flex gap-4">
              <Link
                href="/sections"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-1"
              >
                Sections
              </Link>
              <Link
                href="/settings"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-1"
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ProgressSummary />
            </div>
          </div>
          <div>
            <NextStepCard />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Sections</h2>
            <Link
              href="/sections/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Add Section
            </Link>
          </div>
        </div>

        {state.sections.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No sections yet. Get started by creating your first section or choosing a template.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Choose Template
              </button>
              <Link
                href="/sections/new"
                className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Create First Section
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.sections.map((section) => (
              <SectionCard key={section.id} section={section} />
            ))}
          </div>
        )}
      </main>

      {showTemplateSelector && <TemplateSelector onClose={handleTemplateClose} />}
    </div>
  );
}
