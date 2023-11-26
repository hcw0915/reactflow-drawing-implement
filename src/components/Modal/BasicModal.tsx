// Modal.tsx
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

const ModalWrapper = styled.div`
	${tw`fixed inset-0 flex items-center justify-center`}
	z-index: 1000; /* 控制 Modal 的堆疊順序 */
`

const Overlay = styled.div<{ isOpen: boolean }>`
	${tw`fixed inset-0 bg-black opacity-50`}
	z-index: 999; /* 控制 Overlay 的堆疊順序 */
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const ModalContent = styled.div`
	${tw`bg-white p-6 rounded shadow-lg`}
`
export const BasicModal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children
}) => {
	if (!isOpen) return null

	return (
		<>
			<Overlay isOpen={isOpen} onClick={onClose} />
			<ModalWrapper>
				<ModalContent>
					{children}
					<button
						onClick={onClose}
						tw="mt-4 p-2 bg-blue-500 text-white rounded"
					>
						Close
					</button>
				</ModalContent>
			</ModalWrapper>
		</>
	)
}
