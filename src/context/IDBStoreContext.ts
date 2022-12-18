import { IDBPDatabase } from 'idb'
import { createContext } from 'react'

export const DATABASE_NAME = 'note'
export const STORE_NAME = 'note_list'

export type IDBStoreDatabaseType = IDBPDatabase<unknown>
const IDBStoreContext = createContext<IDBStoreDatabaseType | null>(null)
export default IDBStoreContext
