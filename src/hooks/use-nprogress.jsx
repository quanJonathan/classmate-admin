import { useEffect } from 'react';
import nProgress from 'nprogress';

export function useNProgress() {
  useEffect(() => {
    const start = () => nProgress.start();
    const done = () => nProgress.done();

    // Attach event listeners
    window.addEventListener('beforeunload', start);
    window.addEventListener('unload', done);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', start);
      window.removeEventListener('unload', done);
    };
  }, []);
}