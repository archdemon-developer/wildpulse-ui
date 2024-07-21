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

type ColorVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'green' | 'dark' | 'light'

export type { LinkAction, ColorVariant, Hero }
