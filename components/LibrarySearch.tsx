'use client';
import { useState } from 'react';
import { ArrowUpRight, ListVideo, Search, Tv2, X } from 'lucide-react';
import { playlists, videos } from '@/data/portfolio';
import type { Video } from '@/data/types';

export function LibrarySearch({ onPlaylist, onVideo }: { onPlaylist: (id: string) => void; onVideo: (video: Video) => void }) {
  const [query, setQuery] = useState('');
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const matches = (text: string) => terms.every(term => text.toLocaleLowerCase().includes(term));
  const foundPlaylists = terms.length ? playlists.filter(p => matches(`${p.title} ${p.category} ${p.description}`)) : [];
  const foundVideos = terms.length ? videos.filter(v => matches(`${v.title} ${v.category} ${v.description} ${playlists.find(p => p.id === v.playlistId)?.title || ''}`)) : [];
  const total = foundPlaylists.length + foundVideos.length;
  return <div className="library-search">
    <label htmlFor="library-query">Find a playlist or video</label>
    <div className="library-search-field"><Search size={19} aria-hidden="true"/><input id="library-query" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by title, topic, or keyword…" autoComplete="off"/>{query && <button type="button" aria-label="Clear library search" onClick={() => setQuery('')}><X size={18}/></button>}</div>
    <p className="library-search-hint">Search the playlists and selected videos in this site’s library.</p>
    {terms.length > 0 && <div className="library-search-results"><p role="status" aria-live="polite">{total ? `${total} ${total === 1 ? 'result' : 'results'} for “${query.trim()}”` : `No playlists or videos found for “${query.trim()}”. Try a different topic or clear the search.`}</p>
      {foundPlaylists.map(p => <button key={p.id} type="button" onClick={() => { onPlaylist(p.id); setQuery(''); }}><ListVideo size={19}/><span><small>PLAYLIST · {p.lessonCount} videos</small><strong>{p.title}</strong></span><ArrowUpRight size={16}/></button>)}
      {foundVideos.map(v => <button key={v.id} type="button" onClick={() => { onVideo(v); setQuery(''); }}><Tv2 size={19}/><span><small>VIDEO · {v.category}</small><strong>{v.title}</strong></span><ArrowUpRight size={16}/></button>)}
    </div>}
  </div>;
}
