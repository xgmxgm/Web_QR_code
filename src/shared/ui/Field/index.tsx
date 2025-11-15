import type { FC } from 'react'
import styles from './Field.module.css'

interface IProps {
	label: string
}

export const Field: FC<IProps> = ({ label }) => {
	return (
		<div className={styles.field}>
			<label>
				<p className={styles.field_text}>{label}</p>
				<input className={styles.filed_input} type='text' />
			</label>
		</div>
	)
}
