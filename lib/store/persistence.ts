import type { AppState } from '@/types/schema';

const STORAGE_KEY = 'ux-case-study:v1';

export function persistState(state: AppState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to persist state:', error);
  }
}

export function hydrateState(): AppState | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as AppState;
    if (parsed.version === 1 && Array.isArray(parsed.sections)) {
      return parsed;
    }
    return null;
  } catch (error) {
    console.error('Failed to hydrate state:', error);
    return null;
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear state:', error);
  }
}

