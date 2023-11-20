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
	${tw`bg-gray-800 fixed top-0 w-full py-4 text-center z-50`}
`

const NavLink = styled.div`
	${tw`text-[white] px-[20px] py-[15px] inline-block`}
`

export const SideBar = () => {
	const fetchData = useFlowStore((state) => state.fetchData)

	const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
		event?.dataTransfer?.setData('application/reactflow', nodeType)
		// event.dataTransfer?.effectAllowed = 'move'
	}

	return (
		<NavbarContainer>
			<NavLink
				className="dndnode input"
				onDragStart={(event) => onDragStart(event, 'input')}
				draggable
			>
				<img src={aa} alt="" width={100} height={100} />
			</NavLink>
			<NavLink
				className="dndnode"
				onDragStart={(event) => onDragStart(event, 'MainRoad')}
				draggable
			>
				MainRoad Node
			</NavLink>
			<NavLink
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'SubRoad_Small')}
				draggable
			>
				SubRoad_Small
			</NavLink>
			<NavLink
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'SubRoad_Medium')}
				draggable
			>
				SubRoad_Medium
			</NavLink>
			<NavLink
				className="dndnode output"
				onDragStart={(event) => onDragStart(event, 'SubRoad_Large')}
				draggable
			>
				SubRoad_Large
			</NavLink>
			<ExportButton />
			<Button onClickfn={fetchData}>fetch</Button>
		</NavbarContainer>
	)
}
