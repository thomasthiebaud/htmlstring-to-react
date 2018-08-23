import { SelectorsToElement } from './override'

function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

function deepMerge(target: any, source: any) {
  const output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

export interface UserProfiles {
  html?: boolean
  mathMl?: boolean
  svg?: boolean
  svgFilters?: boolean
}

/**
 * DOMPurify configuration
 * The values RETURN_DOM, RETURN_DOM_FRAGMENT and RETURN_DOM_IMPORT cannot be overriden
 * because they are used internaly by the library
 */
export interface DOMConfig {
  ADD_ATTR?: string[]
  ADD_TAGS?: string[]
  ALLOW_DATA_ATTR?: boolean
  ALLOW_UNKNOWN_PROTOCOLS?: boolean
  ALLOWED_ATTR?: string[]
  ALLOWED_TAGS?: string[]
  ALLOWED_URI_REGEXP?: boolean
  FORBID_ATTR?: string[]
  FORBID_TAGS?: string[]
  FORCE_BODY?: boolean
  KEEP_CONTENT?: boolean
  RETURN_DOM?: boolean
  RETURN_DOM_FRAGMENT?: boolean
  RETURN_DOM_IMPORT?: boolean
  SAFE_FOR_JQUERY?: boolean
  SAFE_FOR_TEMPLATES?: boolean
  SANITIZE_DOM?: boolean
  USE_PROFILES?: UserProfiles
  WHOLE_DOCUMENT?: boolean
}

/**
 * Configuration of the library
 * The key dom correspond to a DOMPurify configuration
 * the key eventHandlers allow to attach event handlers to the newly created React element
 */
export interface Config {
  dom?: DOMConfig
  overrides?: SelectorsToElement,
  useFragment?: boolean,
}

/**
 * Options that cannot be overidden by the user because they are used internaly by the library
 */
const mandatoryConfig: Config = {
  dom: {
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: true,
    RETURN_DOM_IMPORT: false,
  },
}

/**
 * Default configuration that can be overriden by the user
 */
const defaultConfig: Config = {
  dom: {
    ADD_ATTR: ['key'],
  },
  useFragment: false,
}

export function getConfig(config?: Partial<Config>): Config {
  if (config) {
    return deepMerge(defaultConfig, deepMerge(config, mandatoryConfig))
  } else {
    return deepMerge(defaultConfig, mandatoryConfig)
  }
}
