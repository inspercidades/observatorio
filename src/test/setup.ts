import "@testing-library/jest-dom";
import { vi } from "vitest";

// cmdk scrolls the highlighted item into view
Element.prototype.scrollIntoView = vi.fn();

// Radix UI components require ResizeObserver.
// Vitest 4 only treats function/class implementations as constructable.
global.ResizeObserver = vi.fn(
  class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  },
);

// Radix UI uses matchMedia for responsive behaviour
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
