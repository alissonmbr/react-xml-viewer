export function checkVisibility(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }

  if (element.checkVisibility) {
    return element.checkVisibility();
  }

  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

export function getParentOffset(element: HTMLElement | null): number {
  if (!element || !element.parentElement) {
    return 0;
  }

  if (checkVisibility(element.parentElement)) {
    return element.parentElement.offsetTop;
  }

  return getParentOffset(element.parentElement);
}
