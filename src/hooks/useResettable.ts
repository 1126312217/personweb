import { ref } from "vue";

export function useResettableRefFn<T>(initialValue: () => T) {
  const state = ref(initialValue());
  const reset = () => {
    state.value = initialValue();
  };
  return { state, reset };
}

function defaultClone(value: any) {
  if (value === null || typeof value !== "object") return value;
  return JSON.parse(JSON.stringify(value));
}

export function useResettableRef<T>(value: T, clone = defaultClone) {
  const initialValue = clone(value);
  const state = ref(value);
  const reset = () => {
    state.value = clone(initialValue);
  };
  return { state, reset };
}
