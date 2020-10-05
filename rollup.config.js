const typescript = require('rollup-plugin-typescript2');
const pkg = require('./package.json');

const plugins = [
  typescript({
    tsconfigOverride: {
      compilerOptions: {
        module: 'ESNext',
      },
    },
  }),
];

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
    },
  ],
  plugins,
  external: ['http', 'https', 'querystring'],
};
