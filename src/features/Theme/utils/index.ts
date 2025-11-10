'use client'

import { ThemeValue } from '../types'

export const getSystemTheme = (): ThemeValue => {
	return window.matchMedia('(prefers-color-scheme:dark)').matches ? ThemeValue.DARK : ThemeValue.LIGHT
}