import { Layout } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Logo from '../components/Logo'
import Editor from '../components/Editor/Editor'

const NotePreview = () => {
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
					padding: 20,
					height: '100%',
				}}
			>
				<Editor
					isPreview
					style={{
						flex: '1',
					}}
				/>
			</Content>
		</Layout>
	)
}

export default NotePreview
