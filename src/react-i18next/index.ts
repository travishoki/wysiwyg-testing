export type Namespace = string
export type KeyPrefix = string

export type TFunction<_n extends Namespace, _k extends KeyPrefix> = (str: string) => string
