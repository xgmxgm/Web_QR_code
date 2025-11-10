import type { FC } from 'react'
import { useTheme } from '../../hooks'

export const ThemeSwitcher: FC = () => {
	const { theme } = useTheme()

	return (
		<div>{theme}</div>
	)
}
