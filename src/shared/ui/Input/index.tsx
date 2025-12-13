import classNames from 'classnames'
import styles from './Input.module.css'
import type { FC, InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export const Input: FC<IProps> = ({
	className,
	label,
	...props
}) => {
	return (
		<div>
			<label>
			<p className={styles.label}>{label}</p>
			<input className={classNames(styles.input, className)} {...props} />
			</label>
		</div>
	)
}
