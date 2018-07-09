/**
 * A map between an event name and an event handler
 */
export interface EventHandlers {
  [keyof: string]: React.EventHandler<any>
}

/**
 * A map between a css selector and one or several event handlers
 */
export interface SelectorsToEventHandlers {
  [keyof: string]: EventHandlers
}

/**
 * An internal representation of an element that include event handlers
 */
export interface EnrichedElement extends Element {
  eventHandlers?: EventHandlers
}

export function addEventHandlers(document: DocumentFragment, selectorsToEventHandlers: SelectorsToEventHandlers) {
  Object.keys(selectorsToEventHandlers).forEach((selector) => {
    const eventHandlers = selectorsToEventHandlers[selector]
    const elements = document.querySelectorAll(selector)
    for (let i = 0; i < elements.length; i ++) {
      const element = elements.item(i) as EnrichedElement
      Object.keys(eventHandlers).forEach((eventName) => {
        const handler = eventHandlers[eventName]
        element.eventHandlers = {}
        element.eventHandlers[eventName] = handler
      })
    }
  })
}
