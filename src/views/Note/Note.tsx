import { v4 } from 'uuid'
import { Button, Empty, Input, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import IDBStoreContext, { DATABASE_NAME, IDBStoreDatabaseType, STORE_NAME } from '../../context/IDBStoreContext'
import MenuGroup from '../../components/MenuGroup/MenuGroup'
import NoteList from '../../components/NoteList/NoteList'
import { getIdbDatabase, IDBGetAll } from '../../lib/idb'
import { NoteType } from '../../types/Note'
import { useNoteRouter } from '../../hooks/useNoteRouter'

const Note = () => {
	const [notes, setNotes] = useState<NoteType[]>([])
	const [db, setDb] = useState<IDBStoreDatabaseType>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newNoteTitle, setNewNoteTitle] = useState('')

	const { routerToEdit, routerToPreview } = useNoteRouter()

	const noteDb = useContext(IDBStoreContext)

	useEffect(() => {
		;(async () => {
			if (!noteDb) {
				setDb(await getIdbDatabase(DATABASE_NAME, STORE_NAME, 1))
			} else {
				setDb(noteDb)
			}
		})()
	}, [])

	useEffect(() => {
		if (db) {
			IDBGetAll({
				db,
				storeName: STORE_NAME,
			}).then((res) => {
				setNotes(res)
			})
		}
	}, [db])

	const newNote = () => {
		setIsModalOpen(true)
	}
	const handleOk = () => {
		if (newNoteTitle.length === 0) {
			return
		}
		routerToEdit({
			id: v4(),
			title: newNoteTitle,
		} as NoteType)
		setIsModalOpen(false)
		setNewNoteTitle('')
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<MenuGroup elementSpace={8} split={[1]}>
				<Button icon={<PlusOutlined />} onClick={newNote} type='primary'>
					新建笔记
				</Button>
			</MenuGroup>
			{notes.length === 0 ? (
				<Empty
					description='暂无笔记'
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				/>
			) : (
				<NoteList notes={notes} onSelectNote={(note) => routerToPreview(note)} />
			)}
			<Modal
				title='新笔记标题'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='确认'
				cancelText='取消'
			>
				<Input
					value={newNoteTitle}
					showCount
					allowClear
					maxLength={30}
					status={newNoteTitle.length === 0 ? 'error' : ''}
					onChange={(event) => {
						setNewNoteTitle(event.currentTarget.value)
					}}
				/>
			</Modal>
		</>
	)
}

export default Note
