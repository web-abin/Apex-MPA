import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite' //组件自动按需引入
import { VantResolver } from 'unplugin-vue-components/resolvers'
import autoImport from 'unplugin-auto-import/vite' //自动导入 Composition API
import { visualizer } from 'rollup-plugin-visualizer' //打包size分析工具
import compression from 'vite-plugin-compression' //gzip/br 压缩
import path from 'path'
import chalk from 'chalk'

// 引入多页面配置文件
const project = require('./scripts/multiPages.json')
// 获取npm run dev后缀 配置的环境变量
const npm_config_page: string = process.env.npm_config_page || ''
// 命令行报错提示
const errorLog = (error) => console.log(chalk.red(`${error}`))

//获取指定的单页面入口
const getEnterPages = () => {
  if (!npm_config_page)
    errorLog(
      '-------------------请在命令行后以 `--page=页面名称` 格式指定页面名称！-------------------'
    )
  const filterArr = project.filter(
    (item) => item.chunk.toLowerCase() == npm_config_page.toLowerCase()
  )
  if (!filterArr.length)
    errorLog(
      '-------------------不存在此页面，请检查页面名称！-------------------'
    )

  return {
    [npm_config_page]: path.resolve(
      __dirname,
      `src/Project/${npm_config_page}/index.html`
    )
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, `./src/Project/${npm_config_page}`),
  base: '/',
  envDir: path.resolve(__dirname), //用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    }),
    autoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: path.resolve(__dirname, './auto-import.d.ts'),
      eslintrc: {
        // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
        enabled: false,
        // 生成文件地址和名称
        filepath: path.resolve(__dirname, './.eslintrc-auto-import.json'),
        globalsPropValue: true
      }
    }),
    visualizer(),
    // gzip格式
    compression({
      threshold: 1024 * 500, // 体积大于 threshold 才会被压缩,单位 b
      ext: '.gz', // 压缩文件格式
      deleteOriginFile: false // 是否删除源文件
    })
    // br格式
    // compression({
    //   threshold: 1024 * 500,    // 体积大于 threshold 才会被压缩,单位 b
    //   ext: '.br',
    //   algorithm: 'brotliCompress',
    //   deleteOriginFile: false
    // })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@Project': path.join(__dirname, './src/Project')
    }
  },
  build: {
    outDir: path.resolve(__dirname, `dist/${npm_config_page}`), // 指定输出路径
    assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求
    emptyOutDir: true, //Vite 会在构建时清空该目录
    rollupOptions: {
      input: getEnterPages(),
      output: {
        assetFileNames: '[ext]/[name]-[hash].[ext]',
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        compact: true,
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString() // 拆分多个vendors
          }
        }
      }
    }
  },
  server: {
    host: 'localhost', // 指定服务器主机名
    port: 8880, // 指定服务器端口
    hmr: true,
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    https: false // 是否开启 https
  }
})
