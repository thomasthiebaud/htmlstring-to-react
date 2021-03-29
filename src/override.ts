/**
 * An internal representation of an element that can include a React element to use as an override
 */
export interface EnrichedElement extends Element {
  override?: (props: any, textContent?: string) => React.ReactElement<any>;
}

/**
 * A map between a css selector and a React element
 */
export interface SelectorsToElement {
  [keyof: string]: (
    props?: any,
    textContent?: string
  ) => React.ReactElement<any>;
}

export function override(
  document: DocumentFragment,
  selectorsToElement: SelectorsToElement
) {
  Object.keys(selectorsToElement).forEach((selector) => {
    const reactElement = selectorsToElement[selector];

    const elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i) as EnrichedElement;
      element.override = reactElement;
    }
  });
}
