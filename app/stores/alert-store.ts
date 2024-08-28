// stores/alertStore.ts
import { create } from 'zustand'

type AlertType = 'success' | 'error' | 'info'

interface AlertState {
  isVisible: boolean
  alarm: string
  message: string
  type: AlertType
  showAlert: (alarm: string, message: string, type: AlertType) => void
  hideAlert: () => void
}

export const useAlertStore = create<AlertState>((set) => ({
  isVisible: false,
  alarm: '',
  message: '',
  type: 'info',
  showAlert: (alarm, message, type) => { set({ isVisible: true, alarm, message, type }) },
  hideAlert: () => { set({ isVisible: false }) }
}))
