import jsPDF from 'jspdf'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Input } from '@/shared/ui/Input'
import { Range } from '@/shared/ui/Range'
import { QRCode } from '@/features/QRCode'
import { Button } from '@/shared/ui/Button'

export default function Home() {
	const [link, setLink] = useState<string>('')
	const [QRSize, setQRSize] = useState<number>(200)

	function isValidUrl(value: string) {
		try {
			new URL(value)
			return true
		} catch {
			return false
		}
	}

	const downloadQRPNG = () => {
		const canvas = document.querySelector('canvas')
		if (!canvas) return

		const url = canvas.toDataURL('image/png')
		const a = document.createElement('a')
		a.href = url
		a.download = 'qr-code.png'
		a.click()
	}

	const downloadQRPDF = () => {
		const canvas = document.querySelector('canvas')
		if (!canvas) return

		const dataUrl = canvas.toDataURL('image/png')

		const pdf = new jsPDF({
			orientation: 'portrait',
			unit: 'pt',
			format: 'a4',
		})

		const pageWidth = pdf.internal.pageSize.getWidth()
		const x = (pageWidth - QRSize) / 2
		const y = 200

		pdf.addImage(dataUrl, 'PNG', x, y, QRSize, QRSize)
		pdf.save('qr-code.pdf')
	}

	const variants = {
		hidden_top: { opacity: 0, scale: 0, translateY: -100 },
		hidden_left: { opacity: 0, scale: 0, translateX: -100 },
		hidden_right: { opacity: 0, scale: 0, translateX: 100 },
		visible: (custom: number) => ({
			opacity: 1,
			scale: 1,
			translateY: 0,
			translateX: 0,
			transition: { delay: custom * 0.5 },
		}),
	}

	return (
		<div className='w-full flex flex-col items-center pt-10'>
			<motion.h2
				variants={variants}
				animate={'visible'}
				initial={'hidden_top'}
				className='text-3xl sm:text-4xl lg:text-5xl font-semibold mb-3'
			>
				Enter link for get QR code.
			</motion.h2>
			<motion.div
				variants={variants}
				animate={'visible'}
				initial={'hidden_top'}
				className='md:w-4/12 mb-10'
				custom={1}
			>
				<Input
					type='text'
					value={link}
					onChange={e => setLink(e.target.value)}
					placeholder='Enter link for QR code...'
					className='text-2xl w-full'
				/>
			</motion.div>
			<AnimatePresence>
				{isValidUrl(link) && (
					<div className='flex flex-col gap-5 lg:flex-row lg:gap-44'>
						<motion.div
							variants={variants}
							animate={'visible'}
							initial={'hidden_left'}
							exit={'hidden_left'}
							className='flex flex-col gap-4 items-center'
						>
							<Range
								label={`QR code size: ${QRSize}`}
								min='50'
								max='200'
								onChange={e => setQRSize(+e.target.value)}
								value={QRSize}
								className='w-52'
							/>
						</motion.div>
						<motion.div
							variants={variants}
							animate={'visible'}
							initial={'hidden_right'}
							exit={'hidden_right'}
							className='flex flex-col items-center gap-5'
						>
							<QRCode link={link} size={QRSize} />
							<div className='flex gap-2'>
								<Button onClick={downloadQRPNG}>Download QR png</Button>
								<Button onClick={downloadQRPDF}>Download QR pdf</Button>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}
