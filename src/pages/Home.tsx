import { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { Route, Routes, RouteProps } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import useSider, { SiderRouterConfigsType } from '../hooks/useSider'
import Note from '../components/Note'

const { Sider, Content } = Layout

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

const routerConfigs = siderRouterConfigs.map(
	({ route: { path, element } }) =>
		({
			path,
			element,
		} as RouteProps)
)

const siderItems = siderRouterConfigs.map(({ key, icon, label }) => ({
	key,
	icon,
	label,
}))

export default function Home() {
	const [collapsed, setCollapsed] = useState(false)
	const setCurrentKey = useSider(
		siderRouterConfigs as SiderRouterConfigsType[]
	)
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<Layout
			style={{
				height: '100%',
			}}
		>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={siderItems}
					onSelect={(config) => setCurrentKey(config.key)}
				/>
			</Sider>
			<Layout className='site-layout'>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						overflow: 'auto',
					}}
				>
					<Routes>
						{routerConfigs.map((routerConfig, index) => (
							<Route key={index} {...routerConfig} />
						))}
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}
