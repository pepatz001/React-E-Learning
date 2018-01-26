import React from 'react'

class Default extends React.Component {

  componentWillMount() {
    this.props.history.replace('/admin')
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default Default