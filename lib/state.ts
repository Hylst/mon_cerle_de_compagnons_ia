/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import {
  Agent,
  Charlotte,
  Paul,
  Shane,
  Penny,
  ZweiStein,
  Mat,
  Julie,
  Priscilla,
  Jacques,
  Mercredi,
  Gui,
  Cecile,
} from './presets/agents';
import { DEV_API_KEY, MAX_API_USES } from './constants';

const LOCAL_STORAGE_KEY = 'app-config';

/**
 * App Config
 */
export const useAppConfig = create<{
  apiKey: string | null;
  setApiKey: (key: string) => void;
  usageMode: 'user' | 'limited' | null;
  setUsageMode: (mode: 'user' | 'limited') => void;
  usageCount: number;
  incrementUsage: () => void;
  loadFromLocalStorage: () => void;
}>(set => ({
  apiKey: null,
  usageMode: null,
  usageCount: 0,
  setApiKey: (key: string) => {
    set({ apiKey: key });
    // Also save to local storage if in user mode
    const state = useAppConfig.getState();
    if (state.usageMode === 'user') {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...state,
          apiKey: key,
        })
      );
    }
  },
  setUsageMode: (mode: 'user' | 'limited') => {
    const isSwitchingToLimited = mode === 'limited';
    const apiKey = isSwitchingToLimited ? DEV_API_KEY : null;
    set(state => {
      const newState = { ...state, usageMode: mode, apiKey };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  },
  incrementUsage: () => {
    set(state => {
      if (state.usageMode !== 'limited' || state.usageCount >= MAX_API_USES) {
        return state;
      }
      const newCount = state.usageCount + 1;
      const newState = { ...state, usageCount: newCount };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  },
  loadFromLocalStorage: () => {
    const storedConfig = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedConfig) {
      try {
        const config = JSON.parse(storedConfig);
        set({
          apiKey: config.apiKey,
          usageMode: config.usageMode,
          usageCount: config.usageCount || 0,
        });
      } catch (e) {
        console.error('Failed to parse app config from localStorage', e);
      }
    }
  },
}));

/**
 * User
 */
export type User = {
  name?: string;
  info?: string;
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
  } & User
>(set => ({
  name: '',
  info: '',
  setName: name => set({ name }),
  setInfo: info => set({ info }),
}));

/**
 * Input Audio
 */
export const useInputAudio = create<{
  volume: number;
  setVolume: (volume: number) => void;
}>(set => ({
  volume: 0,
  setVolume: (volume: number) => set({ volume }),
}));

/**
 * Agents
 */
function getAgentById(id: string) {
  const { availablePersonal, availablePresets } = useAgent.getState();
  return (
    availablePersonal.find(agent => agent.id === id) ||
    availablePresets.find(agent => agent.id === id)
  );
}

export const useAgent = create<{
  current: Agent;
  availablePresets: Agent[];
  availablePersonal: Agent[];
  setCurrent: (agent: Agent | string) => void;
  addAgent: (agent: Agent) => void;
  update: (agentId: string, adjustments: Partial<Agent>) => void;
}>(set => ({
  current: Mat,
  availablePresets: [
    Mat,
    Jacques,
    Paul,
    Charlotte,
    Shane,
    Penny,
    ZweiStein,
    Julie,
    Priscilla,
    Mercredi,
    Gui,
    Cecile,
  ],
  availablePersonal: [],

  addAgent: (agent: Agent) => {
    set(state => ({
      availablePersonal: [...state.availablePersonal, agent],
      current: agent,
    }));
  },
  setCurrent: (agent: Agent | string) =>
    set({ current: typeof agent === 'string' ? getAgentById(agent) : agent }),
  update: (agentId: string, adjustments: Partial<Agent>) => {
    let agent = getAgentById(agentId);
    if (!agent) return;
    const updatedAgent = { ...agent, ...adjustments };
    set(state => ({
      availablePresets: state.availablePresets.map(a =>
        a.id === agentId ? updatedAgent : a
      ),
      availablePersonal: state.availablePersonal.map(a =>
        a.id === agentId ? updatedAgent : a
      ),
      current: state.current.id === agentId ? updatedAgent : state.current,
    }));
  },
}));

/**
 * UI
 */
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  showAgentEdit: boolean;
  setShowAgentEdit: (show: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (show: boolean) => void;
}>(set => ({
  showUserConfig: false,
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
  showAgentEdit: false,
  setShowAgentEdit: (show: boolean) => set({ showAgentEdit: show }),
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (show: boolean) => set({ isMobileMenuOpen: show }),
}));
