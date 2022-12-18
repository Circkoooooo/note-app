import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import Logo from '../components/Logo'
import Editor from '../components/Editor/EditorContainer'

interface NoteReaderType {
	rawText?: string
}
const NoteReader: React.FC<NoteReaderType> = ({ rawText }) => {
	return (
		<Layout
			className='layout'
			style={{
				minHeight: '100vh',
			}}
		>
			<Header>
				<Logo direction='row' />
			</Header>
			<Content
				style={{
					display: 'flex',
				}}
			>
				<Editor
					rawText={rawText}
					style={{
						flex: '1',
					}}
				/>
			</Content>
		</Layout>
	)
}

export default NoteReader
