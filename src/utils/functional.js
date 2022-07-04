export const pipeable = (source) => ({
  collect: () => source,
  pipe: (fn) => pipeable(fn(source)),
})

export const noop = () => void 0

/**
 * @template T Array type.
 * @param { Array<T> } source Source iterable to partition.
 * @param { (item: T) => boolean } predicate Partition predicate.
 * @returns { [T, T] } A parititioned array.
 */
export const partition = (source, predicate) => {
  const a = []
  const b = []

  for (const item of source) {
    if (predicate(item)) {
      a.push(item)
    } else {
      b.push(item)
    }
  }

  return [a, b]
}

/**
 * @template T Array type.
 * @param { Array<T> } source Array of items to sum.
 * @param { (item: T) => number } predicate Predicate function to retrieve the sum value
 * @returns { number } Sum of the array
 */
export const sum = (source, predicate) => {
  return source.reduce((total, item) => total + predicate(item), 0)
}

export const valueOrDefault = ($default) => (value) => value || $default
