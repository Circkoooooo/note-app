import { useLocation, useNavigate } from 'react-router-dom'
import { NoteType } from '../types/Note'

const NOTE_EDIT = '/note/edit'
const NOTE_PREVIEW = '/note/preview'

export const useNoteRouter = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const routerToHome = () => {
		navigate('/')
	}

	const routerToEdit = (note: NoteType) => {
		if (!note) {
			routerToHome()
			return
		}
		navigate(`${NOTE_EDIT}?id=${note.id}`, {
			state: note,
		})
	}

	const routerToPreview = (note: NoteType) => {
		if (!note) {
			routerToHome()
			return
		}
		navigate(`${NOTE_PREVIEW}?id=${note.id}`, {
			state: note,
		})
	}

	return {
		location,
		navigate,
		routerToHome,
		routerToEdit,
		routerToPreview,
	}
}
