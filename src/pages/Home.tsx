import { useState } from 'react'
import { Layout, Menu } from 'antd'
import { Route, Routes, RouteProps } from 'react-router-dom'
import useSider, { SiderRouterConfigsType } from '../hooks/useSider'
import Logo from '../components/Logo'
import siderRouterConfigs from '../configs/siderRouterConfigs'

const { Sider, Content } = Layout

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

	return (
		<Layout
			style={{
				height: '100%',
			}}
		>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Logo direction='column' />
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
						display: 'flex',
						flexDirection: 'column',
						minHeight: 280,
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
