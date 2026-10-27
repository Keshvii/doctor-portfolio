import source from './doctor_portfolio_demo_data.json';
import type { DoctorData, Playlist, Video } from './types';
export const portfolio: DoctorData = source;
export const playlists = portfolio.teaching.playlists;
export const videos = portfolio.teaching.videos;
export function videosForPlaylist(playlist: Playlist): Video[] { return videos.filter(video => video.playlistId === playlist.id); }
export function assetPath(path: string): string { return `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`; }
