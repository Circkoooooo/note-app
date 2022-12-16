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
	const selectNote = (note: NoteType) => {
		console.log(note)
	}

	return (
		<NoteList notes={mockNotes} onSelectNote={(note) => selectNote(note)} />
	)
}

export default Note
