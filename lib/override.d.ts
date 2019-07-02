/// <reference types="react" />
/**
 * An internal representation of an element that can include a React element to use as an override
 */
import { AvailableProps } from './react';
export interface EnrichedElement extends Element {
    override?: (props: any, textContent?: string) => React.ReactElement<any>;
}
/**
 * A map between a css selector and a React element
 */
export interface SelectorsToElement {
    [keyof: string]: (props?: AvailableProps, textContent?: string) => React.ReactElement<any>;
}
export declare function override(document: DocumentFragment, selectorsToElement: SelectorsToElement): void;
