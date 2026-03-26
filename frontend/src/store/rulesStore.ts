import { create } from "zustand";
import { api, Rule, RulePayload } from "../lib/api";

interface RulesState {
  rules: Rule[];
  loading: boolean;
  error: string | null;
  fetchRules: () => Promise<void>;
  addRule: (data: RulePayload) => Promise<Rule>;
  editRule: (id: number, data: RulePayload) => Promise<Rule>;
  removeRule: (id: number) => Promise<void>;
}

export const useRulesStore = create<RulesState>((set) => ({
  rules: [],
  loading: false,
  error: null,

  fetchRules: async () => {
    set({ loading: true, error: null });
    try {
      const rules = await api.getRules();
      set({ rules, loading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load rules";
      set({ error: message, loading: false });
    }
  },

  addRule: async (data) => {
    const rule = await api.createRule(data);
    set((state) => ({ rules: [...state.rules, rule] }));
    return rule;
  },

  editRule: async (id, data) => {
    const rule = await api.updateRule(id, data);
    set((state) => ({
      rules: state.rules.map((r) => (r.id === id ? rule : r)),
    }));
    return rule;
  },

  removeRule: async (id) => {
    await api.deleteRule(id);
    set((state) => ({ rules: state.rules.filter((r) => r.id !== id) }));
  },
}));
