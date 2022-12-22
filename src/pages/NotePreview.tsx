import { Button, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Logo from '../components/Logo'
import Editor from '../components/Editor/Editor'
import MenuGroup from '../components/MenuGroup/MenuGroup'
import { useNoteRouter } from '../hooks/useNoteRouter'

const { Title } = Typography
const NotePreview = () => {
	const { location, routerToEdit } = useNoteRouter()

	return (
		<Layout
			className='layout'
			style={{
				height: '100%',
			}}
		>
			<Header>
				<Logo direction='row' />
			</Header>
			<Content
				style={{
					padding: 20,
					height: '100%',
				}}
			>
				<MenuGroup split={[1, 1]} style={{ marginBottom: 10 }}>
					<Title level={4}> 预览</Title>
					<Button onClick={() => routerToEdit(location.state)}>
						编辑
					</Button>
				</MenuGroup>
				<Editor isPreview />
			</Content>
		</Layout>
	)
}

export default NotePreview
