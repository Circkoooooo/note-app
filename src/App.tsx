import { IDBPDatabase } from 'idb'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import IDBStoreContext, {
	DATABASE_NAME,
	STORE_NAME,
} from './context/IDBStoreContext'
import { getIdbDatabase } from './lib/idb'
import Home from './pages/Home'
import NoteReader from './pages/NoteReader'

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
				<Route path='/edit' element={<NoteReader />} />
			</Routes>
		</IDBStoreContext.Provider>
	)
}

export default App
