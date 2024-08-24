import { lazy, Suspense } from 'react';
import { LanguageSelectorProps } from './LanguageSelector';

const LazyLanguageSelector = lazy(() => import('./LanguageSelector'));

const LanguageSelector = (props: LanguageSelectorProps) => (
  <Suspense fallback={null}>
    <LazyLanguageSelector {...props} />
  </Suspense>
);

export default LanguageSelector;
