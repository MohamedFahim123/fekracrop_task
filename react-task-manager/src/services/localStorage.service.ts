const isBrowser = (): boolean => typeof window !== "undefined";

export const loadFromStorage = <T>(
  key: string,
  defaultValue: T,
  validator?: (value: unknown) => value is T,
): T => {
  if (!isBrowser()) {
    return defaultValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return defaultValue;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (validator && !validator(parsedValue)) {
      return defaultValue;
    }

    return parsedValue as T;
  } catch (error) {
    console.error(`Failed to load "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

export const saveToStorage = <T>(key: string, value: T): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save "${key}" to localStorage:`, error);
  }
};