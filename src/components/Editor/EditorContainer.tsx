import React, { useEffect, useState } from 'react'
import 'md-editor-rt/lib/style.css'
import MdEditor from 'md-editor-rt'
import { EditorContainer } from './EditorStyled'

interface EditorProps {
	rawText?: string
	style?: React.CSSProperties
}

const Editor: React.FC<EditorProps> = ({ rawText, style }) => {
	const [text, setText] = useState(rawText as string | '')

	useEffect(() => {}, [text])
	return (
		<EditorContainer style={style}>
			<MdEditor
				modelValue={text}
				onChange={setText}
				toolbars={[
					'bold',
					'underline',
					'italic',
					'-',
					'strikeThrough',
					'title',
					'sub',
					'sup',
					'quote',
					'unorderedList',
					'orderedList',
					'task',
					'-',
					'codeRow',
					'code',
					'link',
					'image',
					'table',
					'mermaid',
					'katex',
					'=',
					'save',
					'revoke',
					'next',
				]}
				style={{
					height: '100%',
				}}
			/>
		</EditorContainer>
	)
}

export default Editor
