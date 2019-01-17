import React, { Component } from "react"
import { Circle } from "react-konva"

class Robot extends Component {
  render() {
    const { x, y, onDragEnd } = this.props
    return (
      <Circle
        x={x}
        y={y}
        radius={20}
        fill={"black"}
        shadowBlur={5}
        draggable
        onDragEnd={onDragEnd}
      />
    )
  }
}

export default Robot
