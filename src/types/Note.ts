export type NoteItemType = {
	title: string
	rawText: string
	tags?: string[]
}

export type NoteType = {
	id: string
} & NoteItemType
