import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import NoteReader from './pages/NoteReader'

function App() {
	const Redirect = ({ to }: { to: string }) => {
		const navigate = useNavigate()
		useEffect(() => {
			navigate(to)
		})
		return null
	}

	return (
		<Routes>
			<Route path='/' element={<Redirect to='/home' />} />
			<Route path='/home/*' element={<Home />} />
			<Route path='/read/:id' element={<NoteReader />} />
		</Routes>
	)
}

export default App
