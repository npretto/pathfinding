import produce from "immer"
import React, { Component } from "react"
import { Arrow, Layer, Stage } from "react-konva"
import { createPathFinder, h } from "./algo/createPathFinder"
import FIFO from "./algo/queues/FIFO"
import "./App.css"
import Link from "./figures/Link"
import Node from "./figures/Node"
import { dist } from "./math"
import { entries, newEntries } from "./utils"

class App extends Component {
  state = {
    nodes: newEntries(),
    links: newEntries(),
    pathSteps: null,
    step: 0,
    hasDonePath: false
  }

  async componentDidMount() {
    await this.generateNodes(8, 70)
    this.generateLinks(100)
  }

  generateNodes(size, dist) {
    return new Promise((resolve, reject) => {
      let nodes = newEntries()

      const addNode = (i, node) => {
        nodes.byId[i] = { ...node, neighbors: [] }
        nodes.allIds.push(i)
      }

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          addNode(i * size + j, {
            x: j * dist + dist / 2,
            y: i * dist + dist / 2
          })
        }
      }

      this.setState({ nodes }, () => resolve())
    })
  }

  generateLinks(maxDist) {
    // return new Promise((resolve, reject) => {
    // this.setState(
    // produce(this.state, state => {
    // console.log(JSON.stringify(state))
    const nodes = JSON.parse(JSON.stringify(this.state.nodes))
    let links = newEntries()

    const addLink = (i, l) => {
      links.byId[i] = l
      links.allIds.push(i)
    }

    let index = 0
    for (let i = 0; i < nodes.allIds.length; i++) {
      for (let j = i + 1; j < nodes.allIds.length; j++) {
        const a = nodes.byId[i]
        const b = nodes.byId[j]

        if (dist(a, b) < maxDist) {
          nodes.byId[i].neighbors.push(j)
          nodes.byId[j].neighbors.push(i)
          addLink(index, { from: i, to: j })

          index++
        }
      }
    }

    this.setState({ nodes, links })
    // }),
    // () => resolve()
    // )
    // })
  }

  moveNode = () => {
    this.setState(
      produce(this.state, state => {
        state.nodes.byId[1].x += 2
        state.nodes.byId[1].y += 1
      })
    )
  }

  test = () => {
    const pf = createPathFinder(new FIFO(), h)
    const findPath = pf(this.state.nodes, this.state.links)
    this.setState({ pathSteps: [] }, () => {
      for (let pathStep of findPath(35, 0)) {
        console.log(pathStep)
        this.setState(
          produce(state => {
            state.pathSteps.push(pathStep)
            // state.step = state.pathSteps.length - 1
          })
        )
      }
      this.setState({ hasDonePath: true })
    })
  }

  render() {
    const { nodes, links, pathSteps, step, hasDonePath } = this.state

    const pathState = //use memoize-one
      hasDonePath && pathSteps.length > step ? pathSteps[step] : {}

    return (
      <div>
        <button onClick={this.test}>TEST </button>{" "}
        {hasDonePath && (
          <input
            style={{ width: "400px" }}
            type="range"
            min={0}
            max={pathSteps.length - 1}
            value={step}
            step={1}
            onInput={e => this.setState({ step: e.target.value })}
            onChange={e => this.setState({ step: e.target.value })}
          />
        )}
        <Stage width={window.innerWidth} height={window.innerHeight}>
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
                      fill={"gray"}
                      stroke={"gray"}
                      strokeWidth={4}
                    />
                  )
                })}
          </Layer>
          <Layer>
            {nodes.allIds
              .map(id => [id, nodes.byId[id]])
              .map(([i, n]) => (
                <Node key={i} {...n} name={`${i}`} />
              ))}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default App
