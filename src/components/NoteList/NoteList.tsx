import React from 'react'
import { NoteType } from '../../types/Note'
import {
	NoteContainer,
	NoteTag,
	NoteTagContainer,
	NoteTitle,
} from './NoteListStyled'

interface NoteListProps {
	notes: NoteType[]
	onSelectNote?: (note: NoteType) => void
}

const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote }) => {
	return (
		<>
			{notes.map((note) => {
				return (
					<NoteContainer
						key={note.id}
						onClick={() => onSelectNote && onSelectNote(note)}
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
