import React from 'react'
import StatItem from './StatItem';

function StatsSection({ title, stats }) {
    return (
        <div className="my-4">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="space-y-2">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
    );
}

export default StatsSection