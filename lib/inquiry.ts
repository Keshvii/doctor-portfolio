function validGoogleForm(value: string | undefined, embed = false): string | null {
  try {
    const url = new URL(value || '');
    if (url.protocol !== 'https:' || url.hostname !== 'docs.google.com') return null;
    if (!/^\/forms\/(?:u\/\d+\/)?d\/e\/[^/]+\/viewform\/?$/.test(url.pathname)) return null;
    if (embed && url.searchParams.get('embedded') !== 'true') return null;
    return url.href;
  } catch { return null; }
}
export const formUrl = validGoogleForm(process.env.NEXT_PUBLIC_GOOGLE_FORM_URL);
export const embedUrl = validGoogleForm(process.env.NEXT_PUBLIC_GOOGLE_FORM_EMBED_URL, true);
