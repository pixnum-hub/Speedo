# 🚀 Speedometer PWA — Deployment Guide
© Manik Roy 2026. All Rights Reserved.

## Transport Modes (16)
🚶 Walk · 🚌 Bus · 🚂 Train · ✈️ Plane · 🛳️ Ship · 🚗 Car
🚲 Rickshaw · 🛺 Auto · ⛴️ Ferry · 🏍️ Motorbike · 🚴 Bicycle
🏃 Jogging · 🏃‍♂️ Running · 🚀 Spacecraft

## File Structure
```
speedometer-pwa/
├── index.html        ← Main app (all CSS + JS inline)
├── manifest.json     ← PWA manifest (icons, shortcuts, metadata)
├── sw.js             ← Service worker (offline + smart caching)
├── README.md         ← This file
└── icons/
    ├── icon-192.svg  ← App icon 192×192
    └── icon-512.svg  ← App icon 512×512
```

## Deployment Requirements
- **HTTPS is mandatory** — PWA install, GPS, Wake Lock & Service Workers require HTTPS
- **Same origin** — all files must be served from the same domain

## Deploy Options

### Option A — Netlify (Free, drag & drop — recommended)
1. Go to https://app.netlify.com/drop
2. Drag the entire `speedometer-pwa/` folder onto the page
3. Live in seconds with HTTPS ✅

### Option B — GitHub Pages (Free, HTTPS automatic)
1. Create a new GitHub repo (e.g. `speedometer`)
2. Upload all files maintaining the folder structure
3. Settings → Pages → Source: `main` branch, `/ (root)`
4. Live at `https://yourusername.github.io/speedometer`

### Option C — Vercel (Free)
```bash
npm i -g vercel
cd speedometer-pwa
vercel
```

### Option D — Any Static Host
Upload all files to your web host's `public_html/` folder over HTTPS.

## PWA Features
| Feature           | Requires            | Status   |
|-------------------|---------------------|----------|
| Install to home   | HTTPS               | ✅ Auto  |
| Offline use       | Service Worker      | ✅ Auto  |
| Wake Lock         | HTTPS + Chrome      | ✅ Auto  |
| GPS Speed         | HTTPS + permission  | ✅ Auto  |
| Fullscreen        | Any                 | ✅ Auto  |
| Share trip        | Mobile browser      | ✅ Auto  |
| Speed limit alert | Any                 | ✅ Auto  |
| Audio beep        | Any                 | ✅ Auto  |
| Vibration         | Mobile              | ✅ Auto  |

## Browser Support
| Browser          | Install | Offline | GPS |
|------------------|---------|---------|-----|
| Chrome Android   | ✅      | ✅      | ✅  |
| Chrome Desktop   | ✅      | ✅      | ✅  |
| Safari iOS       | ✅*     | ✅      | ✅  |
| Firefox          | ❌      | ✅      | ✅  |
| Edge             | ✅      | ✅      | ✅  |

*Safari: use "Add to Home Screen" from the share menu

## Updating
When you update `index.html`, bump the cache version in `sw.js`:
```js
const CACHE_NAME = 'speedometer-v4'; // increment each update
```
