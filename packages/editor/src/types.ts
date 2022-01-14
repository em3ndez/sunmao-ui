import { initSunmaoUI, Registry, StateManager } from '@sunmao-ui/runtime';
import { EditorStore } from './EditorStore';
import { EventBusType } from './eventBus';
import { AppModelManager } from './operations/AppModelManager';

type ReturnOfInit = ReturnType<typeof initSunmaoUI>;

export type EditorServices = {
  App: ReturnOfInit['App'];
  registry: Registry;
  apiService: ReturnOfInit['apiService'];
  stateManager: StateManager;
  appModelManager: AppModelManager;
  eventBus: EventBusType;
  editorStore: EditorStore;
};
