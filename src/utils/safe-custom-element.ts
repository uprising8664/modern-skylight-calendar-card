/**
 * safeCustomElement(name)
 *
 * Drop-in replacement for Lit's `@customElement(name)` decorator that no-ops
 * if the tag has already been registered.
 *
 * Why: Home Assistant's Lovelace can evaluate the same module twice (e.g. when
 * the resource is referenced from multiple dashboards, or when navigating
 * between dashboards). The default decorator calls `customElements.define`
 * unconditionally, which throws on the second evaluation:
 *   `the name "msc-month-view" has already been used with this registry`
 * Throwing aborts module evaluation, so the main card class never registers
 * and the panel renders as `hui-error-card` (blank).
 *
 * Behaviour:
 *  - First registration: defines the element exactly like `@customElement`.
 *  - Subsequent registrations: skipped silently. The class returned by the
 *    decorator is whichever class was registered first (so existing instances
 *    keep working). The duplicate class is still usable as a plain class.
 */
export const safeCustomElement =
  (tagName: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (classOrTarget: any, _context?: any): any => {
    const existing = customElements.get(tagName);
    if (existing) {
      // Already registered — return the original class to keep things working.
      return existing;
    }
    customElements.define(tagName, classOrTarget);
    return classOrTarget;
  };
