import React, { Component, Fragment } from "react"
import { Circle, Layer, Line, Stage } from "react-konva"

class Link extends Component {
  render() {
    const { from, to, isInPathLasthPath } = this.props
    return (
      <Line
        points={[from.x, from.y, to.x, to.y]}
        stroke={isInPathLasthPath ? "black" : "gray"}
        strokeWidth={isInPathLasthPath ? 4 : 2}
      />
    )
  }
}

export default Link
