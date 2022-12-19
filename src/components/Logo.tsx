import { HighlightFilled } from '@ant-design/icons'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { COLOR_MAIN } from '../lib/antd.color'

interface LogoProps {
	direction: 'column' | 'row'
}

const LogoContainer = styled.div`
	font-weight: bold;
	color: #fff;
	display: inline-block;
	text-align: center;
`
const LogoBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
`
const Logo: React.FC<LogoProps> = ({ direction }) => {
	const navigate = useNavigate()
	const isRow = useMemo(() => {
		return direction === 'row'
	}, [direction])

	return (
		<LogoContainer
			style={{
				width: isRow ? 'auto' : '100%',
				height: isRow ? '100%' : '64px',
				cursor: 'pointer',
			}}
		>
			<LogoBlock onClick={() => navigate('/')}>
				<HighlightFilled
					style={{
						color: `${COLOR_MAIN}`,
						fontSize: 18,
						marginRight: 4,
					}}
				/>
				Circle Note
			</LogoBlock>
		</LogoContainer>
	)
}
export default Logo
