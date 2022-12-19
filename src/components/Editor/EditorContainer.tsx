import React, { useContext, useEffect, useState } from 'react'
import 'md-editor-rt/lib/style.css'
import MdEditor from 'md-editor-rt'
import { useLocation } from 'react-router-dom'
import { EditorContainer } from './EditorStyled'
import { getIdbDatabase, IDBGetOneByKey, IDBPutOne } from '../../lib/idb'
import IDBStoreContext, {
	DATABASE_NAME,
	IDBStoreDatabaseType,
	STORE_NAME,
} from '../../context/IDBStoreContext'
import { NoteType } from '../../types/Note'

interface EditorProps {
	style?: React.CSSProperties
}

const Editor: React.FC<EditorProps> = ({ style }) => {
	const [noteObject, setNoteObject] = useState<NoteType>({} as NoteType)
	const [db, setDb] = useState<IDBStoreDatabaseType>()
	const location = useLocation()
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
		if (!db) return
		const id = new URLSearchParams(location.search).get('id')
		if (!id || !db) {
			return
		}

		IDBGetOneByKey({
			db,
			storeName: STORE_NAME,
			key: id,
		}).then((res) => {
			if (typeof res === 'object') {
				setNoteObject(res as NoteType)
			}
		})
	}, [db])

	const saveNoteObject = () => {
		if (!db) return
		IDBPutOne({
			db,
			storeName: STORE_NAME,
			key: noteObject.id,
			value: noteObject,
		})
	}

	return (
		<EditorContainer style={style}>
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
		</EditorContainer>
	)
}

export default Editor
