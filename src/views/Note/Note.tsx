import { v4 } from 'uuid'
import { Button, Input, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuGroup from '../../components/MenuGroup/MenuGroup'
import NoteList from '../../components/NoteList/NoteList'
import IDBStoreContext, {
	DATABASE_NAME,
	IDBStoreDatabaseType,
	STORE_NAME,
} from '../../context/IDBStoreContext'
import { getIdbDatabase, IDBGetAll } from '../../lib/idb'
import { NoteType } from '../../types/Note'

const NOTE_EDIT = '/note/edit'
const NOTE_PREVIEW = '/note/preview'

const Note = () => {
	const [notes, setNotes] = useState<NoteType[]>([])
	const [db, setDb] = useState<IDBStoreDatabaseType>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newNoteTitle, setNewNoteTitle] = useState('')

	const navigate = useNavigate()
	const selectNote = (note: NoteType) => {
		navigate(`${NOTE_PREVIEW}?id=${note.id}`)
	}

	const editNote = (id: string) => {
		navigate(`${NOTE_EDIT}?id=${id}`, {
			state: {
				title: newNoteTitle,
			},
		})
	}

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
		editNote(v4())
		setIsModalOpen(false)
		setNewNoteTitle('')
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			<MenuGroup elementSpace={8} split={[1]}>
				<Button icon={<PlusOutlined />} onClick={newNote}>
					新建笔记
				</Button>
			</MenuGroup>
			<NoteList notes={notes} onSelectNote={(note) => selectNote(note)} />
			<Modal
				title='新笔记标题'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='确认'
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
