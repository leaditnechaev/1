# Чат-лендинг агентства недвижимости «Формула»

Production-ready Next.js проект для чат-лендинга, где пользователь сразу попадает в открытую воронку подбора квартир в Тюмени. Чат собирает ответы, удобный канал связи, телефон, UTM-метки и отправляет лид в Bitrix24.

## Стек

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zod
- clsx

## Установка

```bash
npm install
```

## Локальный запуск

```bash
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Переменные окружения

Создайте `.env.local` на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните:

- `BITRIX_WEBHOOK_URL` - входящий webhook Bitrix24. Можно указать полный URL метода `crm.lead.add.json` или базовый webhook вида `https://portal.bitrix24.ru/rest/1/code`.
- `BITRIX_SOURCE_ID` - источник лида в Bitrix24, по умолчанию `WEB`.
- `BITRIX_ASSIGNED_BY_ID` - опциональный id ответственного сотрудника.
- `NEXT_PUBLIC_SITE_URL` - публичный адрес сайта.

## Как подключить Bitrix24

1. В Bitrix24 откройте `Разработчикам` -> `Другое` -> `Входящий вебхук`.
2. Дайте вебхуку право `CRM`.
3. Скопируйте URL вебхука в `BITRIX_WEBHOOK_URL`.
4. Если хотите назначать лиды на конкретного менеджера, укажите его id в `BITRIX_ASSIGNED_BY_ID`.
5. Перезапустите приложение после изменения `.env.local`.

При отправке заявки создается лид через `crm.lead.add`.

Стандартные поля:

- `TITLE`
- `NAME`
- `PHONE`
- `SOURCE_ID`
- `SOURCE_DESCRIPTION`
- `COMMENTS`
- `UTM_SOURCE`
- `UTM_MEDIUM`
- `UTM_CAMPAIGN`
- `UTM_CONTENT`
- `UTM_TERM`

Все данные опроса гарантированно попадают в `COMMENTS`:

```text
Новая заявка с чат-лендинга "Формула"

Имя: ...
Телефон: ...
Планировка: ...
Способ покупки: ...
Бюджет: ...
Куда направить: ...

UTM:
source: ...
medium: ...
campaign: ...
content: ...
term: ...
gclid: ...
yclid: ...

Дополнительно:
referrer: ...
path: ...
timestamp: ...
```

## Custom fields Bitrix24

Если в Bitrix24 созданы пользовательские поля лида, их можно заполнить отдельно. Укажите коды полей в `.env.local`:

- `BITRIX_FIELD_LAYOUT`
- `BITRIX_FIELD_PURCHASE_METHOD`
- `BITRIX_FIELD_BUDGET`
- `BITRIX_FIELD_CONTACT_METHOD`
- `BITRIX_FIELD_GCLID`
- `BITRIX_FIELD_YCLID`
- `BITRIX_FIELD_REFERRER`
- `BITRIX_FIELD_LANDING_PATH`
- `BITRIX_FIELD_USER_AGENT`

Пример:

```env
BITRIX_FIELD_LAYOUT=UF_CRM_1234567890
BITRIX_FIELD_CONTACT_METHOD=UF_CRM_1234567891
```

Даже если custom fields не заполнены, все ответы уже есть в `COMMENTS`.

## Где менять сценарий

Основная воронка лежит в `lib/chat-flow.ts`.

Там можно менять:

- стартовые сообщения;
- шаги;
- быстрые ответы;
- тексты вопросов;
- порядок шагов.

Если добавляете новое поле заявки, обновите также:

- `lib/types.ts`;
- `lib/validation.ts`;
- `lib/format.ts`;
- `lib/bitrix.ts`.

## Как работает сценарий

Чат работает как строгая кнопочная воронка:

- на первых шагах пользователь выбирает только готовые варианты;
- свободное текстовое поле скрыто;
- поле ввода появляется только на шаге телефона;
- после телефона заявка отправляется в `/api/lead`.

## Защита и валидация

Реализовано:

- валидация и нормализация телефона к виду `79999999999`;
- защита от пустых сообщений;
- защита от двойного сабмита на клиенте;
- honeypot-поле;
- тайминг-проверка отправки;
- простой in-memory rate limit для `/api/lead`.

## UTM и метаданные

На первой загрузке сохраняются в `sessionStorage`:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `gclid`;
- `yclid`;
- `referrer`;
- `landing path`;
- `timestamp`;
- `user agent`.

Эти данные добавляются к заявке при отправке.

## Проверка перед деплоем

```bash
npm run typecheck
npm run build
```

## Деплой на Netlify

Проект подготовлен для Netlify через `netlify.toml`.

Настройки сборки:

- Build command: `npm run build`
- Publish directory: `.next`
- Node.js: `20`

Важно: не используйте drag-and-drop загрузку статической папки. В проекте есть Next.js route handler `/api/lead`, поэтому нужен полноценный deploy через Git/Netlify build.

Шаги:

1. Загрузите проект в GitHub.
2. В Netlify нажмите `Add new site` -> `Import an existing project`.
3. Выберите GitHub-репозиторий с проектом.
4. Netlify подтянет настройки из `netlify.toml`.
5. В `Site configuration` -> `Environment variables` добавьте переменные из `.env.example`.
6. Для серверных переменных включите scopes `Builds` и `Functions`, если Netlify попросит выбрать область действия.
7. Запустите deploy.

Минимально нужны:

- `BITRIX_WEBHOOK_URL`
- `NEXT_PUBLIC_SITE_URL`

После подключения своего домена обновите:

- `NEXT_PUBLIC_SITE_URL=https://ваш-домен`

И сделайте новый deploy.

## Деплой на обычный Node.js-хостинг

Также можно деплоить на любой Node.js-хостинг:

```bash
npm run build
npm run start
```

## Структура

```text
app/
  api/
    lead/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  chat/
    ChatInput.tsx
    ChatMessage.tsx
    ChatShell.tsx
    QuickReplies.tsx
    ThankYouPanel.tsx
    TypingIndicator.tsx
    useChatController.ts
lib/
  bitrix.ts
  chat-flow.ts
  format.ts
  rate-limit.ts
  types.ts
  utm.ts
  validation.ts
```
