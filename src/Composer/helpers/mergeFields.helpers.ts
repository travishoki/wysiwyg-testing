export const formatMergeFieldTitle = (title: Maybe<string>) => {
  if (!title) return ""

  return title.replace(/_/g, " ").replace(/-/g, " ").split(" ").map(capitalizeWord).join(" ")
}

export const capitalizeWord = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
