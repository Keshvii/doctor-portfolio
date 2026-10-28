'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight, Play, Youtube } from 'lucide-react';
import { playlists, videosForPlaylist } from '@/data/portfolio';
import { videoEmbedUrl, watchUrl } from '@/lib/youtube';
import type { Design } from '@/lib/routes';
export function YouTubeLibrary({ design }: { design: Design }) {
  const [selectedId, setSelectedId] = useState(playlists[0].id);
  const selected = playlists.find(p => p.id === selectedId) || playlists[0];
  const videos = videosForPlaylist(selected);
  const [videoId, setVideoId] = useState(videos[0].id);
  const video = videos.find(v => v.id === videoId) || videos[0];
  function choosePlaylist(id: string) {
    const playlist = playlists.find(p => p.id === id);
    if (!playlist) return;
    setSelectedId(id); setVideoId(videosForPlaylist(playlist)[0].id);
  }
  return <div className={`education-video-library library-${design}`}>
    <div className="resource-playlist-grid">{playlists.map((p, i) => <article key={p.id} className={selected.id === p.id ? 'resource-playlist selected' : 'resource-playlist'}><button type="button" onClick={() => choosePlaylist(p.id)} aria-pressed={selected.id === p.id} aria-label={`Select ${p.title}`}><div className="resource-thumbnail"><Image src={p.thumbnail} alt={`${p.title} thumbnail`} width={480} height={360} unoptimized/><span className="playlist-tag">{i === 0 ? 'TRENDING COURSE' : 'PLAYLIST'}</span><span className="thumbnail-play"><Play size={20} fill="currentColor"/></span></div><div className="resource-playlist-copy"><span className="eyebrow">{p.category}</span><h3>{p.title}</h3><p>{p.description}</p><span className="text-link">{selected.id === p.id ? 'Selected collection' : 'Watch here'} <Play size={13}/></span></div></button><a href={p.youtubeUrl} target="_blank" rel="noopener noreferrer"><Youtube size={16}/> View on YouTube <ArrowUpRight size={14}/></a></article>)}</div>
    <div className="education-player-heading"><span className="eyebrow">WATCH & LEARN</span><h3>{selected.title}</h3></div>
    <div className="watch-layout"><div className="featured-video"><div className="player-frame"><iframe key={video.id} src={videoEmbedUrl(video.youtubeVideoId)!} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div><div className="now-playing"><div><span className="eyebrow">{video.category} · {video.duration}</span><h3>{video.title}</h3></div><a className="watch-link" href={watchUrl(video.youtubeVideoId)!} target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight size={15}/></a></div></div>
    <div className="lecture-list"><div className="lecture-list-heading"><div><span className="eyebrow">FEATURED VIDEOS</span><h3>In this collection</h3></div><span>{videos.length.toString().padStart(2, '0')}</span></div>{videos.map((v, i) => <button type="button" key={v.id} className={video.id === v.id ? 'lecture-choice active' : 'lecture-choice'} onClick={() => setVideoId(v.id)} aria-pressed={video.id === v.id}><span className="lecture-index">0{i + 1}</span><span className="lecture-choice-title"><strong>{v.title}</strong><small>{v.duration}</small></span><Play size={14}/></button>)}<a className="series-continue" href={selected.youtubeUrl} target="_blank" rel="noopener noreferrer">Continue on YouTube <ArrowUpRight size={15}/></a></div></div>
  </div>;
}
