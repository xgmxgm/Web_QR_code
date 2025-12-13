import { FC } from 'react'
import styles from './QRCode.module.css'
import { QRCodeCanvas } from 'qrcode.react'

interface IProps {
	link: string
	size: number
}

export const QRCode: FC<IProps> = ({ link, size }) => {
	function isValidUrl(value: string) {
		try {
			new URL(value)
			return true
		} catch {
			return false
		}
	}

	if (isValidUrl(link)) {
		return (
			<div className='w-64 h-64 flex justify-center items-center'>
				<div className={styles.qrcode_block} style={{ scale: size / 100 }}>
					<QRCodeCanvas value={link} size={100} />
				</div>
			</div>
		)
	} else {
		return <></>
	}
}
