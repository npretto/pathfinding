import React, { Component } from "react"
import { Arrow, Layer, Stage } from "react-konva"
import Link from "../figures/Link"
import Node from "../figures/Node"
import Robot from "../figures/Robot"
import Goal from "../figures/Goal"

import { entries } from "../utils"

export default class MyCanvas extends Component {
  render() {
    const {
      nodes,
      links,
      pathSteps,
      step,
      hasDonePath,
      robot,
      goal
    } = this.props

    const pathState =
      hasDonePath && pathSteps.length > step ? pathSteps[step] : {}
    console.log("nodes", nodes)
    console.log("current PathState", pathState)
    if (hasDonePath) {
      console.log("current PathState.frontier.items", pathState.frontier.items)
    }
    return (
      <Stage width={800} height={800}>
        <Layer>
          {entries(links).map(([i, l]) => (
            <Link key={i} from={nodes.byId[l.from]} to={nodes.byId[l.to]} />
          ))}
        </Layer>

        <Layer>
          {hasDonePath &&
            Object.entries(pathState.cameFrom)
              .filter(([a, b]) => b != null)
              .map(([toId, fromId]) => {
                const from = nodes.byId[fromId]
                const to = nodes.byId[toId]
                const isInPath =
                  pathState.path != null &&
                  pathState.path.includes(parseInt(toId)) &&
                  pathState.path.includes(parseInt(fromId))

                return (
                  <Arrow
                    key={toId}
                    x={from.x}
                    y={from.y}
                    points={[
                      0,
                      0,
                      ((to.x - from.x) * 2) / 3,
                      ((to.y - from.y) * 2) / 3
                    ]}
                    pointerLength={20}
                    pointerWidth={20}
                    fill={isInPath ? "black" : "gray"}
                    stroke={isInPath ? "black" : "gray"}
                    strokeWidth={4}
                  />
                )
              })}
        </Layer>
        <Layer>
          {nodes.allIds
            .map(id => [id, nodes.byId[id]])
            .map(([i, n]) => (
              <Node
                key={i}
                {...n}
                name={`${i}`}
                inFrontier={
                  hasDonePath && pathState.frontier.items.find(a => a.id === i)
                    ? true
                    : false
                  // pathState.frontier.contains({ id: i })
                }
                visited={
                  hasDonePath && //Object.values(pathState.cameFrom).includes(i)
                  (pathState.cameFrom[i] || pathState.cameFrom[i] === null)
                }
              />
            ))}
        </Layer>
        <Layer>
          <Robot {...robot} onDragEnd={this.props.onRobotDrag} />
          <Goal {...goal} onDragEnd={this.props.onGoalDrag} />
        </Layer>
      </Stage>
    )
  }
}
