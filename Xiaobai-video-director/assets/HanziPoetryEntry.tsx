import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {HanziPoetry, HANZI_DURATION_SECONDS, type HanziPoetryProps} from './hanzi-poetry/HanziPoetry';

const defaultProps: HanziPoetryProps = {
  audioSrc: '',
};

registerRoot(() => (
  <Composition
    id="HanziPoetryDemo"
    component={HanziPoetry}
    defaultProps={defaultProps}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={Math.ceil(HANZI_DURATION_SECONDS * 30)}
  />
));
