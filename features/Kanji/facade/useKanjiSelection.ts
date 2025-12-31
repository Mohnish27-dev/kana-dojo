'use client';

import useKanjiStore from '../store/useKanjiStore';
import type { IKanjiObj } from '../store/useKanjiStore';

/**
 * Kanji Selection Facade - Public API for selection state
 *
 * Abstracts the internal Kanji store structure
 */

export interface KanjiSelection {
  selectedKanji: IKanjiObj[];
  selectedSets: string[];
  selectedCollection: 'n5' | 'n4' | 'n3' | 'n2' | 'n1';
  totalSelected: number;
  isEmpty: boolean;
  gameMode: string;
}

export interface KanjiSelectionActions {
  addKanji: (kanji: IKanjiObj) => void;
  addKanjiList: (kanjis: IKanjiObj[]) => void;
  clearKanji: () => void;
  setCollection: (collection: 'n5' | 'n4' | 'n3' | 'n2' | 'n1') => void;
  setSets: (sets: string[]) => void;
  clearSets: () => void;
  setGameMode: (mode: string) => void;
}

export function useKanjiSelection(): KanjiSelection & KanjiSelectionActions {
  const store = useKanjiStore();

  return {
    // State
    selectedKanji: store.selectedKanjiObjs,
    selectedSets: store.selectedKanjiSets,
    selectedCollection: store.selectedKanjiCollection,
    totalSelected: store.selectedKanjiObjs.length,
    isEmpty: store.selectedKanjiObjs.length === 0,
    gameMode: store.selectedGameModeKanji,

    // Actions
    addKanji: store.addKanjiObj,
    addKanjiList: store.addKanjiObjs,
    clearKanji: store.clearKanjiObjs,
    setCollection: store.setSelectedKanjiCollection,
    setSets: store.setSelectedKanjiSets,
    clearSets: store.clearKanjiSets,
    setGameMode: store.setSelectedGameModeKanji
  };
}
