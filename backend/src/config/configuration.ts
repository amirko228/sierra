export default () => ({
  port: parseInt(process.env.PORT ?? '4000', 10),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    user: process.env.DATABASE_USER ?? 'sierra',
    password: process.env.DATABASE_PASSWORD ?? 'sierra_secret',
    name: process.env.DATABASE_NAME ?? 'sierra_karakol',
  },
  admin: {
    apiKey: process.env.ADMIN_API_KEY ?? '',
  },
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN ?? '',
    chatId: process.env.TELEGRAM_CHAT_ID ?? '',
  },
});
