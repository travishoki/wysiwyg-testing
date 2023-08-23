export type SearchPromise = {
  dismiss: () => void
  promise: Promise<null | string>
}
