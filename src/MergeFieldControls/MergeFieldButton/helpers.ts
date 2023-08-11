export const formatMergeFieldTitle = (key: string) =>
  key.replace(/_/g, "-").split("-").map(capitalizeWord).join(" ")

export const capitalizeWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
