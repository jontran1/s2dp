import React, { FC } from 'react';
// import styles from './Progress.module.scss';

interface ProgressProps {
  text?: string,
  percentage?: number
}

const Progress: FC<ProgressProps> = ({ text, percentage }) => {
  percentage = percentage ?? 0;
  return (
    <div className="progress-container">
      <div className='progress-bar' style={{ 'width': `${percentage}%` }}>
        {text} ({`${percentage.toFixed(2)}%`})
      </div>
    </div>
  );
}

export default Progress;
