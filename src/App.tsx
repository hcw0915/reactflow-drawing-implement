import { useState } from 'react'
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	BackgroundVariant,
	ReactFlowProvider,
	ConnectionMode
} from 'reactflow'

import tw from 'twin.macro'
import styled from 'styled-components'
import 'reactflow/dist/style.css'
import { SideBar } from '@/components/Sidebar'
import useFlowStore from '@/stores/flowStore'
import { useTranslation } from 'react-i18next'
import { nodeTypes } from './components/CustomNodes'
import { BasicModal } from './components/Modal/BasicModal'
import { SidePage } from './components/SidePage'

const ReactFlowContainer = styled.div`
	${tw`w-[89%] h-[100vh] flex relative ml-auto bg-[#e9e9e9]`}
`

const EMPTY_FN = () => {}

export default function App() {
	const { t } = useTranslation()

	const nodes = useFlowStore((state) => state.nodes)
	const edges = useFlowStore((state) => state.edges)
	const handleConnect = useFlowStore((state) => state.handleConnect)
	const handleNodesChange = useFlowStore((state) => state.handleNodesChange)
	const handleEdgesChange = useFlowStore((state) => state.handleEdgesChange)
	const handleNodeDrag = useFlowStore((state) => state.handleNodeDrag)
	const handleNodeDrop = useFlowStore((state) => state.handleNodeDrop)
	const handleNodeClick = useFlowStore((state) => state.handleNodeClick)
	const handleNodeDoubleClick = useFlowStore(
		(state) => state.handleNodeDoubleClick
	)
	const [reactFlowInstance, setReactFlowInstance] = useState(null)
	const [isEditable, setIsEditable] = useState(false)

	const [isModalOpen, setModalOpen] = useState(false)
	const [category, setCategory] = useState('')

	const openModal = () => setModalOpen(true)
	const closeModal = () => setModalOpen(false)

	const TNodes = nodes.map((item) => {
		return {
			...item,
			data: { ...item.data, label: t(item.data.label), name: item.data.label }
		}
	})

	const handleEditMode = () => {
		setIsEditable((prev) => !prev)
	}

	const handleViewClick = (e, ele) => {
		setModalOpen(true)
		console.log('ele', ele.data.label)
		setCategory(ele.data.label)
	}
	console.log(
		nodes.map((node, i) => {
			return { title: node.data.label }
		})
	)

	return (
		<ReactFlowProvider>
			<BasicModal isOpen={isModalOpen} onClose={closeModal}>
				<SidePage category={category} setCategory={setCategory} />
			</BasicModal>

			<h1>{isEditable ? '編輯模式' : '檢視模式'}</h1>
			<button onClick={handleEditMode} tw="p-4 bg-blue-500 text-white rounded">
				toggle
			</button>

			<SideBar />
			<ReactFlowContainer>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onConnect={handleConnect}
					onNodesChange={isEditable ? handleNodesChange : EMPTY_FN}
					onNodeClick={isEditable ? handleNodeClick : handleViewClick}
					onNodeDrag={handleNodeDrag}
					onNodeDoubleClick={handleNodeDoubleClick}
					onEdgesChange={handleEdgesChange}
					snapToGrid={true}
					snapGrid={[10, 10]}
					preventScrolling={false}
					onlyRenderVisibleElements // 最佳化 僅渲染可見節點
					fitView
					connectionMode={ConnectionMode.Loose}
					onDrop={(e) => handleNodeDrop(e, reactFlowInstance)}
					onInit={setReactFlowInstance as any}
					nodeTypes={nodeTypes}
					// selectionMode={'full'}
					// selectionOnDrag={true}
				>
					<Controls />
					<MiniMap />
					{isEditable && (
						<Background
							variant={'lines' as BackgroundVariant}
							gap={10}
							size={1.3}
							color="#bbbbbb"
						/>
					)}
				</ReactFlow>
			</ReactFlowContainer>
		</ReactFlowProvider>
	)
}
