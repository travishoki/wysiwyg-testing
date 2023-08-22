export const clamp = (value: number, max: number, min: number) => {
  return value > max ? max : value < min ? min : value
}
