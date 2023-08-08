export const formatTitle = (key: string) => key.split("-").map(capitalizeWord).join(" ")

export const capitalizeWord = (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
