import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { eslint } from 'rollup-plugin-eslint';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import { version, author } from './package.json';
const isDev = process.env.NODE_ENV !== 'production';
const config = [
    {
        input: './src/index.js',
        watch: {
            exclude: 'node_modules/**'
        },
        output: {
            file: './build/dist.js', // 必须
            format: 'iife',
            name: 'debugweb',
            onwarn: true,
            sourcemap: true,
            banner: `/* debugweb version ${version} */`,
            footer: `/* from ${author} @2020.04 */`
        },
        plugins: [
            postcss({
                plugins: [cssnano()],
                extensions: ['.css']
            }),
            json(),
            resolve(),
            commonjs(),
            eslint({
                include: ['src/**/*.js'] // 需要检查的部分
            }),
            babel({
                exclude: 'node_modules/**'
            }),
            replace({
                RollupConst: JSON.stringify(process.env.NODE_ENV || 'development')
            }),
            !isDev &&
                terser({
                    output: {
                        ascii_only: true // 仅输出ascii字符
                    },
                    compress: {
                        pure_funcs: ['console.log'] // 去掉console.log函数
                    }
                }),
            isDev &&
                serve({
                    open: true, //server
                    contentBase: ['build'],
                    host: '192.168.100.39',
                    port: 1100
                }),
            isDev &&
                livereload({
                    watch: 'build' // hot live
                })
        ]
    }
];

export default config;
