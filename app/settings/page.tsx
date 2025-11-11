'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useAppContext } from '@/lib/store/context';
import { clearState, persistState } from '@/lib/store/persistence';
import { appStateSchema } from '@/lib/validation/schema';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import type { AppState } from '@/types/schema';

export default function SettingsPage() {
  const { state, dispatch } = useAppContext();
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ux-case-study-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);

        const validationResult = appStateSchema.safeParse(parsed);
        if (!validationResult.success) {
          setImportError(
            `Invalid file format: ${validationResult.error.errors.map((e) => e.message).join(', ')}`
          );
          return;
        }

        const validatedState: AppState = validationResult.data;
        dispatch({ type: 'IMPORT_STATE', payload: { state: validatedState } });
        persistState(validatedState);
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
      } catch (error) {
        setImportError(
          error instanceof Error ? error.message : 'Failed to parse JSON file'
        );
      }
    };

    reader.onerror = () => {
      setImportError('Failed to read file');
    };

    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    clearState();
    dispatch({ type: 'RESET_STATE' });
    setShowResetDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <nav className="flex gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-1"
              >
                Dashboard
              </Link>
              <Link
                href="/sections"
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-1"
              >
                Sections
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Data</h2>
            <p className="text-gray-600 mb-4">
              Download your case study data as a JSON file. You can use this to backup your work or
              import it on another device.
            </p>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Export JSON
            </button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Data</h2>
            <p className="text-gray-600 mb-4">
              Import a previously exported JSON file. This will replace your current data.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <label
              htmlFor="import-file"
              className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors cursor-pointer"
            >
              Choose File
            </label>
            {importError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-800">{importError}</p>
              </div>
            )}
            {importSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-800">Data imported successfully!</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg border border-red-200 p-6">
            <h2 className="text-xl font-semibold text-red-900 mb-4">Danger Zone</h2>
            <p className="text-gray-600 mb-4">
              Permanently delete all your case study data. This action cannot be undone.
            </p>
            <button
              onClick={() => setShowResetDialog(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </div>

        <ConfirmDialog
          isOpen={showResetDialog}
          onClose={() => setShowResetDialog(false)}
          onConfirm={handleReset}
          title="Reset All Data"
          message="Are you sure you want to delete all your case study data? This action cannot be undone."
          confirmLabel="Delete All Data"
          confirmVariant="danger"
        />
      </main>
    </div>
  );
}

