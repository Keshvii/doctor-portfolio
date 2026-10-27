'use client';
import { useState } from 'react';
import { LibrarySearch } from './LibrarySearch';
import { ArrowUpRight, ListVideo, Play, Tv2 } from 'lucide-react';
import { playlists, videosForPlaylist } from '@/data/portfolio';
import type { Video } from '@/data/types';
import { extractPlaylistId, playlistEmbedUrl, playlistUrl, videoEmbedUrl, watchUrl } from '@/lib/youtube';
function Player({ video, playlist, playlistMode }: { video: Video; playlist: (typeof playlists)[number]; playlistMode: boolean }) {
 const embed = playlistMode ? playlistEmbedUrl(playlist.youtubeUrl || playlist.youtubePlaylistId) : videoEmbedUrl(video.youtubeUrl || video.youtubeVideoId);
 const external = playlistMode ? playlistUrl(playlist.youtubeUrl || playlist.youtubePlaylistId) : watchUrl(video.youtubeUrl || video.youtubeVideoId);
 return <div className="player-column"><div className="player-frame">{embed?<iframe src={embed} title={playlistMode?`${playlist.title} playlist`:video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"/>:<div className="player-placeholder"><span className="play-orb"><Play fill="currentColor" size={22}/></span><small>LECTURE PREVIEW</small><strong>{playlistMode?playlist.title:video.title}</strong><p>Demo preview · add verified YouTube link to enable playback</p></div>}</div><div className="now-playing"><div><span className="eyebrow">{playlistMode?'PLAYLIST PREVIEW':video.category}</span><h3>{playlistMode?playlist.title:video.title}</h3><p>{playlistMode?playlist.description:video.description}</p></div>{external&&<a className="watch-link" href={external} target="_blank" rel="noopener noreferrer">Open on YouTube <ArrowUpRight size={15}/></a>}</div></div>
}
export function YouTubeLibrary({ design }: { design:'1'|'2'|'3' }) {
 const [selectedId,setSelectedId]=useState(playlists[0]?.id||'');
 const selected=playlists.find(p=>p.id===selectedId)||playlists[0];
 const videos=videosForPlaylist(selected);
 const [videoId,setVideoId]=useState(videos[0]?.id||'');
 const [playlistMode,setPlaylistMode]=useState(false);
 function choosePlaylist(id:string){setSelectedId(id);const next=playlists.find(p=>p.id===id);setVideoId(next?videosForPlaylist(next)[0]?.id||'':'');setPlaylistMode(false)}
 const video=videos.find(v=>v.id===videoId)||videos[0];
 if(!selected||!video)return <p>No featured learning resources have been added.</p>;
 const playlistId=extractPlaylistId(selected.youtubeUrl||selected.youtubePlaylistId);
 return <div className={`youtube-library library-${design}`}>
   <LibrarySearch onPlaylist={choosePlaylist} onVideo={item=>{choosePlaylist(item.playlistId);setVideoId(item.id);setPlaylistMode(false)}}/>
   {design==='1'&&<aside className="library-sidebar"><p className="eyebrow">PLAYLISTS</p>{playlists.map((p,i)=><button key={p.id} className={selected.id===p.id?'playlist-choice active':'playlist-choice'} onClick={()=>choosePlaylist(p.id)}><span>0{i+1}</span><span>{p.title}<small>{p.lessonCount} lessons · {p.level}</small></span></button>)}<div className="sidebar-description"><span className="eyebrow">ABOUT THIS SERIES</span><p>{selected.description}</p><span className="resource-note">{selected.category}</span></div></aside>}
   {design==='2'&&<div className="playlist-gallery">{playlists.map((p,i)=><button key={p.id} onClick={()=>choosePlaylist(p.id)} className={selected.id===p.id?'gallery-playlist active':'gallery-playlist'}><span className={`playlist-art art-${i}`}><span className="art-num">0{i+1}</span><span className="art-play"><Play fill="currentColor" size={17}/></span></span><span className="gallery-playlist-copy"><small>{p.category} · {p.lessonCount} lessons</small><strong>{p.title}</strong></span></button>)}</div>}
   {design==='3'&&<div className="archive-tabs"><p className="eyebrow">CHOOSE A LEARNING SERIES</p>{playlists.map((p,i)=><button key={p.id} className={selected.id===p.id?'archive-tab active':'archive-tab'} onClick={()=>choosePlaylist(p.id)}><span>0{i+1}</span>{p.title}<ArrowUpRight size={14}/></button>)}</div>}
   <div className="watch-layout"><div className="featured-video"><div className="current-series"><span className="eyebrow">{selected.category} / {selected.level}</span><span>{videos.length} featured lectures</span></div><Player video={video} playlist={selected} playlistMode={playlistMode}/><div className="player-actions"><button onClick={()=>{setPlaylistMode(false)}} aria-pressed={!playlistMode}><Tv2 size={15}/> Play selected video</button><button onClick={()=>setPlaylistMode(true)} aria-pressed={playlistMode} disabled={!playlistId}><ListVideo size={15}/> Play full playlist here</button>{playlistId&&<a href={playlistUrl(selected.youtubeUrl||selected.youtubePlaylistId)!} target="_blank" rel="noopener noreferrer">Open playlist on YouTube <ArrowUpRight size={14}/></a>}</div></div>
   <div className="lecture-list"><div className="lecture-list-heading"><div><span className="eyebrow">IN THIS SERIES</span><h3>{design==='3'?'Field notes':selected.title}</h3></div><span>{videos.length.toString().padStart(2,'0')}</span></div>{videos.map((item,i)=><button key={item.id} className={video.id===item.id&&!playlistMode?'lecture-choice active':'lecture-choice'} onClick={()=>{setVideoId(item.id);setPlaylistMode(false)}} aria-current={video.id===item.id&&!playlistMode?'true':undefined}><span className="lecture-index">{(i+1).toString().padStart(2,'0')}</span><span className="lecture-choice-title"><strong>{item.title}</strong><small>{item.category}</small></span><span className="lecture-duration">{item.duration}</span></button>)}<p className="library-note">Selected videos are listed here. Play the full playlist to browse every video in the source collection.</p></div></div>
 </div>;
}

