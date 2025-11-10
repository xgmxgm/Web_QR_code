import { useState } from 'react'
import { Input } from '@/shared/ui/Input'
import { QRCodeCanvas } from 'qrcode.react'
import { ThemeSwitcher } from '@/features/Theme'

export default function Home() {
	const [link, setLink] = useState<string>('https://www.youtube.com/')

	function isValidUrl(value: string) {
		try {
			new URL(value);
			return true;
		} catch {
			return false;
		}
	}

	return (
		<div className='w-full flex flex-col items-center pt-20'>
			<ThemeSwitcher />
			<Input
				type='text'
				value={link}
				onChange={e => setLink(e.target.value)}
				placeholder='Enter link to QR code'
			/>
			<p>{link}</p>
			{ isValidUrl(link) && <QRCodeCanvas className='my-10' value={link} size={200} /> }
		</div>
	)
}
