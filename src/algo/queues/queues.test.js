import PriorityQueue from "./PriorityQueue"

it("should be empty when created", () => {
  const p = new PriorityQueue((a, b) => a - b, a => a)
  expect(p.isEmpty()).toBe(true)
})

it("should not be empty when something is inside", () => {
  const p = new PriorityQueue((a, b) => a - b, a => a)
  p.add(1)
  expect(p.isEmpty()).toBe(false)
})

it("should update size", () => {
  const p = new PriorityQueue((a, b) => a - b, a => a)
  p.add(5)
  expect(p.size()).toBe(1)
  p.add(1)
  expect(p.size()).toBe(2)
  p.getNext()
  expect(p.size()).toBe(1)
  p.getNext()
  expect(p.size()).toBe(0)

  expect(p.isEmpty()).toBe(true)
})

it("should return the correct items", () => {
  const p = new PriorityQueue((a, b) => a - b, a => a)
  p.add(5)
  p.add(1)
  // 1 5
  expect(p.getNext()).toBe(1)
  p.add(6)
  expect(p.getNext()).toBe(5)
  expect(p.getNext()).toBe(6)
})

it("contains should work", () => {
  const p = new PriorityQueue((a, b) => a.value - b.value, item => item.id)

  expect(p.contains({ id: 1 })).toBe(false)
  p.add({ value: 10, id: 0 })
  expect(p.contains({ id: 1 })).toBe(false)
  p.add({ value: 7, id: 1 })
  expect(p.contains({ id: 1 })).toBe(true)
  expect(p.containsId(1)).toBe(true)
  p.getNext()
  expect(p.contains({ id: 1 })).toBe(false)
})

it("should substitute elements with the same id", () => {
  const p = new PriorityQueue((a, b) => a.value - b.value, a => a.id)
  p.add({ value: 0, id: 0 })
  expect(p.size()).toBe(1)
  p.add({ value: 1, id: 1 })
  expect(p.size()).toBe(2)
  p.add({ value: 3, id: 1 })
  expect(p.size()).toBe(2)
  expect(p.getNext().value).toBe(0)
  expect(p.getNext().value).toBe(3)
})
