import { useState } from 'react'
import { ThemeValue } from '../types'
import { getSystemTheme } from '../utils'

export const useTheme = () => {
	const [theme, setTheme] = useState<ThemeValue>(getSystemTheme())

	console.log(theme)

	return { theme, setTheme }
}