# Sierra Karakol — веб-платформа

Монорепозиторий: **Next.js (App Router)** + **NestJS** + **PostgreSQL**.

## Быстрый старт

### 1. База данных в Docker

Из **корня репозитория** (где лежит `docker-compose.yml`):

```bash
docker compose up -d
```

Параметры совпадают с `backend/.env.example`: пользователь `sierra`, пароль `sierra_secret`, БД `sierra_karakol`. С **хоста** подключайтесь на порт **5433** (в контейнере по-прежнему 5432), чтобы не конфликтовать с другим PostgreSQL, который часто уже занимает **5432**.

Если при `docker compose up` видите `port is already allocated` для **5433**, поменяйте в `docker-compose.yml` строку портов, например на `'5434:5432'`, и выставьте тот же порт в `backend/.env` как `DATABASE_PORT`.

- Проверка: `docker compose ps` — контейнер `sierra-karakol-db` должен быть `healthy`.
- Остановка: `docker compose down` (данные в volume **сохраняются**).
- Удалить данные полностью: `docker compose down -v`.

Опционально один раз применить DDL вручную (если отключите `synchronize` у TypeORM):

```bash
docker exec -i sierra-karakol-db psql -U sierra -d sierra_karakol < backend/database/schema.sql
```

PowerShell (из корня проекта):

```powershell
Get-Content backend/database/schema.sql -Raw | docker exec -i sierra-karakol-db psql -U sierra -d sierra_karakol
```

В **dev** таблицы создаёт TypeORM `synchronize`, отдельный SQL не обязателен.

**Если NestJS тоже в Docker** (позже): в `.env` укажите `DATABASE_HOST=postgres` (имя сервиса из compose), не `localhost`.

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

API: `http://localhost:4000/api`, health: `GET /api/health`.

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Сайт: `http://localhost:3000`. Укажите `NEXT_PUBLIC_API_URL=http://localhost:4000/api`.

**Скрытая админка:** в `frontend/.env.local` можно задать `ADMIN_PANEL_SLUG=ваш-секрет` — ссылка «Админ» в шапке отсутствует, прямой `/admin` вернёт 404. Открывайте `http://localhost:3000/ваш-секрет` (тот же UI, что `/admin`). Если переменная пустая — админка доступна по `/admin` (всё равно без пункта в меню).

Меню на сайте подгружается с API (`GET /api/menu`); правки в админке → вкладка «Меню».

**Если в dev 500, `Cannot find module './NNN.js'`, `SegmentViewNode`, `0.pack.gz ENOENT`:**

1. Запускайте **`npm run dev`** или **`npm run dev:fresh`** из папки `frontend` (не голый `next dev` — нужен **Turbopack** по умолчанию).
2. **`npm run clean`** и снова **`npm run dev`**.
3. Проект в **OneDrive/Desktop** часто ломает кэш `.next`; по возможности перенесите репозиторий в обычную папку (например `C:\dev\sierra`) или исключите папку `.next` из синхронизации.
4. Режим только Webpack: **`npm run dev:webpack`** — в `next.config` для dev отключён persistent webpack cache, чтобы реже ловить битые чанки.

### Интеграции

- **Telegram:** бронь отеля, коворкинг и лиды уходят в один чат — `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` в `backend/.env`
- **Админ:** `ADMIN_API_KEY` + страница `/admin`

В production отключите `synchronize` у TypeORM и используйте миграции.
