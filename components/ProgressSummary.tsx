'use client';

import { useAppContext } from '@/lib/store/context';
import { getProgress } from '@/lib/store/selectors';

export function ProgressSummary() {
  const { state } = useAppContext();
  const progress = getProgress(state);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Overall Progress</h2>
        <span className="text-2xl font-bold" aria-label={`${Math.round(progress.overallProgress)}% complete`}>
          {Math.round(progress.overallProgress)}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4" role="progressbar" aria-valuenow={progress.overallProgress} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-300"
          style={{ width: `${progress.overallProgress}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Objectives</div>
          <div className="font-semibold">
            {progress.completedObjectives} / {progress.totalObjectives}
          </div>
        </div>
        {progress.totalDeliverables > 0 && (
          <div>
            <div className="text-gray-600">Deliverables</div>
            <div className="font-semibold">
              {progress.completedDeliverables} / {progress.totalDeliverables}
            </div>
          </div>
        )}
        <div>
          <div className="text-gray-600">Sections</div>
          <div className="font-semibold">{progress.totalSections}</div>
        </div>
      </div>
    </div>
  );
}

