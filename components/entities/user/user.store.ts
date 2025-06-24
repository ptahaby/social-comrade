import { create } from 'zustand';

type State = {
  user: { id: string; email: string } | null;
};

type Action = {
  add: (data: State) => void;
  remove: () => void;
};

export const useUserStore = create<State & Action>((set) => ({
  user: null,
  add: (user) => set(() => user),
  remove: () => set(() => ({ user: null })),
}));
