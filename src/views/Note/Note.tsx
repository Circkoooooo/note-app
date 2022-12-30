import { v4 } from 'uuid'
import { Button, Empty, Input, Modal, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React, { useContext, useEffect, useState } from 'react'
import IDBStoreContext, { DATABASE_NAME, IDBStoreDatabaseType, STORE_NAME } from '../../context/IDBStoreContext'
import MenuGroup from '../../components/MenuGroup/MenuGroup'
import NoteList from '../../components/NoteList/NoteList'
import { getIdbDatabase, IDBGetAll } from '../../lib/idb'
import { NoteType } from '../../types/Note'
import { useNoteRouter } from '../../hooks/useNoteRouter'

const { Search } = Input

const Note = () => {
	const [notes, setNotes] = useState<NoteType[]>([])
	const [calcNotes, setCalcNotes] = useState<NoteType[]>(() => notes)
	const [db, setDb] = useState<IDBStoreDatabaseType>()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [newNoteTitle, setNewNoteTitle] = useState('')
	const [searchInputValue, setSearchInputValue] = useState('')
	const [isSearch, setIsSearch] = useState(false)

	const { routerToEdit, routerToPreview } = useNoteRouter()

	const noteDb = useContext(IDBStoreContext)

	useEffect(() => {
		;(async () => {
			if (!noteDb) {
				setDb(await getIdbDatabase(DATABASE_NAME, STORE_NAME, 1))
			} else {
				setDb(noteDb)
			}
		})()
	}, [])

	useEffect(() => {
		if (db) {
			IDBGetAll({
				db,
				storeName: STORE_NAME,
			}).then((res) => {
				setNotes(res)
			})
		}
	}, [db])

	// isSearch change
	useEffect(() => {
		if (!searchInputValue) {
			setCalcNotes(notes)
			isSearch && setIsSearch(false)
		} else {
			// change search status
			!isSearch && setIsSearch(true)
			// search
			const newNotes = notes.filter((item) => {
				if (item.tags?.some((tag) => tag.includes(searchInputValue))) return true
				if (item.title.includes(searchInputValue)) return true
				return false
			})
			setCalcNotes(newNotes)
		}
	}, [searchInputValue])

	const newNote = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		if (newNoteTitle.length === 0) {
			return
		}
		routerToEdit({
			id: v4(),
			title: newNoteTitle,
		} as NoteType)
		setIsModalOpen(false)
		setNewNoteTitle('')
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const searchNoteByTitleOrTags = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target
		setSearchInputValue(value)
	}

	return (
		<>
			<MenuGroup split={[1]} isShadow={false}>
				<Button icon={<PlusOutlined />} onClick={newNote} type='primary'>
					新建笔记
				</Button>
			</MenuGroup>
			<MenuGroup split={[1]} isShadow>
				<Search
					style={{
						maxWidth: 200,
					}}
					placeholder='input search text'
					onChange={(event) => searchNoteByTitleOrTags(event)}
					enterButton
				/>
				{isSearch && (
					<Tag>
						结果：{calcNotes.length}/总数：{notes.length}
					</Tag>
				)}
			</MenuGroup>
			{calcNotes.length === 0 ? (
				<Empty
					description='暂无笔记'
					style={{
						flex: 1,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				/>
			) : (
				<NoteList notes={calcNotes} onSelectNote={(note) => routerToPreview(note)} />
			)}
			<Modal
				title='新笔记标题'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText='确认'
				cancelText='取消'
			>
				<Input
					value={newNoteTitle}
					showCount
					allowClear
					maxLength={30}
					status={newNoteTitle.length === 0 ? 'error' : ''}
					onChange={(event) => {
						setNewNoteTitle(event.currentTarget.value)
					}}
				/>
			</Modal>
		</>
	)
}

export default Note
