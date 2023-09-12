import { KeyPrefix, Namespace, TFunction } from "react-i18next"

const t: TFunction<KeyPrefix, Namespace> = (str: string) => str

const i18next = { t }

/* eslint-disable-next-line import/no-default-export */
export default i18next
