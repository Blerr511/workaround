import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import swc from '@rollup/plugin-swc';

export default {
  input: 'src/client.js',
  output: {
    file: 'public/client.js',
    format: 'iife', // or 'esm' if you prefer (with <script type="module">)
    sourcemap: true,
  },
  plugins: [
    nodeResolve({ extensions: ['.js', '.ts', '.jsx', '.tsx'] }),
    commonjs(),
    swc({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
      },
    }),
  ],
};
