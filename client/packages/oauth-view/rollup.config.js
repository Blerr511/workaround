import swc from '@rollup/plugin-swc';
import postcss from 'rollup-plugin-postcss';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import packageJson from './package.json' assert { type: 'json' };
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

const ROOT_PATH = process.env.ROOT_PATH;

export default {
  input: `${ROOT_PATH}/index.ts`,
  output: [
    {
      file: `${ROOT_PATH}/${packageJson.main}`,
      format: 'cjs',
      exports: 'auto',
      sourcemap: true,
    },
    {
      file: `${ROOT_PATH}/${packageJson.module}`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: [
    // Mark React-related packages as external
    // so they won’t be bundled into your library
    'react',
    'react-dom',
  ],
  plugins: [
    resolve({ extensions: ['.js', '.ts', '.jsx', '.tsx'] }),
    commonjs(),
    postcss({
      // If you want to extract CSS into a separate file:
      extract: path.resolve(`${ROOT_PATH}/dist/public/styles.css`),
      modules: false, // or true if you prefer CSS modules
      use: ['sass'], // if you want to process SCSS or other preprocessors
      plugins: [require('autoprefixer')()],
    }),
    swc({
      exclude: ['node_modules'],
      // point plugin-swc to your swc config file
      swc: {
        // If you want to inline the config here, you could,
        // but typically you just do:
        ...require('./swc.config.json'),
      },
    }),
    copy({
      targets: [
        { src: `${ROOT_PATH}/public/*`, dest: `${ROOT_PATH}/dist/public` },
      ],
    }),
  ],
};
