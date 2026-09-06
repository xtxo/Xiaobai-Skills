import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {HANZI_DURATION_SECONDS} from './hanzi-poetry/HanziPoetry';
import {
  HanziPoetryCinematic,
  type HanziPoetryCinematicProps,
} from './hanzi-poetry/HanziPoetryCinematic';

const defaultProps: HanziPoetryCinematicProps = {
  audioSrc: '',
  backgroundEnabled: false,
  overlayOpacity: 0.96,
  backgroundOpacity: 1,
  vignette: 0.42,
  grain: 0.13,
};

registerRoot(() => (
  <Composition
    id="HanziPoetryCinematic"
    component={HanziPoetryCinematic}
    defaultProps={defaultProps}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={Math.ceil(HANZI_DURATION_SECONDS * 30)}
  />
));
