import { Canvas } from '../SketchCanvas/ui'

import cls from './App.module.scss'

export const App = () => {
	return (
		<div className={cls.app}>
			<Canvas />
		</div>
	)
}
