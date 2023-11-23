import React, { ReactNode } from 'react'
import aa from '../assets/react.svg'
import { RoadMapNodes } from '@/types'
import styled from 'styled-components'
import tw from 'twin.macro'
import ExportButton from './ExportButton'
import useFlowStore from '@/store/flow'
import { Button } from './Button'

const RoadNodesMapping: RoadMapNodes[] = [
	{
		id: '1',
		label: 'mainRoad',
		type: 'primary',
		image: '',
		bgColor: '',
		component: <div>test</div>
	}
]

const NavbarContainer = styled.nav`
	${tw`bg-gray-500 fixed gap-[0.5rem] flex top-10 w-[80%] justify-center items-center py-4 text-center z-50 rounded-2xl`}
	left: 50%;
	transform: translateX(-50%);
`

const NavBarButton = styled.div`
	${tw`text-[white] text-[0.875rem] px-[20px] py-[15px] inline-block`}
`

export const SideBar = () => {
	const fetchData = useFlowStore((state) => state.fetchData)

	const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
		event?.dataTransfer?.setData('application/reactflow', nodeType)
		// event.dataTransfer?.effectAllowed = 'move'
	}

	return (
		<NavbarContainer>
			<NavBarButton
				className="dndnode input"
				onDragStart={(event) => onDragStart(event, 'input')}
				draggable
			>
				<img src={aa} alt="" width={50} height={50} />
			</NavBarButton>
			<NavBarButton
				className="dndnode"
				onDragStart={(event) => onDragStart(event, 'MainRoad')}
				draggable
			>
				MainRoad Node
			</NavBarButton>
			<NavBarButton
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'SubRoad_Small')}
				draggable
			>
				SubRoad_Small
			</NavBarButton>
			<NavBarButton
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'SubRoad_Medium')}
				draggable
			>
				SubRoad_Medium
			</NavBarButton>
			<NavBarButton
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'SubRoad_Large')}
				draggable
			>
				SubRoad_Large
			</NavBarButton>
			<ExportButton />
			<Button onClickfn={fetchData}>fetch</Button>
		</NavbarContainer>
	)
}
