export default defineConfig({
  site: 'https://mausam-2.onrender.com',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
