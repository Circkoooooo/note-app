import React, { useCallback } from 'react'
import {
	NoteContainer,
	NoteTag,
	NoteTagContainer,
	NoteTitle,
} from './NoteListStyled'

export type NoteItemType = {
	title: string
	markdownRaw: string
	tags?: string[]
}

export type NoteType = {
	id: string
} & NoteItemType

interface NoteListProps {
	notes: NoteType[]
	onSelectNote?: (note: NoteType) => void
}

const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote }) => {
	const handleSelectNote = useCallback(
		(note: NoteType) => (onSelectNote ? onSelectNote(note) : null),
		[onSelectNote]
	)
	return (
		<>
			{notes.map((note) => {
				return (
					<NoteContainer
						key={note.id}
						onClick={() => handleSelectNote(note)}
					>
						<NoteTitle>{note.title}</NoteTitle>
						<NoteTagContainer>
							{note.tags?.map((tag, index) => (
								<NoteTag key={index}>{tag}</NoteTag>
							))}
						</NoteTagContainer>
					</NoteContainer>
				)
			})}
		</>
	)
}
export default NoteList
