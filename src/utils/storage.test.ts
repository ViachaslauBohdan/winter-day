import { afterEach, describe, expect, it } from "vitest";
import { loadDays, saveDays } from "./storage";

function installMemoryStorage() {
  const store = new Map<string, string>();
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    value: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    },
  });
  return store;
}

describe("checklist persistence", () => {
  afterEach(() => {
    Reflect.deleteProperty(globalThis, "localStorage");
  });

  it("saves a day and restores the same completed activities", () => {
    installMemoryStorage();
    saveDays({ "2026-09-25": ["daylight", "people"] });
    expect(loadDays()).toEqual({ "2026-09-25": ["daylight", "people"] });
  });

  it("drops corrupt payloads, unknown ids, and impossible dates", () => {
    const store = installMemoryStorage();
    store.set("winter-day.v1", "{");
    expect(loadDays()).toEqual({});

    store.set(
      "winter-day.v1",
      JSON.stringify({
        days: {
          "2026-02-31": ["daylight"],
          "2026-09-25": ["daylight", "not-real", "daylight", 4],
          "yesterday": ["water"],
        },
      }),
    );
    expect(loadDays()).toEqual({ "2026-09-25": ["daylight"] });

    store.set("winter-day.v1", JSON.stringify([]));
    expect(loadDays()).toEqual({});
    store.set("winter-day.v1", JSON.stringify({ days: null }));
    expect(loadDays()).toEqual({});
  });

  it("keeps working when storage throws", () => {
    Object.defineProperty(globalThis, "localStorage", {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => {
          throw new Error("quota");
        },
      },
    });
    expect(() => saveDays({ "2026-09-25": ["water"] })).not.toThrow();
    expect(loadDays()).toEqual({});
  });
});
