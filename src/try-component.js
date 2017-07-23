function tryComponent(Component, errorHandler) {
  return tryComponentFactory(errorHandler)(Component)
}

function tryComponentFactory(errorHandler) {
  return function (Component) {
    var instance = null

    // Replacement constructor will call the original and store new instance
    function WrappedComponent() {
      Component.apply(this, arguments)

      instance = this
    }

    WrappedComponent.prototype = Object.create(Component.prototype)

    const wrappedErrorHandler = wrapErrorHandler(
      errorHandler,
      function () { return instance }
    )

    // Replace each prototype method with an error handling proxy
    Object.getOwnPropertyNames(Component.prototype).forEach((property) => {
      if (typeof Component.prototype[property] === 'function') {
        Component.prototype[property] = tryMethod(
          Component.prototype[property],
          wrappedErrorHandler
        )
      }
    })

    return WrappedComponent
  }
}

function wrapErrorHandler(errorHandler, getInstance) {
  return function (error, thisArg, args) {
    const instance = getInstance()

    const context = {
      arguments: args,
      state: instance && instance.state,
      props: instance && instance.props
    }

    return errorHandler.apply(this, [error, context])
  }
}

function tryMethod(originalMethod, errorHandler) {
  return function () {
    try {
      return originalMethod.apply(this, arguments)
    } catch (e) {
      return errorHandler(e, this, arguments)
    }
  }
}

export { tryComponent, tryComponentFactory }
