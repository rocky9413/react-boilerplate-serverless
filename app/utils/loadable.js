import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);
  const isOnJSDOM =
    !__SERVER__ && // eslint-disable prettier/prettier
    (navigator.userAgent.includes('Node.js') || // eslint-disable prettier/prettier
      navigator.userAgent.includes('jsdom')); // eslint-disable prettier/prettier
  const isTesting = process.env.NODE_ENV === 'test';

  // Suspense is not supported with server-side rendering yet. We will
  // just need to wait until the client takes over
  if (__SERVER__ || (isOnJSDOM && !isTesting)) {
    return () => <div />;
  }

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
