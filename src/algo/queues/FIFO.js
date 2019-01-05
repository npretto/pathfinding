export default class FIFO {
  constructor(getId = a => a) {
    this.getId = getId
    this.items = []
  }

  size = () => this.items.length

  isEmpty = () => {
    return this.size() === 0
  }

  contains = item => {
    const id = this.getId(item)
    return this.items.find(i => this.getId(i) === id) ? true : false
  }

  add = item => {
    this.items.push(item)
  }

  /**
   * returns and removes next item
   */
  getNext = () => this.items.shift()
}
