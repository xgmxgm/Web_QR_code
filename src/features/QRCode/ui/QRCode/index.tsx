import { FC } from 'react'
import styles from './QRCode.module.css'
import { QRCodeCanvas } from 'qrcode.react'

interface IProps {
	link: string,
	size: number
}

export const QRCode: FC<IProps> = ({link, size}) => {
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
			<div className={styles.qrcode_block}>
				<QRCodeCanvas value={link} size={size} />
			</div>
		)
	} else {
		return <></>
	}

}
