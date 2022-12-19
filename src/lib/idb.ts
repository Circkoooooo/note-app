import { IDBPDatabase, openDB } from 'idb'
import { NoteType } from '../types/Note'

type ValidKey = number | string | Date
interface OperateParams<P, T> {
	(props: P): Promise<T>
}

type OP<P, T = any> = OperateParams<P, T>

export type IDBOperate = {
	db: IDBPDatabase
	storeName: string
	key?: ValidKey
	value?: NoteType
}

export const getIdbDatabase = async (
	databaseName: string,
	storeName: string,
	version: number = 1
) => {
	const db = await openDB(databaseName, version, {
		upgrade(database) {
			if (!database.objectStoreNames.contains(storeName)) {
				database.createObjectStore(storeName, { autoIncrement: true })
			}
		},
	})
	return db
}

export const IDBIsKeyValueExist: OP<IDBOperate> = async ({
	db,
	storeName,
	key,
}) => {
	const isExist = await db.get(storeName, key as unknown as any)
	return isExist
}

export const IDBAddKeyValue: OP<IDBOperate> = async ({
	db,
	storeName,
	key,
	value,
}) => {
	if (!key || !value) return false
	if (
		await IDBIsKeyValueExist({
			db,
			storeName,
			key,
		})
	)
		return false
	await db.add(storeName, value, key)
	return true
}

export const IDBDeleteKeyValue: OP<IDBOperate> = async ({
	db,
	storeName,
	key,
}) => {
	if (!key) return false
	if (
		await IDBIsKeyValueExist({
			db,
			storeName,
			key,
		})
	)
		return false
	await db.delete(storeName, key)
	return true
}

export const IDBGetOneByKey: OP<IDBOperate, NoteType> = ({
	db,
	storeName,
	key,
}) => {
	return new Promise<NoteType>((resolve, reject) => {
		if (!key) {
			reject(new Error('no key'))
			return
		}
		db.get(storeName, key).then((value) => {
			resolve(value)
		})
	})
}

export const IDBPutOne: OP<IDBOperate, ValidKey> = ({
	db,
	storeName,
	key,
	value,
}) => {
	return new Promise<ValidKey>((resolve, reject) => {
		try {
			db.put(storeName, value, key).then((res) => {
				resolve(res as ValidKey)
			})
		} catch (err) {
			reject(err)
		}
	})
}

export const IDBGetAll: OP<IDBOperate, NoteType[]> = ({ db, storeName }) => {
	return new Promise<NoteType[]>((resolve) => {
		db.getAll(storeName).then((res) => {
			resolve(res)
		})
	})
}
