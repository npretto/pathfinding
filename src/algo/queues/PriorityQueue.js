export default class PriorityQueue {
  constructor(compare = (a, b) => a.cost - b.cost, getId = a => a.id) {
    this.compare = compare
    this.getId = getId
    this.items = []
  }

  size = () => this.items.length

  isEmpty = () => {
    return this.size() === 0
  }

  containsId = id => {
    return this.items.find(i => {
      return this.getId(i) === id
    })
      ? true
      : false
  }

  contains = item => this.containsId(this.getId(item))

  add = item => {
    if (!this.contains(item)) {
      this.items.push(item)
      this.items.sort(this.compare)
    } else {
      const index = this.items.findIndex(i => this.getId(i) == this.getId(item))
      this.items[index] = item
      this.items.sort(this.compare)
    }
  }

  /**
   * returns and removes next item
   */
  getNext = () => this.items.shift()
}
