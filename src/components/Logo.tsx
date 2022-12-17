import React, { useMemo } from 'react'
import styled from 'styled-components'

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
	const isRow = useMemo(() => {
		return direction === 'row'
	}, [direction])

	return (
		<LogoContainer
			style={{
				width: isRow ? 'auto' : '100%',
				height: isRow ? '100%' : '64px',
			}}
		>
			<LogoBlock>NOTE APP</LogoBlock>
		</LogoContainer>
	)
}
export default Logo
