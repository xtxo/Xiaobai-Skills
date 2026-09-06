export type BackgroundClip = {
  id: string;
  file: string;
  start: number;
  end: number;
  label: string;
  sourcePage: string;
  sourceSite: 'Pexels' | 'Pixabay';
  sourceTitle: string;
  fitX?: number;
  fitY?: number;
  zoom?: number;
  brightness?: number;
  saturation?: number;
};

/**
 * Download each source page manually and save it to public/bg/ using `file`.
 * The source URLs are documentation only; Remotion always reads local files.
 */
export const CINEMATIC_BACKGROUNDS: BackgroundClip[] = [
  {
    id: 'calm-lake',
    file: 'bg/01-misty-lake.mp4',
    start: 0,
    end: 9,
    label: '静 / 稳：雾湖与群山',
    sourceSite: 'Pexels',
    sourceTitle: 'Video Footage of a Misty Lake',
    sourcePage: 'https://www.pexels.com/video/video-footage-of-a-misty-lake-8745444/',
    zoom: 1.05,
    brightness: 0.72,
    saturation: 0.72,
  },
  {
    id: 'busy-city',
    file: 'bg/02-busy-city.mp4',
    start: 9,
    end: 18.2,
    label: '忙 / 贪 / 名利 / 得失：城市人流延时',
    sourceSite: 'Pexels',
    sourceTitle: 'People Walking in City',
    sourcePage: 'https://www.pexels.com/video/people-walking-in-city-11745560/',
    zoom: 1.12,
    brightness: 0.58,
    saturation: 0.55,
  },
  {
    id: 'falling-petals',
    file: 'bg/03-falling-petals.mp4',
    start: 18.2,
    end: 28.3,
    label: '因果 / 花落 / 对错 / 心锁：落花',
    sourceSite: 'Pixabay',
    sourceTitle: 'Flowers, Petals, Falling',
    sourcePage: 'https://pixabay.com/videos/flowers-petals-falling-scattered-175057/',
    zoom: 1.16,
    brightness: 0.68,
    saturation: 0.62,
  },
  {
    id: 'mountain-self',
    file: 'bg/04-mountain-self.mp4',
    start: 28.3,
    end: 38,
    label: '洒脱 / 半生 / 苦乐 / 我：山巅独处',
    sourceSite: 'Pexels',
    sourceTitle: 'Silhouette of Man Enjoying a Mountain Sunset',
    sourcePage: 'https://www.pexels.com/video/silhouette-of-man-enjoying-a-mountain-sunset-34421873/',
    zoom: 1.12,
    brightness: 0.62,
    saturation: 0.58,
  },
  {
    id: 'autumn-leaves',
    file: 'bg/05-autumn-leaves.mp4',
    start: 38,
    end: 43,
    label: '愁 / 秋 / 思绪：风中的秋叶',
    sourceSite: 'Pexels',
    sourceTitle: 'Close up of Leaves in Autumn',
    sourcePage: 'https://www.pexels.com/video/close-up-of-leaves-in-autumn-13971735/',
    zoom: 1.08,
    brightness: 0.61,
    saturation: 0.64,
  },
  {
    id: 'release-lake',
    file: 'bg/06-release-lake.mp4',
    start: 43,
    end: 48,
    label: '命里无时 / 莫须强求：湖边日落与孤舟',
    sourceSite: 'Pexels',
    sourceTitle: 'Serene Boat on Misty Mountain Lake at Sunset',
    sourcePage: 'https://www.pexels.com/video/a-boat-on-the-shore-at-sunset-12631364/',
    zoom: 1.08,
    brightness: 0.66,
    saturation: 0.58,
  },
];
