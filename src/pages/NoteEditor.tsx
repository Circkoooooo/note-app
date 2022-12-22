import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Logo from '../components/Logo'
import Editor from '../components/Editor/Editor'

const NoteEditor = () => {
	return (
		<Layout
			className='layout'
			style={{
				overflow: 'hidden',
				height: '100vh',
			}}
		>
			<Header>
				<Logo direction='row' />
			</Header>
			<Content
				style={{
					overflow: 'auto',
					display: 'flex',
				}}
			>
				<Editor />
			</Content>
		</Layout>
	)
}

export default NoteEditor
