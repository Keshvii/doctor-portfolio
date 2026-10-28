export function inquiryEndpoint(email: string) {
  return `https://formsubmit.co/ajax/${encodeURIComponent(email)}`;
}
export function classifyInquiryResponse(ok: boolean, value: unknown): 'accepted' | 'activation' | 'error' {
  if (!value || typeof value !== 'object') return 'error';
  const result = value as { success?: unknown; message?: unknown };
  const message = typeof result.message === 'string' ? result.message : '';
  if (/activat|confirm.{0,35}(email|address)|verif.{0,35}(email|address)|sent.{0,35}(link|confirmation)|check.{0,20}(inbox|email)/i.test(message)) return 'activation';
  return ok && (result.success === true || result.success === 'true') ? 'accepted' : 'error';
}
