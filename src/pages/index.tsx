import { useRef, useState } from 'react'
import { Input } from '@/shared/ui/Input'
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'

export default function Home() {
	const [link, setLink] = useState<string>(
		'https://portfolio-sigma-two-81.vercel.app/'
	)
	const qrRef = useRef<HTMLDivElement>(null)

	const downloadQR = () => {
		console.log('click')
		const canvas = qrRef.current?.querySelector('canvas')

		console.log('canvas: ', canvas);

		if (!canvas) return

		const url = canvas.toDataURL('image/png') // создаём base64

		console.log("url: ", url)

		const a = document.createElement('a')
		a.href = url
		a.download = 'qr-code.png' // имя файла
		a.click()
	}

	function isValidUrl(value: string) {
		try {
			new URL(value)
			return true
		} catch {
			return false
		}
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
			{isValidUrl(link) && (
				<QRCodeCanvas className='my-10' value={link} size={200} />
			)}
			<button
				onClick={downloadQR}
				className='bg-blue-600 text-white px-4 py-2 rounded'
			>
				Скачать QR
			</button>
		</div>
	)
}
