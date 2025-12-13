import classNames from 'classnames'
import styles from './Range.module.css'
import type { FC, InputHTMLAttributes } from 'react'

interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string
}

export const Range: FC<IProps> = ({ label, className, ...props }) => {
	return (
		<label>
			<p className={styles.label}>{label}</p>
			<div className={styles.range}>
				<p>{props.min}</p>
				<input type='range' className={classNames(styles.slider, className)} {...props} />
				<p>{props.max}</p>
			</div>
		</label>
	)
}
