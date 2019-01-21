import React, { Component, Fragment } from "react"
import { Circle, Layer, Line, Stage } from "react-konva"

class Link extends Component {
  render() {
    const { from, to, isInPathLasthPath } = this.props
    return (
      <Line
        points={[from.x, from.y, to.x, to.y]}
        stroke={isInPathLasthPath ? "#76ff00" : "gray"}
        strokeWidth={isInPathLasthPath ? 5 : 2}
      />
    )
  }
}

export default Link
