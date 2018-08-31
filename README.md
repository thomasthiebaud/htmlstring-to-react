# htmlstring-to-react

## Why ?

This module provide an easy way to parse a string containing html elements to an array of React elements. It tries to focus to security (using [DOMPurify](https://github.com/cure53/DOMPurify)) and keeping the bundle as small as possible

It is heavily inspired by [html2react](https://github.com/Deschtex/html2react) and [html-react-parser](https://github.com/remarkablemark/html-react-parser)

## How to install ?

    npm install htmlstring-to-react
    // or
    yarn add htmlstring-to-react

## How to use ?

### Simple example

    import { parse } from 'htmlstring-to-react'
    parse('<em key="1"><b key="2">It\' is working</b></em>')

### Add an override

You can use css selectors to override an element

    import { parse } from 'htmlstring-to-react'
    parse('<b key="1">It</b> is <b key="2">working</b>', {
      overrides: {
        b: (props, textContent) => <b onClick={console.log('Click')}>{textContent}</b>
      },
    })

All valid css selectors works

    import { parse } from 'htmlstring-to-react'
    parse('<b key="1">It</b> is <b key="2" class="active">working</b>', {
      overrides: {
        'b.active': (props, textContent) => <b onClick={console.log('Click')}>{textContent}</b>
      },
    })

**IMPORTANT** Overrides do not support nested elements in the current stage, so this code

    import { parse } from 'htmlstring-to-react'
    parse('<b key="1"><b key="2">It is working</b></b>', {
      overrides: {
        b: (props, textContent) => <b onClick={console.log('Click')}>{textContent}</b>
      },
    })

will drop the inner `b` but keep the textContent

### Change dom parsing configuration

By default, we are sanitizing the html input using `DOMPurify` module. You can override the configuration we are using

    import { parse } from 'htmlstring-to-react'
    parse('<b key="1">It</b> is <b key="2" class="active">working</b>', {
      dom: {
        ADD_TAG: ['script']
      },
    })

**IMPORTANT** You cannot override `RETURN_DOM`, `RETURN_DOM_FRAGMENT` and `RETURN_DOM_IMPORT` because they are used internaly by the library.

### Other options

- **useFragment** (default `false`): Return a Fragment instead of an array.
- **useAsKey** (default `['key']`): Ordered list of attributes to use as a key. Use the first one that matches or `null`

## How to contribute ?

This repo enforce commit style so the release process is automatic. Commits must look like:

    <SUBJECT>: Message starting with an uppercase

where SUBJECT is one of: `Fix`, `Update`, `New`, `Breaking`, `Docs`, `Build`, `Upgrade`, `Chore`

## Found a problem ?

Please open an issue or submit a PR, I will be more than happy to help
