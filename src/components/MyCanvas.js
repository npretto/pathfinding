import React, { Component } from "react"
import { Arrow, Layer, Stage } from "react-konva"
import Link from "../figures/Link"
import Node from "../figures/Node"
import Robot from "../figures/Robot"
import Goal from "../figures/Goal"

import { entries } from "../utils"
import Obstacle from "../figures/Obstacle"

export default class MyCanvas extends Component {
  render() {
    const {
      nodes,
      links,
      pathSteps,
      step,
      hasDonePath,
      robot,
      goal,
      obstacle1,
      obstacle2,
      onObstacleMove, // pass first param as number/name of obstacle
      onObstacleMoveEnd
    } = this.props

    const pathState =
      hasDonePath && pathSteps.length > step ? pathSteps[step] : {}
    console.log("nodes", nodes)
    console.log("current PathState", pathState)
    if (hasDonePath) {
      console.log("current PathState.frontier.items", pathState.frontier.items)
    }

    const lastPath = hasDonePath ? pathSteps[pathSteps.length - 1].path : []

    console.log("LAST PATH", lastPath)

    return (
      <Stage width={800} height={800}>
        <Layer>
          {entries(links).map(([i, l]) => {
            const isInPathLasthPath =
              lastPath != null &&
              lastPath.includes(parseInt(l.from)) &&
              lastPath.includes(parseInt(l.to))
            return (
              <Link
                key={i}
                from={nodes.byId[l.from]}
                to={nodes.byId[l.to]}
                isInPathLasthPath={isInPathLasthPath}
              />
            )
          })}
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
            .filter(([id, node]) => node.valid)
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
          <Obstacle
            {...obstacle1}
            onMove={onObstacleMove("obstacle1")}
            onMoveEnd={onObstacleMoveEnd}
          />
          <Obstacle
            {...obstacle2}
            onMove={onObstacleMove("obstacle2")}
            onMoveEnd={onObstacleMoveEnd}
          />
        </Layer>
        <Layer>
          <Robot {...robot} onDragEnd={this.props.onRobotDrag} />
          <Goal {...goal} onDragEnd={this.props.onGoalDrag} />
        </Layer>
      </Stage>
    )
  }
}
