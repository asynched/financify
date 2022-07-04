export default function WaitForProperty({
  property,
  afterDefined,
  beforeDefined,
}) {
  if (!property) {
    return beforeDefined
  }

  return afterDefined
}
