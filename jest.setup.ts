import "@testing-library/jest-dom";

// Polyfills for jsdom to satisfy Radix UI Select pointer APIs
// See: https://github.com/radix-ui/primitives/issues/1821
// Provide a real PointerEvent that is an Event subclass for user-event
if (!("PointerEvent" in globalThis)) {
  // jsdom lacks PointerEvent; use MouseEvent base to satisfy instanceof Event
  class JSDOMPointerEvent extends (globalThis as any).MouseEvent {
    public pointerId: number;
    public width: number;
    public height: number;
    public pressure: number;
    public tangentialPressure: number;
    public tiltX: number;
    public tiltY: number;
    public twist: number;
    public pointerType: string;
    public isPrimary: boolean;
    constructor(type: string, params: any = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 1;
      this.width = params.width ?? 1;
      this.height = params.height ?? 1;
      this.pressure = params.pressure ?? 0.5;
      this.tangentialPressure = params.tangentialPressure ?? 0;
      this.tiltX = params.tiltX ?? 0;
      this.tiltY = params.tiltY ?? 0;
      this.twist = params.twist ?? 0;
      this.pointerType = params.pointerType ?? "mouse";
      this.isPrimary = params.isPrimary ?? true;
    }
  }
  (globalThis as any).PointerEvent = JSDOMPointerEvent as any;
}

if (!(globalThis as any).HTMLElement.prototype.hasPointerCapture) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (globalThis as any).HTMLElement.prototype.hasPointerCapture = () => false;
}

if (!(globalThis as any).HTMLElement.prototype.releasePointerCapture) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (globalThis as any).HTMLElement.prototype.releasePointerCapture = () => {};
}

// Polyfill for scrollIntoView to fix Radix UI Select issues in tests
if (!(globalThis as any).HTMLElement.prototype.scrollIntoView) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  (globalThis as any).HTMLElement.prototype.scrollIntoView = () => {};
}
