import React from 'react'
import { Bias } from '../../packages/types/api'
import clsx from 'clsx'

interface IBiasWidgetProps extends Bias {}

const biasWidget = ({ description, id, score, type }: IBiasWidgetProps) => {
  const scoreInt = parseInt(score)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div
          className={clsx('w-3 h-3 rounded-ful', {
            'bg-green-500': scoreInt <= 30,
            'bg-red-500': scoreInt > 30 && scoreInt > 65
          })}
        />
        <span className="text-sm font-medium">{score}%</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{type}</span>
      </div>
      <div className="text-sm">{description}</div>
    </div>
  )
}

export default biasWidget
