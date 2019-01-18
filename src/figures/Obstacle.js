import React, { Component, Fragment } from "react"
import { Rect, Circle } from "react-konva"

class Obstacle extends Component {
  constructor(props) {
    super()
    this.state = this.stateFromProps(props)
  }

  componentWillReceiveProps(newProps) {
    this.setState(this.stateFromProps(newProps))
  }

  stateFromProps = props => {
    const { onMove, onMoveEnd, ...positions } = props
    return positions
  }

  onDragA = e => {
    const { layerX: x1, layerY: y1 } = e.evt
    this.setState({ x1, y1 }, () =>
      this.props.onMove(this.getPositions(this.state))
    )
  }

  onDragB = e => {
    const { layerX: x2, layerY: y2 } = e.evt
    this.setState({ x2, y2 }, () =>
      this.props.onMove(this.getPositions(this.state))
    )
  }

  onMoveEnd = () => {
    this.props.onMoveEnd(this.getPositions(this.state))
  }

  getPositions = state => {
    const { x1, x2, y1, y2 } = state
    return {
      x1: Math.min(x1, x2),
      x2: Math.max(x1, x2),
      y1: Math.min(y1, y2),
      y2: Math.max(y1, y2)
    }
  }

  render() {
    const { x1, y1, x2, y2 } = this.state

    return (
      <Fragment>
        <Rect
          x={x1}
          y={y1}
          width={x2 - x1}
          height={y2 - y1}
          fill="red"
          shadowBlur={10}
        />
        <Circle
          x={x1}
          y={y1}
          radius={10}
          fill={"black"}
          shadowBlur={5}
          draggable
          onDragMove={this.onDragA}
          onDragEnd={this.onMoveEnd}
        />
        <Circle
          x={x2}
          y={y2}
          radius={10}
          fill={"black"}
          shadowBlur={5}
          draggable
          onDragMove={this.onDragB}
          onDragEnd={this.onMoveEnd}
        />
      </Fragment>
    )
  }
}

export default Obstacle
