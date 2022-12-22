import { Empty } from 'antd'
import { RouteProps } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import Note from '../views/Note/Note'

const EmptyPage = () => {
	return (
		<Empty
			description='暂无内容'
			style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		/>
	)
}
const siderRouterConfigs: {
	[key: string]: any
	route: RouteProps
}[] = [
	{
		key: '1',
		icon: <UserOutlined />,
		label: '笔记',
		route: {
			path: '',
			element: <Note />,
			index: true,
		},
	},
	{
		key: '2',
		icon: <UserOutlined />,
		label: '测试',
		route: {
			path: 'test',
			element: <EmptyPage />,
		},
	},
	{
		key: '3',
		icon: <UserOutlined />,
		label: '帮助',
		route: {
			path: 'help',
			element: <EmptyPage />,
		},
	},
	{
		key: '5',
		icon: <UserOutlined />,
		label: '设置',
		route: {
			path: 'setting',
			element: <EmptyPage />,
		},
	},
]

export default siderRouterConfigs
