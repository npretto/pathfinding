const chapters = [
  {
    title: "1.  INTRODUCTION",
    content: `
The aim of this interactive lesson is to explain how BSD, Dijkstra and A* can be seen as the same generalized graph algorithm with different parameters.

The general algorithm explores the graph by adding nodes in a frontier and visiting them in a certain order.

Each time a node is visited, its neighbors are added to the frontier.

The algorithm stops when the frontier is empty.

The algorithm can behave in different ways depending on the Queue used for the frontier.

`,
    state: {}
  },

  {
    title: "2.  Breadth-first search",
    content: `
BFS is the simplest graph search.

In BFS the queue is a simple FIFO (First In First Out)

Take a minute to explore the how the algorithm behaves.`,
    state: { queue: "fifo" }
  },
  //   {
  //     title: "2.1 Problems",
  //     content: `One of the problems of BFS is that it doesn't take into account costs.

  // In this simple graph it's hard to notice the problem since all the nodes are either at distance L or sqrt(2)*L  but it can already fail to find the optimal solution as you can see in the following scenario `,
  //     state: JSON.parse(
  //       `{"obstacle1":{"x1":88,"x2":288,"y1":360,"y2":473},"obstacle2":{"x1":312,"x2":557,"y1":410,"y2":470},"queue":"fifo","heuristic":"nonAdmissable"}`
  //     ),
  //     robot: 21,
  //     goal: 10
  //   },

  {
    title: "3.  Dijstra",
    content: `To fix the problems of BFS we can use a PriorityQueue instead of a FIFO.
  
  A priority queue needs a parameter to order the nodes in the frontier by, for Dijstra's algorithm the ordering is done by the function \`f(current, next) : costSoFar(current) + cost(current,next)\``,
    state: JSON.parse(
      `{"obstacle1":{"x1":217,"x2":271,"y1":152,"y2":202},"obstacle2":{"x1":312,"x2":557,"y1":410,"y2":470},"queue":"priority","heuristic":"omogeneus"}`
    ),
    robot: 7,
    goal: 32
  },

  {
    title: "4   A*",
    content: `
To speed up Dijstra's algorithm we can use an heuristic to decide which nodes to visits first.

Instead of ordering the nodes in the frontier by the cost of getting to it, we can order them by the cost of getting to that node + an heuristic estimation of getting to the goal from that specific node.

If the heuristic is admissable (see next chapter) the algorithm is guaranteed to find the optimal solution and it will be faster than the previous algorithms

The heueristic used in tutorial is the simple euclidean distance`,
    state: JSON.parse(
      `{"obstacle1":{"x1":217,"x2":271,"y1":152,"y2":202},"obstacle2":{"x1":312,"x2":557,"y1":410,"y2":470},"queue":"priority","heuristic":"euclidean"}`
    ),
    robot: 7,
    goal: 32
  },
  {
    title: "5  Heuristics",
    content: `
  An heuristic is defined 'Admissable' if it never overestimates the actual distance.
  
  If the heuristic is not admissable A* could fail to find the best solution.
  
  The simplest way of making the euclidea distance non admissable is to simply multiply it by a factor K > 0.
  
  Try to play witht he value K to see what happens to the algorithm`,
    state: JSON.parse(
      `{"obstacle1":{"x1":413,"x2":485,"y1":89,"y2":478},"obstacle2":{"x1":98,"x2":421,"y1":416,"y2":483},"queue":"priority","heuristic":"nonAdmissable"}`
    ),
    robot: 0,
    goal: 63
  }
]

export default chapters.map((c, i) => ({ ...c, index: i }))
