import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type SiderRouterConfigsType = {
	key: string
	route: {
		path: string
	}
}

export default (configs: SiderRouterConfigsType[]) => {
	const [currentKey, setCurrentKey] = useState(configs[0].key)

	const navigate = useNavigate()
	useEffect(() => {
		const config = configs.find((item) => item.key === currentKey)
		const path =
			config && config.route.path !== null ? config.route.path : '/'
		navigate(path)
	}, [currentKey])

	return setCurrentKey
}
