'use client';

import { createContext, useContext, useReducer, useMemo, useEffect, type ReactNode } from 'react';
import { appReducer, initialState } from './reducer';
import type { AppState } from '@/types/schema';
import type { AppAction } from '@/types/actions';
import { hydrateState, persistState } from './persistence';

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const hydrated = hydrateState();
    if (hydrated) {
      dispatch({ type: 'IMPORT_STATE', payload: { state: hydrated } });
    }
  }, []);

  useEffect(() => {
    if (state.sections.length > 0 || localStorage.getItem('ux-case-study:v1')) {
      persistState(state);
    }
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

