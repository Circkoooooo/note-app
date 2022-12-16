import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { Route, Routes, RouteProps, Link } from 'react-router-dom'
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from '@ant-design/icons'
import useSider, { SiderRouterConfigsType } from '../hooks/useSider'

const { Header, Sider, Content } = Layout

const siderRouterConfigs = [
	{
		key: '1',
		icon: <UserOutlined />,
		label: '笔记',
		route: {
			path: '/',
			element: <Link to='/'>123</Link>,
		},
	},
	{
		key: '2',
		icon: <UserOutlined />,
		label: '笔记',
		route: {
			path: '/test',
			element: <Link to='/test'>124124124</Link>,
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
	const [currentKey, setCurrentKey] = useSider(
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
				<Header style={{ padding: 0, background: colorBgContainer }}>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: 'trigger',
							onClick: () => setCollapsed(!collapsed),
						}
					)}
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
					}}
				>
					<Routes>
						{routerConfigs.map((routerConfig, index) => (
							<Route
								key={index}
								path={routerConfig.path}
								element={routerConfig.element}
							/>
						))}
					</Routes>
				</Content>
			</Layout>
		</Layout>
	)
}
