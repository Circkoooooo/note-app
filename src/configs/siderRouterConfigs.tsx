import { RouteProps } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import Note from '../components/Note'

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
			element: <div>ozmxzckz c</div>,
		},
	},
	{
		key: '3',
		icon: <UserOutlined />,
		label: '帮助',
		route: {
			path: 'help',
			element: <div>t5555</div>,
		},
	},
	{
		key: '5',
		icon: <UserOutlined />,
		label: '设置',
		route: {
			path: 'setting',
			element: <div>123213</div>,
		},
	},
]

export default siderRouterConfigs
