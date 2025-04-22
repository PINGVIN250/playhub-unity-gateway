
/**
 * Типы для Unity WebGL инстанса
 * Это глобальный интерфейс, который используется в нескольких компонентах
 */
declare global {
  interface Window {
    unityInstance: any;
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: any,
      onProgress?: (progress: number) => void
    ) => Promise<any>;
  }
}

export {};
