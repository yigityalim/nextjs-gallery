import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Config = {
	menuState: boolean;
	nestedMenuState: boolean | undefined;
	setMenuState: (state: boolean) => void;
	closeAllMenus: () => void;
	toggleMenuState: () => void;
	setNestedMenuState: (state: boolean | undefined) => void;
	closeNestedMenuState: () => void;
	toggleNestedMenuState: () => void;
};

export const useConfig = create<Config>()(
	persist(
		(set, get) => ({
			menuState: false,
			nestedMenuState: undefined,
			setMenuState: (state) => set({ menuState: state }),
			closeAllMenus: () =>
				set({ menuState: false, nestedMenuState: undefined }),
			toggleMenuState: () => set((state) => ({ menuState: !state.menuState })),
			setNestedMenuState: (state) =>
				set({
					nestedMenuState: state,
					...(state === undefined ? { menuState: false } : {}), // Eğer nested kapandıysa menuState'i de kapat
				}),
			closeNestedMenuState: () =>
				set({ nestedMenuState: undefined, menuState: false }),
			toggleNestedMenuState: () => {
				const { nestedMenuState } = get();
				set({
					nestedMenuState: !nestedMenuState ? true : undefined,
					...(nestedMenuState ? { menuState: false } : {}), // Eğer nested kapandıysa menuState'i de kapat
				});
			},
		}),
		{ name: "config" },
	),
);
