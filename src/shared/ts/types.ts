interface LinkAction {
  id: number
  to: string
  name: string
  variant?: ColorVariant
}

interface Hero {
  backgroundSource: string
  header: string
  description: string
  primaryButtonText: string
  primaryAction: (payload?: MouseEvent) => void
  secondaryButtonText: string
  secondaryAction: (payload?: MouseEvent) => void
}

interface Route {
  path: string
  name: string
}

export interface Toast {
  id: number
  title?: string
  message?: string
  duration?: number
  position?: ToastPosition
  type?: ToastType
}

type ColorVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'green' | 'dark' | 'light'

type ToastPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'

type ToastType = 'warning' | 'info' | 'success' | 'danger'

export type { LinkAction, ColorVariant, Hero, Route, ToastPosition, ToastType }
