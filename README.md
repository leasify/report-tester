# Report App

This repository contains a minimal React application built with Vite and Tailwind CSS.

## Structure

```
report-tester/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── api/
    │   ├── auth.js
    │   └── client.js
    └── components/
        ├── LoginForm.jsx
        ├── ReportForm.jsx
        └── ReportList.jsx
```

## API client

`src/api/client.js` creates an Axios client. By default it targets the Leasify
production API (`https://app.leasify.se/api/v3`), but the base URL can be
overridden by setting the environment variable `VITE_API_BASE_URL`. Vite will
pick up this value from your shell or an `.env` file at the project root. The
client also installs an interceptor that automatically attaches a bearer token
from `localStorage` to every request.

## Environment variables

The application reads configuration from Vite environment variables. To change
the API base URL, define `VITE_API_BASE_URL` before running the dev server or
build. Create an `.env` file in the project root or export the variable in your
shell:

```bash
# .env
VITE_API_BASE_URL=https://my-api.example.com/api/v3
```

When undefined, the client will default to Leasify's production API.

## Authentication

Logga in med e-postadress och lösenord mot `/login`-endpointen. Svaret
innehåller en token som ska sparas i `localStorage` under nyckeln
`token`. Axios-klienten läser automatiskt detta värde och skickar det som
`Bearer` i `Authorization`-headern för alla efterföljande anrop.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

To build the project run:

```bash
npm run build
```
