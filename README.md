# ⚽ Lima FC — limApp

> Squad formation builder y gestor de partidos para Lima FC.  
> Progressive Web App (PWA) con sincronización en tiempo real, autenticación por rol y modo offline.

---

## 🚀 Demo

**[lima-fc.pages.dev](https://lima-fc.pages.dev)**

---

## ✨ Features

| Feature | Descripción |
|---|---|
| **Formation Builder** | Cancha interactiva con drag & drop de jugadores |
| **Historial de Partidos** | Registro completo con goles, camiseta, cancha y tipo de partido |
| **Goal Videos** | URLs de YouTube por gol (hasta 4 por partido) |
| **Stats del Plantel** | Partidos, goles y asistencias por jugador |
| **Rol DT** | Autenticación por PIN con acceso a edición completa |
| **Sync en Tiempo Real** | Firebase Realtime Database — todos los clientes sincronizados |
| **Offline Ready** | Service Worker con caché offline (lima-v33) |
| **Tipos de Partido** | AMISTOSO / TORNEO / COPA con chips visuales |
| **PWA Instalable** | Add to Home Screen en iOS y Android |

---

## 🏗️ Stack Tecnológico

- **Frontend:** HTML5 · CSS3 · JavaScript (Vanilla) — sin frameworks
- **Backend / Sync:** Firebase Realtime Database
- **Auth:** PIN-based (rol DT) + Firebase config
- **Analytics:** Google Analytics 4
- **Deployment:** Cloudflare Pages
- **Service Worker:** Cache-first con versioning automático

---

## 📁 Estructura del Proyecto

```
limapp/
├── index.html          # App completa (SPA en un solo archivo)
├── sw.js               # Service Worker — cache offline
├── manifest.json       # PWA manifest — instalación
├── _headers            # Headers HTTP (Cloudflare Pages)
├── icons/              # Íconos PWA (32, 180, 192, 512px)
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   └── icon-512.png
└── images/             # Fotos del plantel
    ├── dani.jpg
    ├── caba.jpg
    └── ...
```

---

## ⚙️ Versioning

| Variable | Valor actual |
|---|---|
| `APP_VERSION` | `29` |
| SW Cache | `lima-v33` |

El flujo de deploy bumps ambos valores y actualiza `lima/config/app_version` en Firebase para forzar auto-reload en todos los clientes conectados.

---

## 🚢 Deploy

La app se despliega en **Cloudflare Pages** desde este repositorio.

```bash
# 1. Hacer cambios en index.html / sw.js
# 2. Subir ZIP a Cloudflare Pages (drag & drop en el dashboard)
# 3. Actualizar firebase: lima/config/app_version = "<nueva_version>"
```

---

## 🛣️ Roadmap — limApp 2.0

La siguiente versión será una **app nativa multiplataforma** (iOS + Android):

- React Native + Expo SDK 52
- TypeScript estricto · Clean Architecture
- Firebase Auth (reemplaza PIN) + biometría FaceID/Huella
- Cloud Firestore + WatermelonDB (offline total)
- Push Notifications reales (convocatorias, resultados)
- Publicación en App Store + Google Play

> Ver documento de arquitectura completo: `limApp2_Arquitectura.docx`

---

## 🏆 Lima FC

Equipo de fútbol recreativo.  
Construido con ❤️ por el DT y el equipo.

---

*App Version 29 · SW Cache lima-v33 · Marzo 2026*
