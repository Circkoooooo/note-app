import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Logo from '../components/Logo'
import Editor from '../components/Editor/Editor'

const NoteEditor = () => {
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
					style={{
						flex: '1',
					}}
				/>
			</Content>
		</Layout>
	)
}

export default NoteEditor
