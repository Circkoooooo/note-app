import { IDBPDatabase, openDB } from 'idb'

interface OperateParams<P = {}> {
	(props: P): any
}
type OP<P = {}> = OperateParams<P>

export type IDBOperate = {
	db: IDBPDatabase
	storeName: string
	key: string
	value: string
}

export const getIdbDatabase = async (
	databaseName: string,
	storeName: string,
	version: number = 1
) => {
	const db = await openDB(databaseName, version, {
		upgrade(database) {
			if (!database.objectStoreNames.contains(storeName)) {
				database.createObjectStore(storeName)
			}
		},
	})
	return db
}

export const IDBIsKeyValueExist = async (
	db: IDBPDatabase<any> | any,
	storeName: string,
	key: string
) => {
	const isExist = await db.get(storeName, key)
	return isExist
}

export const IDBAddKeyValue: OP<IDBOperate> = async ({
	db,
	storeName,
	key,
	value,
}) => {
	if (await IDBIsKeyValueExist(db, storeName, key)) return false
	await db.add(storeName, value, key)
	return true
}

export const IDBDeleteKeyValue: OP<IDBOperate> = async ({
	db,
	storeName,
	key,
}) => {
	if (await IDBIsKeyValueExist(db, storeName, key)) return false
	await db.delete(storeName, key)
	return true
}

export const IDBGetOneByKey: OP<IDBOperate> = async ({
	db,
	storeName,
	key,
}) => {
	const value = await db.get(storeName, key)
	return value
}
