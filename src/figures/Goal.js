import React, { Component } from "react"
import { Star } from "react-konva"

class Goal extends Component {
  render() {
    const { x, y, onDragEnd } = this.props
    return (
      <Star
        x={x}
        y={y}
        innerRadius={20}
        outerRadius={30}
        numPoints={5}
        fill={"orange"}
        shadowBlur={5}
        draggable
        onDragEnd={onDragEnd}
      />
    )
  }
}

export default Goal
