import React, { Component, Fragment } from "react"
import { Circle, Layer, Line, Stage } from "react-konva"

class Node extends Component {
  render() {
    const { x, y, name } = this.props
    return (
      <Fragment>
        <Circle x={x} y={y} radius={10} fill={"red"} shadowBlur={5} />
        {/* <Text text={name} x={x - 5} y={y - 5} /> */}
      </Fragment>
    )
  }
}

export default Node
