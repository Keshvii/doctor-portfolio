'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, Mail, X } from 'lucide-react';
import { portfolio as d } from '@/data/portfolio';
import { classifyInquiryResponse, inquiryEndpoint } from '@/lib/inquiry';
type SubmissionState = 'idle' | 'sending' | 'success' | 'error' | 'activation';
export function Inquiry() {
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'sending') return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (String(fields.get('_honey') || '').trim()) return;
    setState('sending'); setError(''); setShowToast(false);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(inquiryEndpoint(d.contact.email), {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ ...Object.fromEntries(fields), _subject: `[Dr. Siraj inquiry] ${fields.get('subject')}`, _template: 'table' }),
      });
      const result = await response.json();
      const outcome = classifyInquiryResponse(response.ok, result);
      if (outcome === 'activation') {
        setState('activation');
        setError('Email delivery is awaiting activation by the team. Please use the direct email link below for now.');
        return;
      }
      if (outcome !== 'accepted') throw new Error('Submission was not accepted.');
      setState('success'); setShowToast(true); form.reset();
    } catch {
      setState('error');
      setError('We could not confirm that your inquiry was sent. Your message is still here; please retry or email the team directly.');
    } finally { window.clearTimeout(timeout); }
  }
  return <div className="inquiry-layout live-inquiry">
    <div className="inquiry-note"><Mail size={24}/><div><strong>A conversation starts here.</strong><p>{d.contact.medicalDisclaimer}</p></div></div>
    <form onSubmit={submit} className="inquiry-form" aria-busy={state === 'sending'}>
      <fieldset disabled={state === 'sending'}>
        <div className="form-fields">
          <label>Full name *<input name="name" required maxLength={100} autoComplete="name" placeholder="Your full name"/></label>
          <label>Email *<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com"/></label>
          <label>Phone <span>(optional)</span><input name="phone" type="tel" maxLength={30} autoComplete="tel" placeholder="Your contact number"/></label>
          <label>Inquiry purpose *<select name="purpose" defaultValue="" required><option value="" disabled>Choose a purpose</option>{d.contact.inquiryCategories.map(c => <option key={c}>{c}</option>)}</select></label>
        </div>
        <label>Subject *<input name="subject" required maxLength={180} placeholder="What would you like to discuss?"/></label>
        <label>Message *<textarea name="message" rows={6} required minLength={10} maxLength={5000} placeholder="Tell the team a little about your request…"/></label>
        <div className="form-honeypot" aria-hidden="true"><label>Leave this blank<input name="_honey" tabIndex={-1} autoComplete="off"/></label></div>
        <label className="consent"><input name="consent" type="checkbox" value="Agreed" required/>I agree to send these details through FormSubmit to Dr. Siraj’s team and be contacted about this inquiry.</label>
        <button className="action-link" type="submit" disabled={state === 'sending'}>{state === 'sending' ? <><LoaderCircle className="spin" size={17}/> Sending…</> : <>Send inquiry <ArrowUpRight size={17}/></>}</button>
      </fieldset>
      <div className="form-status" role={state === 'error' || state === 'activation' ? 'alert' : 'status'} aria-live="polite">{error || (state === 'success' ? 'Inquiry sent. Dr. Siraj’s team will contact you soon.' : '')}</div>
      <a className="text-link" href={`mailto:${d.contact.email}`}><Mail size={15}/> Prefer email? {d.contact.email}</a>
    </form>
    {showToast && <div className="inquiry-toast" role="status"><CheckCircle2 size={25}/><div><strong>Inquiry sent</strong><p>Dr. Siraj’s team will contact you soon.</p></div><button type="button" onClick={() => setShowToast(false)} aria-label="Dismiss confirmation"><X size={19}/></button></div>}
  </div>;
}
