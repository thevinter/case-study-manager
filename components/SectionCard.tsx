'use client';

import Link from 'next/link';
import { useAppContext } from '@/lib/store/context';
import { getSectionProgress } from '@/lib/store/selectors';
import type { Section } from '@/types/schema';

interface SectionCardProps {
  section: Section;
}

export function SectionCard({ section }: SectionCardProps) {
  const progress = getSectionProgress(section);

  return (
    <Link
      href={`/sections/${section.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(progress.progress)}%
        </span>
      </div>
      
      {section.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{section.description}</p>
      )}

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress.progress}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>{progress.completedObjectives} / {progress.totalObjectives} objectives</span>
        {progress.totalDeliverables > 0 && (
          <span>{progress.completedDeliverables} / {progress.totalDeliverables} deliverables</span>
        )}
      </div>
    </Link>
  );
}

