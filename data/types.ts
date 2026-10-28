import source from './doctor_portfolio_demo_data.json';
export type DoctorData = typeof source;
export type Playlist = DoctorData['teaching']['playlists'][number];
export type Video = DoctorData['teaching']['videos'][number];
export type PortfolioBook = DoctorData['books'][number];
export type Publication = DoctorData['research']['publications'][number];
export type Achievement = DoctorData['achievements'][number];
