import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import React from 'react'
import Logo from '../components/Logo'

interface NoteReaderType {}
const NoteReader: React.FC<NoteReaderType> = () => {
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
			<Content style={{ padding: '0 50px' }}>
				<div>12</div>
			</Content>
		</Layout>
	)
}

export default NoteReader
