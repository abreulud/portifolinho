## Overview

Guitar Desktop is a web experience inspired by Windows 98, Windows XP and early-2000s desktops. It creates a separate environment for supporting guitar recordings while preserving the visual atmosphere of computers from that era.

The application does not record video itself. It organizes the camera, backing tracks and references on one screen, ready to be captured with an external screen recorder.

## Experience

- **Webcam:** requests browser permission and displays the camera without capturing audio.
- **Player:** accepts tracks selected by the user, creates a playlist and provides playback, volume and navigation controls.
- **Guitar Tabs:** opens a browser area for checking references during the session.
- **Setlist:** provides a notepad for organizing songs.
- **Appearance:** switches between retro themes, preset wallpapers or a custom image.
- **Desktop:** windows can be opened, focused, minimized, maximized and repositioned.

## Implementation decisions

The interface is divided into independent applications that share the desktop and window-management system. Desktop state is saved in `localStorage`, including visual preferences and session layout.

Selected audio and image files remain in the browser. The webcam is only activated after the user grants permission.

## Technologies

- React 19
- Vite
- JavaScript
- CSS
- MediaDevices API
- localStorage

## Run locally

```bash
npm install
npm run dev
```

The result combines a recording-support tool with a nostalgic interface, keeping each feature accessible as if it were a small system application.
