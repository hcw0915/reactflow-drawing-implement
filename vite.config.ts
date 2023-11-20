import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': '/src'
			// 添加其他別名...
		}
	},
	plugins: [
		react({
			babel: {
				plugins: [
					'babel-plugin-macros',
					[
						'@emotion/babel-plugin-jsx-pragmatic',
						{
							export: 'jsx',
							import: '__cssprop',
							module: '@emotion/react'
						}
					],
					[
						'@babel/plugin-transform-react-jsx',
						{ pragma: '__cssprop' },
						'twin.macro'
					]
				]
			}
		})
	]
})
