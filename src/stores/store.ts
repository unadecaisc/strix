import type { Updater, Writable } from "svelte/store";

export type ChangeFunction<T> = (args: { current: T; next: T }) => T;

export function store<T>(store: Writable<T>, onChange?: ChangeFunction<T>) {
  const update = (updater: Updater<T>, sideEffect?: (newValue: T) => void) => {
    store.update((current) => {
      const next = updater(current);
      let res: T = next;
      if (onChange) {
        res = onChange({ current, next });
      }
      sideEffect?.(res);
      return res;
    });
  };

  const set: typeof store.set = (current) => {
    update(() => current);
  };
  return { ...store, set, update };
}

export type StoreType<T> = ReturnType<typeof store<T>>;
