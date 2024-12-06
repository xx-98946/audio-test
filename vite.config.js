import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // 目标服务器地址
        changeOrigin: true, // 是否改变请求头中的origin
        rewrite: (path) => path.replace(/^\/api/, ""), // 请求路径重写规则
      },
    },
  },
});
