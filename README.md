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

`src/api/client.js` creates an Axios client with the base URL `https://app.leasify.se/api/v3`. It adds an interceptor that automatically attaches a bearer token from `localStorage` to every request.

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
