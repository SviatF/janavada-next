'use client';

import { useEffect } from 'react';

const BASE44_TRACK_URL = 'https://janavada-news.base44.app/functions/trackArticleView';

function updateVisibleCounter(views, language) {
  const value = Number(views);
  if (!Number.isFinite(value)) return;

  const root = document.querySelector('article') || document.body;
  const spans = Array.from(root.querySelectorAll('span'));
  const target = spans.find((element) => {
    const text = String(element.textContent || '').trim();
    return /\b[\d,]+\s+views(?:\s+views)?$/i.test(text) || /[\d,]+\s+व्यूज़(?:\s+व्यूज़)?$/.test(text);
  });
  if (!target) return;

  const label = language === 'hi' ? 'व्यूज़' : 'views';
  const nextText = `${value.toLocaleString()} ${label}`;

  // Keep the eye icon, but replace every text node so the UI never becomes "2 views views".
  Array.from(target.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) node.remove();
  });
  target.appendChild(document.createTextNode(nextText));
}

async function trackCms(articleId, language) {
  const response = await fetch('/api/cms-track-view', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    credentials: 'same-origin',
    keepalive: true,
    cache: 'no-store',
    body: JSON.stringify({
      article_id: articleId,
      language: language === 'hi' ? 'hi' : 'en',
      request_nonce: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

async function trackLegacy(articleId, language) {
  return fetch(BASE44_TRACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    keepalive: true,
    cache: 'no-store',
    body: JSON.stringify({
      article_id: articleId,
      language: language === 'hi' ? 'hi' : 'en',
    }),
  });
}

export default function ArticleViewTracker({ articleId, language = 'en', source = null }) {
  useEffect(() => {
    if (!articleId) return;

    let cancelled = false;
    let tracked = false;
    let timer = null;

    const trackOnce = async () => {
      if (cancelled || tracked || document.visibilityState !== 'visible') return;
      tracked = true;

      try {
        // New JanaVada CMS stories do not always use a predictable ID prefix. Try the CMS first
        // unless the caller explicitly marks this as a legacy/Base44 article. A CMS 404 means the
        // ID belongs to the legacy store, so only then fall back to the old tracker.
        if (source !== 'base44') {
          const { response, payload } = await trackCms(articleId, language);
          if (cancelled) return;

          if (response.ok && payload?.ok) {
            updateVisibleCounter(payload.views, language);
            window.dispatchEvent(new CustomEvent('janavada:view-count', {
              detail: {
                articleId,
                views: Number(payload.views || 0),
                viewsToday: Number(payload.views_today || 0),
                trackedAt: payload.tracked_at || null,
              },
            }));
            return;
          }

          if (response.status !== 404 && source === 'cms') return;
          if (response.status !== 404 && String(articleId).startsWith('art_')) return;
        }

        await trackLegacy(articleId, language);
      } catch {
        // View analytics must never affect article UX.
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === 'visible') trackOnce();
    };

    timer = window.setTimeout(trackOnce, 400);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [articleId, language, source]);

  return null;
}
