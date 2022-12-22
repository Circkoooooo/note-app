import styled from 'styled-components'

export const MenuGroupContainer = styled.div<{
	isSpaceBetween?: boolean
}>`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 8px 14px;
	border-bottom: 2px solid rgba(0, 0, 0, 0.05);
	box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
	justify-content: ${(props) => {
		return props.isSpaceBetween ? 'space-between' : ''
	}};
	overflow-x: overlay;
`

/**
 * controll the margin
 */
export const ElementSpace = styled.div<{
	elementSpace: number
}>`
	& > * {
		margin: ${(props) => props.elementSpace}px;
	}
`

/**
 * controll the split
 */
export const ElementSplit = styled.div`
	display: flex;
`
