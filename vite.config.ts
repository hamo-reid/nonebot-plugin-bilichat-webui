import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

const env = loadEnv(process.env.NODE_ENV as string, "./");
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";


console.log(env);
// https://vitejs.dev/config/
export default defineConfig(() => (
  {
    base: env.VITE_BASE_URL, // 开发路径
    plugins: [
      vue()
    ],
    // 配置开发服务器
    server: {
      host: env.VITE_HOST, // 开发服务器地址
      port: Number(env.VITE_PORT), // 开发服务器端口
      open: true, // 启动浏览器
      proxy: {
        // 代理
        "/bilichatwebui": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/bilichatwebui/, "")
        },
      }
    },
    // 配置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      include: ["axios"]
    },
    // 配置打包输出
    build: {
      minify: "terser", // 是否压缩
      cssCodeSplit: true, // 是否分割css
      outDir: "dist", // 输出目录
      assetsDir: "assets", // 静态资源目录
      terserOptions: {
        compress: {
          // 是否压缩代码
          sequences: isProd,
          // 是否压缩参数
          arguments: isProd,
          // 是否删除console
          drop_console: isProd && ['log'],
          // 是否删除debugger
          drop_debugger: isProd,
          // 压缩次数
          passes: isProd ? 4 : 1,
          // 全局定义
          global_defs: {
            '@DEV': JSON.stringify(isDev),
            '@PROD': JSON.stringify(isProd),
          },
        },
        format: {
          // 是否使用分号
          semicolons: isProd,
          // 是否使用简写
          shorthand: isProd,
          // 是否使用大括号
          braces: !isProd,
          // 是否美化代码
          beautify: !isProd,
          // 是否保留注释
          comments: !isProd,
        },
        mangle: {
          // 是否压缩顶级作用域
          toplevel: isProd,
          // 是否压缩eval
          eval: isProd,
          // 是否保留类名
          keep_classnames: isDev,
          // 是否保留函数名
          keep_fnames: isDev,
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
          manualChunks(id){
            if(id.includes("node_modules/vue")){
              return "vue-vendor";
            } else if (id.includes("node_modules/naive-ui")){
              return "naive-ui-vendor";
            } else if (id.includes("node_modules/@lljj")) {
              return "vjsf-vendor"
            } else if(id.includes("node_modules/lodash")){
              return "lodash-vendor";
            } else if(id.includes("/utils")){
              return "utils";
            } else if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        },
      },
    },
  }
));
