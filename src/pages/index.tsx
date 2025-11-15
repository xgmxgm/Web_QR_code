import jsPDF from 'jspdf'
import { useState } from 'react'
import { Input } from '@/shared/ui/Input'
import { Range } from '@/shared/ui/Range'
import { QRCode } from '@/features/QRCode'
import { Button } from '@/shared/ui/Button'
import { Field } from '@/shared/ui/Field'

export default function Home() {
	const [link, setLink] = useState<string>(
		'https://portfolio-sigma-two-81.vercel.app/'
	)
	const [QRSize, setQRSize] = useState<number>(200)

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

	return (
		<div className='w-full flex flex-col items-center pt-20'>
			<h2 className='text-5xl font-semibold mb-3'>
				Enter link for get QR code.
			</h2>
			<div className='w-4/12'>
				<Input
					type='text'
					value={link}
					onChange={e => setLink(e.target.value)}
					placeholder='Enter link to QR code'
					className='text-2xl w-full'
				/>
			</div>
			<Field label='Test label:' />
			<Range
				label={`QR code size: ${QRSize}`}
				min='50'
				max='400'
				onChange={e => setQRSize(+e.target.value)}
				value={QRSize}
				className='w-96'
			/>
			<QRCode link={link} size={QRSize} />
			<Button onClick={downloadQRPNG}>Скачать QR png</Button>
			<Button onClick={downloadQRPDF}>Скачать QR pdf</Button>
		</div>
	)
}
