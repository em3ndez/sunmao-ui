import { ComponentSchema, parseType } from '@sunmao-ui/core';
import { Registry } from '@sunmao-ui/runtime';
import { isDraft, original } from 'immer';
import { get } from 'lodash-es';

export function genComponent(registry: Registry, type: string, id: string): ComponentSchema {
  const { version, name } = parseType(type);
  const cImpl = registry.getComponent(version, name);
  const initProperties = cImpl.metadata.exampleProperties;
  return {
    id,
    type: type,
    properties: initProperties,
    traits: [],
  };
}

export function genId(componentType: string, components: ComponentSchema[]): string {
  const { name } = parseType(componentType);
  const componentsCount = components.filter(
    component => component.type === componentType
  ).length;
  return `${name}${componentsCount + 1}`;
}

export function tryOriginal<T>(val: T): T {
  return isDraft(val) ? (original(val) as T) : val;
}

export function getComponentAndChildrens(
  componentId: string,
  allComponents: ComponentSchema[]
): ComponentSchema[] {
  const target = allComponents.find(c => c.id === componentId);
  if (!target) {
    return [];
  }
  return allComponents.reduce<ComponentSchema[]>(
    (result, component) => {
      const slotTrait = component.traits.find(trait => trait.type === 'core/v1/slot');
      const slotId = get(slotTrait, 'properties.container.id');
      if (slotId === componentId) {
        return result.concat(getComponentAndChildrens(component.id, allComponents));
      }
      return result;
    },
    [target]
  );
}
