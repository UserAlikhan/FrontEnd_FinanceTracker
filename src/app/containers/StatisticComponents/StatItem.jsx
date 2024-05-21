import React from 'react'

function StatItem({ title, value, icon }) {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center space-x-2">
            {icon && icon}
            <span className="text-sm font-medium">{title}</span>
          </div>
          <span className="text-sm font-semibold">{value}</span>
        </div>
    )
}

export default StatItem