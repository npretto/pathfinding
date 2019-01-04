import React, { Component, Fragment } from "react"
import { Circle, Layer, Line, Stage } from "react-konva"

class Link extends Component {
  render() {
    const { from, to } = this.props
    return (
      <Line
        points={[from.x, from.y, to.x, to.y]}
        stroke="gray"
        strokeWidth={3}
      />
    )
  }
}

export default Link
