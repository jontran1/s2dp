import React, { lazy, Suspense } from 'react';

const LazyLanguageTranslator = lazy(() => import('./LanguageTranslator'));

const LanguageTranslator = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyLanguageTranslator {...props} />
  </Suspense>
);

export default LanguageTranslator;
