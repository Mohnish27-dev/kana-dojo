'use client';

import useKanaStore from '../store/useKanaStore';

/**
 * Kana Selection Facade - Public API for selection state
 *
 * Abstracts the internal Kana store structure
 */

export interface KanaSelection {
  selectedGroupIndices: number[];
  totalSelected: number;
  isEmpty: boolean;
  gameMode: string;
}

export interface KanaSelectionActions {
  addGroup: (index: number) => void;
  addGroups: (indices: number[]) => void;
  clearSelection: () => void;
  selectAll: () => void;
  isGroupSelected: (index: number) => boolean;
  setGameMode: (mode: string) => void;
}

export function useKanaSelection(): KanaSelection & KanaSelectionActions {
  const store = useKanaStore();

  return {
    // State
    selectedGroupIndices: store.kanaGroupIndices,
    totalSelected: store.kanaGroupIndices.length,
    isEmpty: store.kanaGroupIndices.length === 0,
    gameMode: store.selectedGameModeKana,

    // Actions
    addGroup: store.addKanaGroupIndex,
    addGroups: store.addKanaGroupIndices,
    clearSelection: () => {
      // Toggle all currently selected groups to clear them
      store.addKanaGroupIndices(store.kanaGroupIndices);
    },
    selectAll: () => {
      // Select all 69 kana groups (based on kana.ts data)
      const allIndices = Array.from({ length: 69 }, (_, i) => i);
      store.addKanaGroupIndices(allIndices);
    },
    isGroupSelected: (index: number) => store.kanaGroupIndices.includes(index),
    setGameMode: store.setSelectedGameModeKana
  };
}
