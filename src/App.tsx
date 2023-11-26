import React, { DragEvent, MouseEvent, useCallback, useState } from 'react'
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
	ConnectionMode,
	NodeTypes,
	OnInit
} from 'reactflow'

import tw from 'twin.macro'
import styled from 'styled-components'
import 'reactflow/dist/style.css'
import { SideBar } from '@/components/Sidebar'
import { MainRoad } from '@/components/CustomNodes/MainRoad'
import { SubRoad_Small } from '@/components/CustomNodes/SubRoad_Small'
import { SubRoad_Medium } from '@/components/CustomNodes/SubRoad_Medium'
import { SubRoad_Large } from '@/components/CustomNodes/SubRoad_Large'
import { useTranslation } from 'react-i18next'
import {
	edges,
	nodes,
	handleConnect,
	handleEdgesChange,
	handleNodeClick,
	handleNodeDoubleClick,
	handleNodeDrag,
	handleNodeDrop,
	handleNodesChange,
	handleEdgeClick
} from './store'

const nodeTypes: Record<string, React.ComponentType<NodeProps>> = {
	MainRoad: MainRoad,
	SubRoad_Small: SubRoad_Small,
	SubRoad_Medium: SubRoad_Medium,
	SubRoad_Large: SubRoad_Large
}

const ReactFlowContainer = styled.div`
	${tw`w-screen h-screen`}
`

export default function App() {
	const { t } = useTranslation()
	const [reactFlowInstance, setReactFlowInstance] = useState(null)

	const tNodes = nodes.map((item) => {
		return { ...item, data: { ...item.data, label: t(item.data.label) } }
	})

	return (
		<ReactFlowProvider>
			<h1>{t('welcome')}</h1>
			<ReactFlowContainer>
				<SideBar />
				<ReactFlow
					nodes={tNodes}
					edges={edges}
					onConnect={handleConnect}
					onNodesChange={handleNodesChange}
					onNodeClick={handleNodeClick}
					onNodeDrag={handleNodeDrag}
					onEdgesChange={handleEdgesChange}
					// onEdgeClick={handleEdgeClick}
					// onNodeMouseEnter={onNodeMouseEnter}
					onDrop={(e) => handleNodeDrop(e, reactFlowInstance)}
					snapToGrid={true}
					snapGrid={[10, 10]}
					preventScrolling={false}
					onlyRenderVisibleElements // 最佳化 僅渲染可見節點
					onInit={setReactFlowInstance as any} //! ANY 唉
					// onDragOver={onDragOver}
					onNodeDoubleClick={handleNodeDoubleClick}
					nodeTypes={nodeTypes}
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
