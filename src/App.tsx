import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'

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
		</Routes>
	)
}

export default App
