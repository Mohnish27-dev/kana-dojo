'use client';

import useVocabStore from '../store/useVocabStore';
import type { IVocabObj } from '../store/useVocabStore';

/**
 * Vocabulary Selection Facade - Public API for selection state
 *
 * Abstracts the internal Vocabulary store structure
 */

export interface VocabSelection {
  selectedVocab: IVocabObj[];
  selectedSets: string[];
  selectedCollection: string;
  totalSelected: number;
  isEmpty: boolean;
  gameMode: string;
}

export interface VocabSelectionActions {
  addVocab: (vocab: IVocabObj) => void;
  addVocabList: (vocabs: IVocabObj[]) => void;
  clearVocab: () => void;
  setCollection: (collection: string) => void;
  setSets: (sets: string[]) => void;
  clearSets: () => void;
  setGameMode: (mode: string) => void;
}

export function useVocabSelection(): VocabSelection & VocabSelectionActions {
  const store = useVocabStore();

  return {
    // State
    selectedVocab: store.selectedVocabObjs,
    selectedSets: store.selectedVocabSets,
    selectedCollection: store.selectedVocabCollection,
    totalSelected: store.selectedVocabObjs.length,
    isEmpty: store.selectedVocabObjs.length === 0,
    gameMode: store.selectedGameModeVocab,

    // Actions
    addVocab: store.addVocabObj,
    addVocabList: store.addVocabObjs,
    clearVocab: store.clearVocabObjs,
    setCollection: store.setSelectedVocabCollection,
    setSets: store.setSelectedVocabSets,
    clearSets: store.clearVocabSets,
    setGameMode: store.setSelectedGameModeVocab
  };
}
