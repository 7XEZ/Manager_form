import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Импортируем плагин Vue

export default defineConfig({
  plugins: [vue()], // Добавляем его в массив плагинов
  // Если у вас есть другие настройки, добавьте их здесь
  // напр., resolve: { alias: { '@': '/src' } } для использования @ в путях
});