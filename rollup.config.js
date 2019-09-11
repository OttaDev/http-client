import commonjs from 'rollup-plugin-commonjs';
import copier from 'rollup-plugin-copier';
import resolveModule from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const copy = copier({
  items: [{
    src: 'src/definitions.ts',
    dest: 'dist/definitions.ts',
    createPath: true
  }]
});

const plugins = [
  resolveModule({ preferBuiltins: true }),
  commonjs(),
  typescript(),
  copy
];

export default {
  input: 'src/index.ts',
  output: [{
      file: pkg.main,
      format: 'cjs',
      exports: 'named'
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named'
    }
  ],
  plugins,
  external: ['http', 'https']
};