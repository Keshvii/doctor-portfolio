'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Play, TrendingUp } from 'lucide-react';
import { playlists, videosForPlaylist } from '@/data/portfolio';
import { videoEmbedUrl } from '@/lib/youtube';
import { pagePath, type Design } from '@/lib/routes';

export function TrendingSeries({ design }: { design: Design }) {
  const course = playlists[0];
  const episodes = videosForPlaylist(course).slice(0, 5);
  const [selected, setSelected] = useState(episodes[0]);
  const [playing, setPlaying] = useState(false);
  return <section id="teaching" className={`portfolio-section trending-series teaching-${design}`}>
    <div className="section-inner">
      <div className="series-heading"><div><span className="trending-label"><TrendingUp size={15}/> TRENDING COURSE</span><h2>5 MCQ’s in <em>5 Minutes.</em></h2><p>A few minutes. Five questions. A clearer understanding of pharmacology.<br/>Join Dr. Siraj’s series and start with the first five episodes.</p></div><Link className="text-link" href={pagePath(design, 'education')}>All educational material <ArrowRight size={16}/></Link></div>
      <div className="series-layout"><div><div className="series-screen">
        {playing ? <iframe key={selected.id} src={`${videoEmbedUrl(selected.youtubeVideoId)}&autoplay=1`} title={selected.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/> : <button className="series-poster" type="button" onClick={() => setPlaying(true)} aria-label={`Play ${selected.title}`}><Image src={selected.thumbnail} alt={selected.title} width={640} height={480} unoptimized/><span className="series-play"><Play size={30} fill="currentColor"/></span><span className="poster-caption">START THE SERIES <ArrowRight size={16}/></span></button>}
      </div><div className="series-now"><span className="eyebrow">NOW SELECTED · {selected.duration}</span><h3>{selected.title}</h3></div></div>
      <div className="series-episodes" aria-label="First five episodes">{episodes.map((episode, i) => <button type="button" key={episode.id} className={selected.id === episode.id ? 'series-episode active' : 'series-episode'} aria-pressed={selected.id === episode.id} onClick={() => { setSelected(episode); setPlaying(true); }}><span className="episode-number">0{i + 1}</span><Image src={episode.thumbnail} alt="" width={100} height={75} unoptimized/><span><strong>Episode {i + 1}</strong><small>5 MCQ’s in 5 Minutes · {episode.duration}</small></span><Play size={15}/></button>)}<a className="series-continue" href={course.youtubeUrl} target="_blank" rel="noopener noreferrer">Continue the series on YouTube <ArrowUpRight size={16}/></a></div></div>
    </div>
  </section>;
}
