// store.ts

import {
	Connection,
	DefaultEdgeOptions,
	EdgeChange,
	MarkerType,
	NodeChange,
	NodeDragHandler,
	NodeMouseHandler,
	OnConnect,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges
} from 'reactflow'
import { create } from 'zustand'

const defaultNodes = [
	{
		id: 'MainRoad_1',
		type: 'default',
		position: { x: 0, y: 0 },
		data: { label: 'welcome', description: 'aaa' }
	},
	{
		id: 'MainRoad_2',
		type: 'default',
		position: { x: 30, y: 30 },
		data: { label: '2', description: 'aaa' }
	}
]

const defaultEdges = [{ id: 'e1-2', source: '1', target: '2' }]

type Node = {
	id: string
	type: string
	position: { x: number; y: number }
	data: { label: string; description: string }
}

type Edge = {
	id: string
	source: string
	target: string
}
type OnChange<ChangesType> = (changes: ChangesType[]) => void

type ConnectOption = Partial<Connection> & Partial<DefaultEdgeOptions>

type StoreState = {
	nodes: Node[]
	edges: Edge[]

	setNodes: (newNodes: Node[]) => void
	setEdges: (newEdges: Edge[]) => void
	handleNodesChange: OnChange<NodeChange>
	handleEdgesChange: OnChange<EdgeChange>

	handleConnect: OnConnect
	// Click
	handleNodeClick: NodeMouseHandler
	handleNodeDoubleClick: NodeMouseHandler
	handleEdgeClick: NodeMouseHandler
	// Drag & Drop
	handleNodeDrag: NodeDragHandler
	handleNodeDrop: (event: React.DragEvent, instance: any) => void
	// Mouse
	handleNodeMouseEnter: NodeMouseHandler

	// fetchData
	fetchData: () => Promise<void>
}

const useFlowStore = create<StoreState>()((set, get) => ({
	nodes: defaultNodes,
	edges: defaultEdges,
	setNodes: (newNodes: Node[]) => set({ nodes: newNodes }),
	setEdges: (newEdges: Edge[]) => set({ edges: newEdges }),
	handleNodesChange: (changes) =>
		set({ nodes: applyNodeChanges(changes, get().nodes) as Node[] }),
	handleEdgesChange: (changes) =>
		set({ edges: applyEdgeChanges(changes, get().edges) as Edge[] }),

	handleConnect: (params: ConnectOption) => {
		set((state) => {
			const { source, target } = params
			if (
				source?.split('_').includes('MainRoad') &&
				target?.split('_').includes('MainRoad')
			) {
				console.log('這是兩個maintype')
				params = {
					...params,
					markerEnd: {
						type: MarkerType.ArrowClosed,
						width: 10,
						height: 10,
						color: '#0080ff'
					},
					// label: 'marker size and color',
					style: {
						strokeWidth: 2,
						stroke: '#0080ff'
					},
					type: 'smoothstep'
				}
			} else {
				params = {
					...params,
					style: {
						strokeWidth: 2,
						stroke: '#0080ff'
					},
					animated: true
				}
			}
			const updatedEdges = addEdge(params as Edge, state.edges)
			console.log(updatedEdges)

			return { edges: updatedEdges }
			// return setEdges((eds) => addEdge(params, eds))
		})
	},

	handleNodeClick: (event, element) => {
		set((state) => state)
		console.log(element.data.url)
	},

	handleNodeDoubleClick: (event, element) => {
		set((state) => {
			const label = prompt('Enter new description:') as string
			// 如果你要修改 nodes 中的元素，可以這樣做：
			const newNodes = state.nodes.map((node) => {
				if (node.id === element.id && label) {
					return {
						...node,
						data: { ...node.data, label }
					}
				}
				return node
			})

			return { nodes: newNodes }
		})
	},

	handleEdgeClick: (event, element) => {
		console.log(element)
	},
	handleNodeDrag: (event, element) => {
		console.log(element)
	},

	handleNodeDrop: (event, instance) => {
		set((state) => {
			event.preventDefault()
			const type = event?.dataTransfer?.getData('application/reactflow')
			if (typeof type === 'undefined' || !type) return
			const position = instance?.screenToFlowPosition?.({
				x: event.clientX - 125,
				y: event.clientY - 30
			})

			const idNumber = Number(get().nodes.at(-1)?.id.split('_')[1]) as number

			const newNode = {
				id:
					type === 'MainRoad'
						? `MainRoad_${idNumber + 1}`
						: `SubRoad_${idNumber + 1}`,
				type,
				position,
				data: { label: `${type} node` }
			}

			return { nodes: [...state.nodes, newNode] }
		})
	},

	handleNodeMouseEnter: (event, element) => {
		console.log('onNodeMouseEnter', element)
	},

	fetchData: async () => {
		try {
			// 在這裡進行 API 請求，例如使用 fetch 或 axios
			const response = await fetch('../../exported_data.json')
			const result = await response.json()

			// 將從 API 獲取的資料設置為狀態的預設值
			console.log(result)

			set({ nodes: result.nodes, edges: result.edges })
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}
}))

export default useFlowStore
