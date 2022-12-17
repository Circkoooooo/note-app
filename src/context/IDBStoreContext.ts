import { IDBPDatabase } from 'idb'
import { createContext } from 'react'

export const DATABASE_NAME = 'note'
export const STORE_NAME = 'note_list'

const IDBStoreContext = createContext<IDBPDatabase<unknown> | null>(null)
export default IDBStoreContext
