/*
 * @Description: vite配置
 * @Author: lujunan
 * @Date: 2022-06-07 09:08:29
 * @LastEditors: lujunan
 * @LastEditTime: 2024-04-09 11:05:51
 */
import { defineConfig } from 'vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite'; // 自动引入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { defineConfig, loadEnv } from 'vite'


// 按需引入element-plus
import {
    createStyleImportPlugin,
    ElementPlusResolve,
} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig(({ mode, command })=>  {
    const env = loadEnv(mode, process.cwd())
    return {
        base: env.VITE_APP_PATH,
        build: {
            terserOptions: {
              compress: {
                //生产环境时移除console
                drop_console: true,
                drop_debugger: true,
              },
            },
            rollupOptions: {
              output: {
                    format: 'es',
              },
            },
          },
        resolve: {
            //设置别名
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
        plugins: [
            vue({
                script: {
                    defineModel: true,
                }
            }),
            AutoImport({
                imports: ['vue'],
                dts: 'src/auto-import.d.ts',
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                directoryAsNamespace: true
            }),
            createStyleImportPlugin({
                resolves: [ElementPlusResolve()],
                libs: [
                    {
                        libraryName: 'element-plus',
                        esModule: true,
                        resolveStyle: (name: string) => {
                            return `element-plus/theme-chalk/${name}.css`;
                        },
                    },
                ],
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
        ],
        css: {
            preprocessorOptions:{
                scss:{
                  // scss样式颜色全局引入
                  additionalData: `
                    @import "@/assets/theme.scss";
                    @import "@/assets/variables.scss";
                    @import "@/assets/transition.scss";
                  `
                }
              },
        },
        server: {
            port: 8888, //启动端口
            hmr: {
                host: '127.0.0.1',
                port: 8888,
            },
            // 设置 https 代理
            proxy: {
                '/api': {
                    target: 'https://img9.doubanio.com/',
                    changeOrigin: true,
                    rewrite: (path: string) => path.replace(/^\/api/, ''),
                },
            },
        },
    }
}
);
