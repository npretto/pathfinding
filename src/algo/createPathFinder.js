import { cloneDeep } from "lodash"
import { dist } from "../math"

export const createPathFinder = (queue, heuristic = (from, to) => 1) => (
  nodes,
  links
) => {
  return function*(start, goal) {
    const frontier = queue
    frontier.add({ id: start, cost: 0 })

    const cameFrom = {}
    cameFrom[start] = null

    const costsSoFar = {}
    costsSoFar[start] = 0

    let path = null

    yield cloneDeep({ frontier, costsSoFar, cameFrom, path })

    while (!frontier.isEmpty()) {
      const current = frontier.getNext()

      // console.log("current", current)
      // console.log("nodes.byId[current]", nodes.byId[current])
      // console.log("cameFrom", cameFrom)

      for (let next of nodes.byId[current.id].neighbors) {
        // console.log("next", next)
        // console.log("Object.keys(cameFrom)", Object.keys(cameFrom))
        const cost =
          costsSoFar[current.id] +
          dist(nodes.byId[current.id], nodes.byId[next])

        if (
          !Object.keys(cameFrom).find(i => i == next) ||
          cost < costsSoFar[next]
        ) {
          //node not yet seen
          costsSoFar[next] = cost
          // console.log(
          //   "adding ",
          //   next,
          //   " with cost ",
          //   cost + heuristic(nodes.byId[next], nodes.byId[goal])
          // )
          frontier.add({
            id: next,
            cost: cost + heuristic(nodes.byId[next], nodes.byId[goal])
          })
          cameFrom[next] = current.id

          if (next === goal && path == null) {
            path = [goal]
            let node = goal
            while (node != start) {
              const prev = cameFrom[node]
              path.push(prev)
              node = prev
              // console.log(prev, node)
            }
          }
        }
      }
      yield cloneDeep({ frontier, costsSoFar, cameFrom, path })
    }
    console.log("END")
  }
}

export const eucledianDistance = (from, to) => dist(from, to)
