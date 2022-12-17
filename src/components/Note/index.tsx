import { useNavigate } from 'react-router-dom'
import NoteList, { NoteType } from './NoteList'

const mockNotes: NoteType[] = [
	{
		id: '001',
		title: '笔记1',
		markdownRaw: '内容1',
		tags: ['tag1', 'tag2'],
	},
	{
		id: '002',
		title: '笔记2',
		markdownRaw: '内容2',
		tags: [],
	},
	{
		id: '003',
		title: '笔记2',
		markdownRaw: '内容2',
		tags: ['412', '213123', '412', '213123', '412'],
	},
	{
		id: '004',
		title: '笔记2',
		markdownRaw: '内容2',
		tags: [],
	},
]

const Note = () => {
	const navigate = useNavigate()
	const selectNote = (note: NoteType) => {
		navigate(`/read/${note.id}`)
	}

	return (
		<NoteList notes={mockNotes} onSelectNote={(note) => selectNote(note)} />
	)
}

export default Note
