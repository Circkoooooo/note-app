import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteList from '../../components/NoteList/NoteList'
import IDBStoreContext, {
	DATABASE_NAME,
	IDBStoreDatabaseType,
	STORE_NAME,
} from '../../context/IDBStoreContext'
import { getIdbDatabase, IDBGetAll } from '../../lib/idb'
import { NoteType } from '../../types/Note'

const Note = () => {
	const [notes, setNotes] = useState<NoteType[]>([])
	const [db, setDb] = useState<IDBStoreDatabaseType>()
	const navigate = useNavigate()
	const selectNote = (note: NoteType) => {
		navigate(`/note?id=${note.id}`)
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

	return <NoteList notes={notes} onSelectNote={(note) => selectNote(note)} />
}

export default Note
