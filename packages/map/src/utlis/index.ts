import { unref } from 'vue';

export function hasChanged(value: any, oldValue: any): boolean {
  return !Object.is(unref(value), unref(oldValue));
}

export function transformCenter(center: any | undefined): any {
  if (!center)
    return { lat: 0, lng: 0 };

  const lat = center.lat();
  const lng = center.lng();
  return { lat, lng };
}
