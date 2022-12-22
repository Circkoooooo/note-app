import React, { ReactNode, useEffect, useState } from 'react'
import {
	ElementSpace,
	ElementSplit,
	MenuGroupContainer,
} from './MenuGroupStyled'

interface MenuGroupProps {
	style?: React.CSSProperties
	children?: ReactNode[] | ReactNode
	elementSpace?: number
	split?: number[]
}

const MenuGroup: React.FC<MenuGroupProps> = ({
	style,
	children,
	elementSpace = 8,
	split = [1],
}) => {
	const [isRenderSplit, setIsRenderSplit] = useState(false)
	const [isRenderArray, setIsRenderArray] = useState(false)
	useEffect(() => {
		if (
			children &&
			children instanceof Array &&
			children.length !== split.reduce((pre, val) => pre + val)
		) {
			console.warn(
				`"split" param require a array that sum of all items should be equal to the count of children node. such as "split = [1,1], while the children will be 
				<>
					<Node/>
					<Node/>
				</>".
				If not equal, the "split" will be provide [1]`
			)
		}
	}, [])

	useEffect(() => {
		if (!(children instanceof Array)) {
			setIsRenderArray(false)
			return
		}

		if (
			split.length === 1 ||
			(children instanceof Array && children?.length) !==
				split.reduce((pre, val) => pre + val)
		) {
			setIsRenderArray(true)
		} else {
			setIsRenderArray(true)
			setIsRenderSplit(true)
		}
	})

	const renderSplitChildren = () => {
		if (!isRenderArray) {
			return (
				<MenuGroupContainer style={{ ...style }}>
					{children}
				</MenuGroupContainer>
			)
		}

		if (!isRenderSplit) {
			return (
				<MenuGroupContainer style={{ ...style }}>
					{(children as ReactNode[]).map((child, index) => (
						<ElementSpace key={index} elementSpace={elementSpace}>
							{child}
						</ElementSpace>
					))}
				</MenuGroupContainer>
			)
		}

		const arr = split.map((num, index) => {
			return (children as ReactNode[]).slice(
				index - 1 < 0 ? 0 : split[index - 1],
				(index - 1 < 0 ? 0 : split[index - 1]) + num
			)
		})
		return (
			<MenuGroupContainer isSpaceBetween style={{ ...style }}>
				{arr.map((item, index) => (
					<ElementSplit key={index}>
						<ElementSpace elementSpace={elementSpace}>
							{item}
						</ElementSpace>
					</ElementSplit>
				))}
			</MenuGroupContainer>
		)
	}

	return <>{renderSplitChildren()}</>
}

export default MenuGroup
