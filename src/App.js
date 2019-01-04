import React, { Component, Fragment } from "react"
import { Circle, Layer, Line, Stage } from "react-konva"
import produce from "immer"
import "./App.css"
import { dist } from "./math"
import { entries, newEntries } from "./utils"
import Link from "./figures/Link"
import Node from "./figures/Node"

class App extends Component {
  state = {
    nodes: newEntries(),
    links: newEntries(),
    frontier: []
  }

  async componentDidMount() {
    await this.generateNodes(8, 70)
    this.generateLinks(100)
  }

  generateNodes(size, dist) {
    return new Promise((resolve, reject) => {
      let nodes = newEntries()

      const addNode = (i, node) => {
        nodes.byId[i] = node
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
    const { nodes } = this.state

    let links = newEntries()

    const addLink = (i, l) => {
      links.byId[i] = l
      links.allIds.push(i)
    }

    let index = 0
    for (let i = 0; i < nodes.allIds.length; i++) {
      for (let j = i; j < nodes.allIds.length; j++) {
        const a = nodes.byId[i]
        const b = nodes.byId[j]

        if (dist(a, b) < maxDist) {
          addLink(index++, { from: i, to: j })
        }
      }
    }

    this.setState({ links })
  }

  test = () => {
    this.setState(
      produce(this.state, state => {
        state.nodes.byId[1].x += 2
        state.nodes.byId[1].y += 1
      })
    )
  }

  render() {
    const { nodes, links } = this.state
    console.log("App.render()")

    return (
      <div>
        <button onClick={this.test}>TEST </button>{" "}
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {entries(links).map(([i, l]) => (
              <Link key={i} from={nodes.byId[l.from]} to={nodes.byId[l.to]} />
            ))}
          </Layer>
          <Layer>
            {nodes.allIds
              .map(id => [id, nodes.byId[id]])
              .map(([i, n]) => (
                <Node key={i} {...n} name={i} />
              ))}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default App
