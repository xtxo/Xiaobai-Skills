import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {HanziPoetry, type HanziPoetryProps} from './HanziPoetry';
import {CINEMATIC_BACKGROUNDS, type BackgroundClip} from './backgrounds';

export type HanziPoetryCinematicProps = HanziPoetryProps & {
  backgroundEnabled?: boolean;
  overlayOpacity?: number;
  backgroundOpacity?: number;
  vignette?: number;
  grain?: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

const BackgroundClipLayer: React.FC<{clip: BackgroundClip}> = ({clip}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = Math.max(1, Math.round((clip.end - clip.start) * fps));
  const fadeFrames = Math.min(Math.round(fps * 0.45), Math.floor(duration / 3));
  const opacity = interpolate(
    frame,
    [0, fadeFrames, Math.max(fadeFrames + 1, duration - fadeFrames), duration],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const drift = interpolate(frame, [0, duration], [1, clip.zoom ?? 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{opacity, overflow: 'hidden'}}>
      <OffthreadVideo
        src={staticFile(clip.file)}
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: `${clip.fitX ?? 50}% ${clip.fitY ?? 50}%`,
          transform: `scale(${drift})`,
          filter: `brightness(${clip.brightness ?? 0.68}) saturate(${clip.saturation ?? 0.62}) contrast(0.94)`,
        }}
      />
    </AbsoluteFill>
  );
};

const BackgroundTimeline: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      {CINEMATIC_BACKGROUNDS.map((clip) => {
        const from = Math.round(clip.start * fps);
        const durationInFrames = Math.max(1, Math.round((clip.end - clip.start) * fps));
        return (
          <Sequence key={clip.id} from={from} durationInFrames={durationInFrames} layout="none">
            <BackgroundClipLayer clip={clip}/>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const HanziPoetryCinematic: React.FC<HanziPoetryCinematicProps> = ({
  audioSrc = '',
  backgroundEnabled = false,
  overlayOpacity = 0.96,
  backgroundOpacity = 1,
  vignette = 0.42,
  grain = 0.13,
}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const breathe = 0.02 * Math.sin((frame / 30) * Math.PI * 0.2);
  const progress = clamp(frame / Math.max(1, durationInFrames - 1));

  return (
    <AbsoluteFill style={{backgroundColor: '#171b1b', overflow: 'hidden'}}>
      {backgroundEnabled ? (
        <AbsoluteFill style={{opacity: backgroundOpacity}}>
          <BackgroundTimeline/>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(circle at 50% 30%, #6f786f 0%, #384340 38%, #1b2221 100%)',
          }}
        />
      )}

      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(10,14,14,.18) 0%, rgba(10,14,14,.02) 34%, rgba(10,14,14,.12) 70%, rgba(10,14,14,.42) 100%)',
        }}
      />

      <AbsoluteFill
        style={{
          mixBlendMode: 'multiply',
          opacity: overlayOpacity,
          transform: `scale(${1 + breathe})`,
          transformOrigin: 'center',
        }}
      >
        <HanziPoetry audioSrc={audioSrc}/>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          boxShadow: `inset 0 0 260px rgba(0,0,0,${vignette})`,
        }}
      />

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          opacity: grain,
          mixBlendMode: 'soft-light',
          backgroundImage:
            'radial-gradient(circle at 22% 16%, rgba(255,255,255,.22) 0 1px, transparent 1.4px), radial-gradient(circle at 72% 66%, rgba(0,0,0,.18) 0 1px, transparent 1.3px)',
          backgroundSize: '19px 19px, 23px 23px',
          transform: `translate(${(frame % 3) - 1}px, ${((frame * 2) % 3) - 1}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          bottom: 42,
          height: 2,
          background: 'rgba(255,255,255,.14)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'rgba(255,255,255,.48)',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
