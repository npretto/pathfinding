const chapters = [
  {
    title: "1.  INTRODUCTION",
    content: `
The aim of this interactive lesson is to explain how BSD, Dijkstra and A* can be seen as the same generalized graph algorithm with different.

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

    state: {}
  },
  {
    title: "2.1 Problems",
    content: `One of the problems of BFS is that it doesn't take into account costs.
  
In this simple graph it's hard to notice the problem since all the nodes are either at distance L or sqrt(2)*L  but it can already fail to find the optimal solution as you can see in the following scenario `,
    state: {}
  },

  {
    title: "3.  Dijstra",
    content: `To fix the problems of BFS we can use a PriorityQueue instead of a FIFO.
  
  A priority queue needs a parameter to order the nodes in the frontier by, for Dijstra's algorithm the ordering is done by the function \`f(current, next) : costSoFar(current) + cost(current,next)\``,
    state: {}
  },

  {
    title: "4   A*",
    content: `
To speed up Dijstra's algorithm we can use an heuristic to decide which nodes to visits first.

Instead of ordering the nodes in the frontier by the cost of getting to it, we can order them by the cost of getting to that node + an heuristic estimation of getting to the goal from that specific node.

If the heuristic is admissable (see next chapter) the algorithm is guaranteed to find the optimal solution and it will be faster than the previous algorithms

The heueristic used in tutorial is the simple euclidean distance`,
    state: {}
  },
  {
    title: "4.1 Heuristics",
    content: `
  An heuristic is defined 'Admissable' if it never overestimates the actual distance.
  
  If the heuristic is not admissable A* could fail to find the best solution.
  
  The simplest way of making the euclidea distance non admissable is to simply multiply it by a factor K > 0.
  
  Try to play witht he value K to see what happens to the algorithm`,
    state: {}
  }

  //{ title: "Breadth-first search", content: "blablabla", state: {} }
]

export default chapters.map((c, i) => ({ ...c, index: i }))
