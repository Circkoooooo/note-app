import React, { useContext, useEffect, useState } from 'react'
import 'md-editor-rt/lib/style.css'
import MdEditor from 'md-editor-rt'
import { notification, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { EditorContainer } from './EditorStyled'
import {
	getIdbDatabase,
	IDBAddKeyValue,
	IDBGetOneByKey,
	IDBPutOne,
} from '../../lib/idb'
import IDBStoreContext, {
	DATABASE_NAME,
	IDBStoreDatabaseType,
	STORE_NAME,
} from '../../context/IDBStoreContext'
import { NoteType } from '../../types/Note'
import { useNoteRouter } from '../../hooks/useNoteRouter'

interface EditorProps {
	style?: React.CSSProperties
	isPreview?: boolean
}

const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />
const Editor: React.FC<EditorProps> = ({ style, isPreview = false }) => {
	const [api, contextHolder] = notification.useNotification()
	const [noteObject, setNoteObject] = useState<NoteType>({
		id: '',
		title: '',
		rawText: '',
		tags: [],
	} as NoteType)
	const [db, setDb] = useState<IDBStoreDatabaseType>()
	const [isLoad, setIsLoad] = useState<boolean>(true)
	const { location, routerToHome } = useNoteRouter()
	const noteDb = useContext(IDBStoreContext)

	useEffect(() => {
		// 这里来判断是否有db来重新获取db
		if (!noteDb) {
			;(async () => {
				setDb(await getIdbDatabase(DATABASE_NAME, STORE_NAME, 1))
			})()
		} else {
			setDb(noteDb)
		}
	}, [])

	// 获取数据流程
	useEffect(() => {
		const id = new URLSearchParams(location.search).get('id')
		if (!id || !db) return

		IDBGetOneByKey({
			db,
			storeName: STORE_NAME,
			key: id,
		}).then((res) => {
			// 预览
			if (typeof res === 'object') {
				setNoteObject(res as NoteType)
				setIsLoad(false)
				return
			}
			// 新建
			if (!id || !location.state.title) {
				routerToHome()
				return
			}
			const newNote: NoteType = location.state
			createNoteObject(id, newNote)
		})
	}, [db])

	const createNoteObject = async (key: string, value: NoteType) => {
		if (!db) return
		IDBAddKeyValue({
			db,
			storeName: STORE_NAME,
			key,
			value,
		}).then((res) => {
			if (res) {
				setIsLoad(false)
				setNoteObject(value)
			} else {
				api.error({
					message:
						'it was occured a unknown error, please try to refresh this page',
				})
			}
		})
	}

	const saveNoteObject = async () => {
		if (!db) return
		const data = await IDBGetOneByKey({
			db,
			storeName: STORE_NAME,
			key: noteObject.id,
		}).catch(() => {
			api.error({
				message:
					'Cannot check this current note, please check whether you modify the note id and then refresh current page',
			})
		})

		if (!data) return

		IDBPutOne({
			db,
			storeName: STORE_NAME,
			key: noteObject.id,
			value: noteObject,
		}).then(() => {
			api.info({
				message: 'OK, success to save the note',
			})
		})
	}

	return !isLoad ? (
		<EditorContainer style={style}>
			{contextHolder}
			{!isPreview ? (
				<MdEditor
					modelValue={noteObject.rawText}
					onChange={(value) => {
						setNoteObject({
							...noteObject,
							rawText: value,
						})
					}}
					onSave={saveNoteObject}
					toolbars={[
						'bold',
						'underline',
						'italic',
						'-',
						'strikeThrough',
						'title',
						'sub',
						'sup',
						'quote',
						'unorderedList',
						'orderedList',
						'task',
						'-',
						'codeRow',
						'code',
						'link',
						'image',
						'table',
						'mermaid',
						'katex',
						'=',
						'save',
						'revoke',
						'next',
					]}
					style={{
						height: '100%',
					}}
				/>
			) : (
				<MdEditor
					previewOnly
					modelValue={noteObject.rawText}
					style={{
						height: '100%',
					}}
				/>
			)}
		</EditorContainer>
	) : (
		<div
			style={{
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex',
			}}
		>
			<Spin indicator={antIcon} />
		</div>
	)
}

export default Editor
