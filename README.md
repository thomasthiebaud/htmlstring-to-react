# htmldom-to-react

## How to install ?

    npm install htmldom-to-react
    // or
    yarn add htmldom-to-react

## How to use ?

### Simple example

    import { parse } from 'htmldom-to-react'
    parse('<em key="1"><b key="2">It\' is working</b></em>')

### Add an event handler

Add an evant handler on all `b` elements

    import { parse } from 'htmldom-to-react'
    parse('<b key="1">It</b> is <b key="2">working</b>', {
      eventHandlers: {
        b: {
          onClick: () => console.log('click'),
        },
      },
    })

Each key in `eventHandlers` can be a valid css selector.

    import { parse } from 'htmldom-to-react'
    parse('<b key="1">It</b> is <b key="2" class="active">working</b>', {
      eventHandlers: {
        'b.active': {
          onClick: () => console.log('click'),
        },
      },
    })

### Change dom parsing configuration

By default, we are sanitizing the html input using `DOMPurify` module. You can override the configuration we are using

    import { parse } from 'htmldom-to-react'
    parse('<b key="1">It</b> is <b key="2" class="active">working</b>', {
      dom: {
        ADD_TAG: ['script']
      },
    })

**IMPORTANT** You cannot override `RETURN_DOM`, `RETURN_DOM_FRAGMENT` and `RETURN_DOM_IMPORT` because they are used internaly by the library.

## How to contribute ?

This repo enforce commit style so the release process is automatic. Commits must look like:

    <SUBJECT>: Message starting with an uppercase

where SUBJECT is one of: `Fix`, `Update`, `New`, `Breaking`, `Docs`, `Build`, `Upgrade`, `Chore`

## Found a problem ?

Please open an issue or submit a PR, I will be more than happy to help
