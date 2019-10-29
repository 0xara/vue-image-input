
import multiInput from 'rollup-plugin-multi-input';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

const config = {
    input: ['src/utils/*.js'],
    output: {
        dir: './dist',
        format: 'esm',
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
		multiInput(),
        babel({
            babelrc: false,
            presets: [['env', { modules: false }]],
            exclude: 'node_modules/**',
            externalHelpersWhitelist: ['objectSpread'],
            plugins: ["transform-es2015-parameters","transform-es2015-destructuring","transform-es2015-spread","transform-object-rest-spread"]
        })
    ]
};

export default config;