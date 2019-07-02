import { SelectorsToElement } from './override';
export interface UserProfiles {
    html?: boolean;
    mathMl?: boolean;
    svg?: boolean;
    svgFilters?: boolean;
}
/**
 * DOMPurify configuration
 * The values RETURN_DOM, RETURN_DOM_FRAGMENT and RETURN_DOM_IMPORT cannot be overriden
 * because they are used internaly by the library
 */
export interface DOMConfig {
    ADD_ATTR?: string[];
    ADD_TAGS?: string[];
    ALLOW_DATA_ATTR?: boolean;
    ALLOW_UNKNOWN_PROTOCOLS?: boolean;
    ALLOWED_ATTR?: string[];
    ALLOWED_TAGS?: string[];
    ALLOWED_URI_REGEXP?: RegExp;
    FORBID_ATTR?: string[];
    FORBID_TAGS?: string[];
    FORCE_BODY?: boolean;
    IN_PLACE?: boolean;
    KEEP_CONTENT?: boolean;
    RETURN_DOM?: boolean;
    RETURN_DOM_FRAGMENT?: boolean;
    RETURN_DOM_IMPORT?: boolean;
    SAFE_FOR_JQUERY?: boolean;
    SAFE_FOR_TEMPLATES?: boolean;
    SANITIZE_DOM?: boolean;
    USE_PROFILES?: UserProfiles;
    WHOLE_DOCUMENT?: boolean;
}
/**
 * Configuration of the library
 * The key dom correspond to a DOMPurify configuration
 * the key eventHandlers allow to attach event handlers to the newly created React element
 */
export interface Config {
    dom?: DOMConfig;
    overrides?: SelectorsToElement;
    useAsKey?: string[];
}
export declare function getConfig(config?: Partial<Config>): Config;
