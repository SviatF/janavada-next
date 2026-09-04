'use client';

import { useEffect } from 'react';

const TRACK_URL = 'https://janavada-news.base44.app/functions/trackArticleView';

export default function ArticleViewTracker({ articleId, language = 'en' }) {
  useEffect(() => {
    if (!articleId) return;

    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (cancelled || document.visibilityState !== 'visible') return;

      fetch(TRACK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'omit',
        keepalive: true,
        body: JSON.stringify({
          article_id: articleId,
          language: language === 'hi' ? 'hi' : 'en',
        }),
      }).catch(() => {
        // Analytics must never affect page UX.
      });
    }, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [articleId, language]);

  return null;
}
