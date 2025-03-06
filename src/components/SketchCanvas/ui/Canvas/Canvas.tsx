import { ChangeEvent, useRef, useState } from 'react'
import { ReactSketchCanvas, ReactSketchCanvasRef } from 'react-sketch-canvas'

import { classNames } from '../model/utils'

import cls from './Canvas.module.scss'

interface CanvasProps {
	className?: string
}

export const Canvas = (props: CanvasProps) => {
	const { className } = props
	const colorInputRef = useRef<HTMLInputElement>(null)
	const canvasRef = useRef<ReactSketchCanvasRef>(null)
	const [strokeColor, setStrokeColor] = useState('#a855f7')
	const [eraseMode, setEraseMode] = useState(false)

	const handleStrokeColorChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStrokeColor(event.target.value)
	}

	const handlePenClick = () => {
		setEraseMode(false)
		canvasRef.current?.eraseMode(false)
	}

	const handleEraserClick = () => {
		setEraseMode(prev => {
			canvasRef.current?.eraseMode(!prev)

			return !prev
		})
	}

	const handleUndoClick = () => {
		canvasRef.current?.undo()
	}

	const handleRedoClick = () => {
		canvasRef.current?.redo()
	}
	const handleClearClick = () => {
		canvasRef.current?.clearCanvas()
	}

	const handleSaveClick = async () => {
		const dataURL = await canvasRef.current?.exportImage('png')

		if (dataURL) {
			const link = Object.assign(document.createElement('a'), {
				href: dataURL,
				style: { display: 'none' },
				download: 'sketch.png',
			})

			document.body.appendChild(link)
			link.click()
			link.remove()
		}
	}

	return (
		<div className={cls.container}>
			<div className={cls.box}>
				<ReactSketchCanvas
					ref={canvasRef}
					className={cls.canvas}
					width='100%'
					height='100%'
					strokeColor={strokeColor}
					canvasColor='transparent'
				/>
			</div>
			<div className={cls.controls}>
				<button
					type='button'
					className={cls.btn}
					style={{ backgroundColor: strokeColor }}
					onClick={() => colorInputRef.current?.click()}
				>
					<input
						ref={colorInputRef}
						type='color'
						style={{ visibility: 'hidden' }}
						value={strokeColor}
						onChange={handleStrokeColorChange}
					/>
				</button>
				<div className={cls.divider} />

				<button type='button' className={cls.btn} onClick={handlePenClick}>
					&#9998;
				</button>
				<button
					type='button'
					className={classNames(cls.btn, [], { [cls.eraseMode]: eraseMode })}
					onClick={handleEraserClick}
				>
					&#10063;
				</button>
				<div className={cls.divider} />
				<button type='button' className={cls.btn} onClick={handleUndoClick}>
					&#8630;
				</button>
				<button type='button' className={cls.btn} onClick={handleRedoClick}>
					&#8631;
				</button>
				<div className={cls.divider} />
				<button type='button' className={cls.btn} onClick={handleClearClick}>
					&#10226;
				</button>
				<button type='button' className={cls.btn} onClick={handleSaveClick}>
					&#8681;
				</button>
				{/* actions */}
			</div>
		</div>
	)
}
