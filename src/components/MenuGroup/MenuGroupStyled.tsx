import styled from 'styled-components'

export const MenuGroupContainer = styled.div<{
	isSpaceBetween?: boolean
	isShadow?: boolean
}>`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 8px 14px;
	box-shadow: ${(props) => {
		return props.isShadow ? '0px 4px 10px rgba(0, 0, 0, 0.05)' : ''
	}};
	justify-content: ${(props) => {
		return props.isSpaceBetween ? 'space-between' : ''
	}};
	overflow-x: overlay;
	white-space: nowrap;
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
