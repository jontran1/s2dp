import React, { lazy, Suspense } from 'react';

const LazyProgress = lazy(() => import('./Progress'));

const Progress = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProgress {...props} />
  </Suspense>
);

export default Progress;
