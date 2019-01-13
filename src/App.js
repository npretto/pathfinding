import produce from "immer"
import React, { Component } from "react"
import { createPathFinder, eucledianDistance } from "./algo/createPathFinder"
import PriorityQueue from "./algo/queues/PriorityQueue"
import "./App.css"
import { dist } from "./math"
import { newEntries } from "./utils"
import MyCanvas from "./components/MyCanvas"
import FIFO from "./algo/queues/FIFO"

class App extends Component {
  state = {
    nodes: newEntries(),
    links: newEntries(),
    pathSteps: null,
    step: 0,
    hasDonePath: false,
    queue: "fifo",
    heuristic: "omogeneus"
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

  test = () => {
    // const pf = createPathFinder(new FIFO()) //BFS
    // const pf = createPathFinder(new PriorityQueue(), () => 0) // djstra
    // const pf = createPathFinder(new PriorityQueue(), eucledianDistance) //a*

    const queue = this.state.queue == "fifo" ? new FIFO() : new PriorityQueue()
    const heuristic =
      this.state.heuristic == "omogeneus" ? () => 0 : eucledianDistance

    const pf = createPathFinder(queue, heuristic)

    const findPath = pf(this.state.nodes, this.state.links)
    this.setState({ pathSteps: [], step: 0, hasDonePath: false }, () => {
      for (let pathStep of findPath(35, 0)) {
        console.log(pathStep)
        this.setState(
          produce(state => {
            state.pathSteps.push(pathStep)
            if (pathStep.path != null && state.step === 0)
              state.step = state.pathSteps.length - 1
          }),
          () => {
            this.setState({ hasDonePath: true })
          }
        )
      }
    })
  }

  render() {
    const { pathSteps, step, hasDonePath } = this.state

    return (
      <div className="mainContainer">
        <div className="left">
          <div className="top">
            <button onClick={this.test}> TEST </button>{" "}
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
          </div>
          <div className="canvasContainer">
            <MyCanvas {...this.state} />
          </div>
        </div>
        <div className="optionsPanel">
          options
          <br />
          <br />
          <label>
            Queue:
            <br />
            <select
              value={this.state.queue}
              onChange={e => this.setState({ queue: e.target.value })}
            >
              <option value="fifo">First In First Out</option>
              <option value="priority">Priority Queue</option>
            </select>
          </label>
          <br />
          <br />
          <label>
            Heuristic:
            <br />
            <select
              value={this.state.heuristic}
              onChange={e => {
                console.log(e, e.target.value)
                this.setState({ heuristic: e.target.value })
              }}
            >
              <option value="omogeneus">h(x) = 1</option>
              <option value="euclidean">Eucledian Distance</option>
            </select>
          </label>
        </div>
      </div>
    )
  }
}

export default App
