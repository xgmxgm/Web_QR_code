import classNames from 'classnames'
import styles from './Button.module.css'
import { forwardRef, type ButtonHTMLAttributes } from 'react'

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
	({ className, ...props }, ref) => {
		return (
			<button
				className={classNames(styles.button, className)}
				ref={ref}
				{...props}
			></button>
		)
	}
)
