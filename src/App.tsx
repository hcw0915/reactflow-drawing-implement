import React, { MouseEvent, useCallback, useState } from 'react'
import ReactFlow, {
	MiniMap,
	Controls,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	Node,
	Edge,
	Connection,
	BackgroundVariant,
	NodeDragHandler,
	ReactFlowProvider,
	NodeMouseHandler,
	MarkerType,
	ConnectionMode
} from 'reactflow'

import tw from 'twin.macro'
import styled from 'styled-components'
import 'reactflow/dist/style.css'
import ExportButton from './components/ExportButton'
import { SideBar } from './components/Sidbar'
import { MainRoad } from './components/CustomNodes/MainRoad'
import { SubRoad_Small } from './components/CustomNodes/SubRoad_Small'
import useFlowStore from './store/flow'
import { SubRoad_Medium } from './components/CustomNodes/SubRoad_Medium'
import { SubRoad_Large } from './components/CustomNodes/SubRoad_Large'
import { useTranslation } from 'react-i18next'

const ReactFlowContainer = styled.div`
	${tw`w-screen h-screen`}
`

// const initialNodes: Node[] = [
// 	{ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
// 	{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
// 	{
// 		id: '3',
// 		position: { x: 0, y: 100 },
// 		data: { label: '3' },
// 		type: 'MainRoad'
// 	}
// ]

// const initialEdges: Edge[] = [
// 	{ id: 'e1-2', source: '1', target: '2' },
// 	{
// 		id: '2->3',
// 		source: '2',
// 		target: '3',
// 		markerEnd: {
// 			type: MarkerType.ArrowClosed,
// 			width: 20,
// 			height: 20,
// 			color: '#0080ff'
// 		},
// 		// label: 'marker size and color',
// 		style: {
// 			strokeWidth: 2,
// 			stroke: '#0080ff'
// 		},
// 		type: 'smoothstep'
// 	}
// ]

const nodeTypes = {
	MainRoad: MainRoad,
	SubRoad_Small: SubRoad_Small,
	SubRoad_Medium: SubRoad_Medium,
	SubRoad_Large: SubRoad_Large
}

export default function App() {
	const { t } = useTranslation()

	// const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
	// const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	const elements = [
		// Nodes with translated labels
		{
			id: '1',
			type: 'default',
			data: { label: t('welcome') },
			position: { x: 100, y: 100 }
		}
	]

	const nodes = useFlowStore((state) => state.nodes)
	const edges = useFlowStore((state) => state.edges)
	const setNodes = useFlowStore((state) => state.setNodes)
	const setEdges = useFlowStore((state) => state.setEdges)
	const handleConnect = useFlowStore((state) => state.handleConnect)
	const handleNodesChange = useFlowStore((state) => state.handleNodesChange)
	const handleEdgesChange = useFlowStore((state) => state.handleEdgesChange)
	const handleNodeClick = useFlowStore((state) => state.handleNodeClick)
	const handleNodeDoubleClick = useFlowStore(
		(state) => state.handleNodeDoubleClick
	)

	const handleNodeDrag = useFlowStore((state) => state.handleNodeDrag)
	const handleNodeDrop = useFlowStore((state) => state.handleNodeDrop)

	const TNodes = nodes.map((item) => {
		return { ...item, data: { ...item.data, label: t(item.data.label) } }
	})
	// console.log(JSON.stringify(nodes.map((item) => item.data.label)))
	// console.log(edges)

	const [reactFlowInstance, setReactFlowInstance] = useState(null)

	const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		// event?.dataTransfer?.dropEffect = 'move'
	}, [])

	const onEdgeClick = (event: MouseEvent, element: Edge) => {
		console.log('onEdgeClick', element)
		// Your logic here
	}

	const onNodeMouseEnter = (event: MouseEvent, element: Node) => {
		console.log('onNodeMouseEnter', element)
	}

	return (
		<ReactFlowProvider>
			<h1>{t('welcome')}</h1>
			<ReactFlowContainer>
				<SideBar />
				<ReactFlow
					nodes={TNodes}
					edges={edges}
					onConnect={handleConnect}
					onNodesChange={handleNodesChange}
					onNodeClick={handleNodeClick}
					onNodeDrag={handleNodeDrag}
					onEdgesChange={handleEdgesChange}
					onEdgeClick={onEdgeClick}
					onNodeMouseEnter={onNodeMouseEnter}
					onDrop={(e) => handleNodeDrop(e, reactFlowInstance)}
					snapToGrid={true}
					snapGrid={[10, 10]}
					preventScrolling={false}
					onlyRenderVisibleElements // 最佳化 僅渲染可見節點
					onInit={setReactFlowInstance}
					onDragOver={onDragOver}
					onNodeDoubleClick={handleNodeDoubleClick}
					nodeTypes={nodeTypes as NodeTypes}
					fitView
					connectionMode={ConnectionMode.Loose}
					// selectionMode={'full'}
					// selectionOnDrag={true}
				>
					<Controls />
					<MiniMap />
					<Background
						variant={'dots' as BackgroundVariant}
						gap={10}
						size={1.3}
					/>
				</ReactFlow>
			</ReactFlowContainer>
		</ReactFlowProvider>
	)
}
