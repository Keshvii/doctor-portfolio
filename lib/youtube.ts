const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const PLAYLIST_ID = /^[A-Za-z0-9_-]{10,80}$/;
export function extractVideoId(value: string | null | undefined): string | null {
  if (!value) return null;
  if (VIDEO_ID.test(value)) return value;
  try {
    const url = new URL(value);
    if (url.hostname === 'youtu.be' || url.hostname === 'www.youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id && VIDEO_ID.test(id) ? id : null;
    }
    if (!['youtube.com','www.youtube.com','m.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(url.hostname)) return null;
    const id = url.searchParams.get('v') || url.pathname.match(/\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
    return id && VIDEO_ID.test(id) ? id : null;
  } catch { return null; }
}
export function extractPlaylistId(value: string | null | undefined): string | null {
  if (!value) return null;
  if (PLAYLIST_ID.test(value)) return value;
  try {
    const url = new URL(value);
    if (!['youtube.com','www.youtube.com','m.youtube.com'].includes(url.hostname)) return null;
    const id = url.searchParams.get('list');
    return id && PLAYLIST_ID.test(id) ? id : null;
  } catch { return null; }
}
export function videoEmbedUrl(value: string | null | undefined): string | null {
  const id = extractVideoId(value);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
}
export function playlistEmbedUrl(value: string | null | undefined): string | null {
  const id = extractPlaylistId(value);
  return id ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(id)}` : null;
}
export function watchUrl(value: string | null | undefined): string | null {
  const id = extractVideoId(value);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}
export function playlistUrl(value: string | null | undefined): string | null {
  const id = extractPlaylistId(value);
  return id ? `https://www.youtube.com/playlist?list=${encodeURIComponent(id)}` : null;
}
