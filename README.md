# Rapport-app

Den här koden innehåller en minimal React-applikation som byggs med Vite och Tailwind CSS.

## Struktur

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

## API-klient

`src/api/client.js` skapar en Axios-klient med basadress `https://api.dindoman.se`. Den lägger till en interceptor som automatiskt bifogar en bearer-token från `localStorage` till varje begäran.

## Utveckling

Installera beroenden och starta utvecklingsservern:

```bash
npm install
npm run dev
```

För att bygga projektet kör:

```bash
npm run build
```
