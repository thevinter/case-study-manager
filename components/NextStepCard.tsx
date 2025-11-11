'use client';

import Link from 'next/link';
import { useAppContext } from '@/lib/store/context';
import { getNextStep } from '@/lib/store/selectors';

export function NextStepCard() {
  const { state } = useAppContext();
  const nextStep = getNextStep(state);

  if (!nextStep) {
    return (
      <div className="rounded-lg border border-gray-200 bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">All Done!</h3>
        <p className="text-green-700">You've completed all objectives. Great work!</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-blue-50 p-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">Next Step</h3>
      <p className="text-blue-800 font-medium mb-1">{nextStep.objective.title}</p>
      <p className="text-blue-700 text-sm mb-4">
        in <span className="font-semibold">{nextStep.section.name}</span>
      </p>
      {nextStep.objective.description && (
        <p className="text-blue-600 text-sm mb-4">{nextStep.objective.description}</p>
      )}
      <Link
        href={`/sections/${nextStep.section.id}`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Continue
      </Link>
    </div>
  );
}

