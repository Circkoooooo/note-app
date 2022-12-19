import { IDBPDatabase } from 'idb'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import IDBStoreContext, {
	DATABASE_NAME,
	STORE_NAME,
} from './context/IDBStoreContext'
import { getIdbDatabase } from './lib/idb'
import Home from './pages/Home'
import NoteEditor from './pages/NoteEditor'
import NotePreview from './pages/NotePreview'

function App() {
	const [noteDb, setNoteDb] = useState<IDBPDatabase<unknown> | null>(null)
	const Redirect = ({ to }: { to: string }) => {
		const navigate = useNavigate()
		useEffect(() => {
			navigate(to)
		})
		return null
	}

	useEffect(() => {
		;(async () => {
			if (!noteDb) {
				const db = await getIdbDatabase(DATABASE_NAME, STORE_NAME, 1)
				setNoteDb(db)
			}
		})()
	})

	return (
		<IDBStoreContext.Provider value={noteDb}>
			<Routes>
				<Route path='/' element={<Redirect to='/home' />} />
				<Route path='/home/*' element={<Home />} />
				<Route path='/note/edit' element={<NoteEditor />} />
				<Route path='/note/preview' element={<NotePreview />} />
			</Routes>
		</IDBStoreContext.Provider>
	)
}

export default App
