# tryComponent

A safety net for React components.

`tryComponent` is a [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html) that makes it easy to catch otherwise unhandled runtime errors in your React components. This helps your application fail more gracefully by making it easy to provide better feedback to users when something you don't expect goes wrong.

## Installation

via npm:
```
npm install try-component
```

## Usage

`import { tryComponent, tryComponentFactory } from 'try-component'`

`tryComponent` is a function whose signature is as follows:

```
(Component, errorHandler) -> (WrappedComponent)
```

…where errorHandler is a function to be called upon a runtime error, and will be passed both an `Error` object and a `context` object with the following format:

```
{
  arguments: [], // arguments passed to the function which threw
  state: {}, // component state at the time of the error
  props: {} // component props at the time of the error
}
```

The result is a new, wrapped component you can use in place of the previous one.

The API also exposes a separate function, `tryComponentFactory`, which is simply a curried equivalent of `tryComponent` with the following signature:

```
(errorHandler) -> (Component) -> (WrappedComponent)
```

…making it easy to define a single `tryComponent` function to wrap multiple components with a common global or ad-hoc error handler.

## Example

```js
import React from 'react'
import { tryComponent } from 'try-component'

class MyComponent extends React.Component {
  render() { … }
}

export default tryComponent(MyComponent, (error, context) => {
  console.log(error) // the Error Object
  console.log(context) // { arguments, state, props }
})
```

## Why

It can be tricky to wrap React components in a single try/catch block. The original motivation was to be able to make React Native apps fail more gracefully because release builds will crash upon runtime errors, and a crash is probably the last thing you want your app to do, as it provides users no valuable feedback or direction for moving forward. That said, there is nothing about this library that is specific to React Native.

## License

MIT
