import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import path from "path";

const env = loadEnv("development", "./");

console.log(env);
console.log(env.VITE_API_URL);
// https://vitejs.dev/config/
export default defineConfig(({mode}) => (
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
        },
      }
    },
    // 配置别名
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      drop: mode === "production" ? ["console", "debugger"] : [],  // 生产环境移除console和debugger
    },
    // 配置打包输出
    build: {
      outDir: "dist", // 输出目录
      assetsDir: "assets", // 静态资源目录
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
        },
      },
    },
  }
));
