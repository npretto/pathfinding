import { cloneDeep } from "lodash"

export const createPathFinder = (queue, heuristic) => (nodes, links) => {
  return function*(start, end) {
    const costsSoFar = {}
    const frontier = queue
    frontier.add(start)
    const cameFrom = {}
    cameFrom[start] = null

    while (!frontier.isEmpty()) {
      const current = frontier.getNext()
      // console.log("current", current)
      // console.log("nodes.byId[current]", nodes.byId[current])
      // console.log("cameFrom", cameFrom)

      for (let next of nodes.byId[current].neighbors) {
        // console.log("next", next)
        // console.log("Object.keys(cameFrom)", Object.keys(cameFrom))

        if (!Object.keys(cameFrom).find(i => i == next)) {
          //node not yet seen

          frontier.add(next)
          cameFrom[next] = current

          yield cloneDeep({ frontier, costsSoFar, cameFrom })
        }
      }
    }
    console.log("END")
  }
}

export const h = () => {}
