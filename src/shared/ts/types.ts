interface LinkAction {
  id: number
  to: string
  name: string
  variant?: ColorVariant
}

type ColorVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'green' | 'dark' | 'light'

export type { LinkAction, ColorVariant }
