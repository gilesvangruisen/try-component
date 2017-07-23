import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      foo: 'bar'
    }
  }

  componentDidMount() {
    console.log(foo.bar)
  }

  toBar() {
    this.setState({ foo: 'bar' })
  }

  toBaz() {
    this.setState({ foo: 'baz' })
  }

  throwError() {
    this.foo.bar()
  }

  render() {
    return (
      <div>
        <h2>React Safety Net</h2>
        <h4>foo: {this.state.foo}</h4>
        <button onClick={this.toBar.bind(this)}>To Bar</button>
        <button onClick={this.toBaz.bind(this)}>To Baz</button>
        <button onClick={this.throwError.bind(this)}>Throw Error</button>
      </div>
    )
  }
}
