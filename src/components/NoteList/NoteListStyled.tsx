import styled from 'styled-components'

export const NoteContainer = styled.div`
	display: inline-block;
	width: 200px;
	height: 140px;
	margin: 10px;
	padding: 14px;
	border-radius: 4px;
	background-color: rgba(0, 0, 0, 0.06);
	cursor: pointer;
	user-select: none;
	vertical-align: top;
	transition: all ease-in-out 0.08s;
	border: 2px solid transparent;
	&:hover {
		border: 2px solid blue;
		background-color: rgba(0, 0, 0, 0.04);
	}
`

export const NoteTitle = styled.div`
	width: 100%;
	font-weight: bold;
`
export const NoteTagContainer = styled.div`
	max-height: 80px;
	margin-top: 4px;
	overflow: auto;
`
export const NoteTag = styled.span`
	display: inline-block;
	color: #fff;
	padding: 2px 4px;
	margin: 2px 2px 2px 0;
	border-radius: 4px;
	box-sizing: content-box;
	background-color: #1677ff;
`
