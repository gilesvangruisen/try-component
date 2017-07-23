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

…where errorHandler is a function that accepts an `Error` object and a `context` with the following format:

```
{
  arguments: [], // arguments passed to the function which threw
  state: {}, // component state at the time of the error
  props: {} // component props at the time of the error
}
```

Similarly, `tryComponentFactory` is a curried equivalent of `tryComponent` with the following signature:

```
(errorHandler) -> (Component) -> (WrappedComponent)
```

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

## License

MIT
