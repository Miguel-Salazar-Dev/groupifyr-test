// components/Alert.tsx
'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IconCircleCheckFilled, IconCircleXFilled, IconInfoCircleFilled } from '@tabler/icons-react'
import { useAlertStore } from '../stores/alert-store'

const Alert: React.FC = () => {
  const { isVisible, alarm, message, type, hideAlert } = useAlertStore()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideAlert()
      }, 3000)

      return () => { clearTimeout(timer) }
    }
  }, [isVisible, hideAlert])

  const stateColor = {
    success: 'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800',
    error: 'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
    info: 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800'
  }[type]

  const stateIcon = {
    success: <IconCircleCheckFilled className="flex-shrink-0 inline w-6 h-6 me-3" />,
    error: <IconCircleXFilled className="flex-shrink-0 inline w-6 h-6 me-3" />,
    info: <IconInfoCircleFilled className="flex-shrink-0 inline w-6 h-6 me-3" />
  }[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 left-0 right-0 z-50 flex justify-center items-center"
        >
          <div className={`${stateColor} p-4 rounded-lg shadow-md max-w-[600px] w-auto mx-4 border`}>
            <div className="flex items-center">
              {stateIcon}
              <p className="mr-4 flex-grow">
                <span className="font-medium">{alarm}</span>{message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert
