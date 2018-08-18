import pkg from './package.json';

var banner =
  '/* @preserve\n' +
  ' * Leaflet Control TileLoadingProgress ' +
  pkg.version +
  '\n' +
  ' * https://github.com/jbccollins/leaflet-tile-loading-progress-control\n' +
  ' *\n' +
  ' * Copyright (c) 2018 James Collins\n' +
  ' * All rights reserved.\n' +
  ' */\n';

export default {
  input: 'src/index.js',
  external: ['leaflet'],
  output: {
    file: 'dist/Control.TileLoadingProgress.js',
    format: 'iife',
    name: 'L.Control.TileLoadingProgress',
    sourcemap: true,
    globals: {
      leaflet: 'L'
    },
    banner: banner
  }
};