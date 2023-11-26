import React from 'react'

type SidePageProp = {
	category: string
	setCategory: (category: string) => void
}

//! 資料形態要律定一下
const categoryMapping: any = {
	Internet: {
		subTitle: [
			{ name: 'How does the internet work?', content: 'content1' },
			{ name: 'What is HTTP?', content: 'content2' },
			{ name: 'What is Domain Name?', content: 'content3' },
			{ name: 'DNS and how it works?', content: 'content4' },
			{ name: 'Browser and how they work?', content: 'content5' }
		]
	},
	HTML: {},
	CSS: {},
	JavaScript: {},
	'VCS Hosting': {}
}

export const SidePage = ({ category, setCategory }: SidePageProp) => {
	const categoryData = categoryMapping[category] as any //! any
	console.log('🚀 ~ :', category)
	console.log(categoryData)

	return (
		<>
			{categoryData.subTitle.map((subTitle) => {
				return (
					<React.Fragment key={subTitle.name}>
						<h4>{subTitle.name}</h4>
						<div>{subTitle.content}</div>
					</React.Fragment>
				)
			})}

			<h1 tw="text-2xl mb-4">Modal Content</h1>
			<p tw="text-gray-700">This is the content of your modal.</p>
		</>
	)
}
