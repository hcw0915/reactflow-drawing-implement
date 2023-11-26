import aa from '../assets/react.svg'
import styled from 'styled-components'
import tw from 'twin.macro'
import ExportButton from './ExportButton'
import useFlowStore from '@/stores/flowStore'
import { Button } from './Button'

type SideBarProps = {
	isEditable: boolean
	setIsEditable: (isEditable: boolean) => void
}

const NavbarContainer = styled.nav`
	${tw`bg-gray-400 fixed gap-[0.5rem] flex-col left-20 top-10 py-4 text-center z-50 rounded-2xl w-[10rem]`}
	width: 10rem; /* 設定寬度，可以根據實際需求調整 */
	height: 90vh; /* 保持全屏高度，可以根據實際需求調整 */
	transform: translateX(-50%);
`

const NavBarButton = styled.div`
	${tw`text-[white] text-[0.875rem] p-[10px] inline-block`}
`

export const SideBar = ({ isEditable, setIsEditable }: SideBarProps) => {
	const fetchData = useFlowStore((state) => state.fetchData)

	const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
		event?.dataTransfer?.setData('application/reactflow', nodeType)
		// event.dataTransfer?.effectAllowed = 'move'
	}

	const handleEditMode = () => {
		setIsEditable(!isEditable)
	}

	const NodesMap = [
		{ id: 0, name: 'MainRoad', img: aa },
		{ id: 1, name: 'SubRoad_Small', img: null },
		{ id: 2, name: 'SubRoad_Medium', img: null },
		{ id: 3, name: 'SubRoad_Large', img: null }
	]

	return (
		<NavbarContainer>
			<h3>{isEditable ? '編輯模式' : '檢視模式'}</h3>
			<Button onClick={handleEditMode}>toggle</Button>
			<hr />

			{NodesMap.map((node) => {
				return (
					<NavBarButton
						key={node.id}
						onDragStart={(event) => onDragStart(event, node.name)}
						draggable
					>
						{/* <img src={node.img} alt="" width={50} height={50} /> */}
						{node.name}
					</NavBarButton>
				)
			})}

			{/* <NavBarButton
				onDragStart={(event) => onDragStart(event, 'MainRoad')}
				draggable
			>
				MainRoad Node
			</NavBarButton>
			<NavBarButton
				onDragStart={(event) => onDragStart(event, 'SubRoad_Small')}
				draggable
			>
				SubRoad_Small
			</NavBarButton>
			<NavBarButton
				onDragStart={(event) => onDragStart(event, 'SubRoad_Medium')}
				draggable
			>
				SubRoad_Medium
			</NavBarButton>
			<NavBarButton
				onDragStart={(event) => onDragStart(event, 'SubRoad_Large')}
				draggable
			>
				SubRoad_Large
			</NavBarButton> */}
			<ExportButton />
			<Button onClick={fetchData}>fetch</Button>
		</NavbarContainer>
	)
}
