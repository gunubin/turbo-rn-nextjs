export const getEventValue = (event: unknown) => {
  if (!event) {
    return event;
  }
  if (typeof event === 'object' && 'target' in event) {
    return ((event as any).target as any).value;
  } else {
    return event;
  }
};
