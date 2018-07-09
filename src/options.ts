import * as deepmerge from 'deepmerge'

export interface UserProfiles {
  html?: boolean
  mathMl?: boolean
  svg?: boolean
  svgFilters?: boolean
}

export interface DOMOptions {
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

export interface Options {
  dom?: DOMOptions
}

const mandatoryOptions: Options = {
  dom: {
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: true,
    RETURN_DOM_IMPORT: false,
  },
}

const defaultOptions: Options = {
  dom: {
    ADD_ATTR: ['key'],
  },
}

export function getOptions(options?: Partial<Options>): Options {
  if (options) {
    return deepmerge.all<Options>([defaultOptions, options, mandatoryOptions])
  } else {
    return deepmerge.all<Options>([defaultOptions, mandatoryOptions])
  }
}
