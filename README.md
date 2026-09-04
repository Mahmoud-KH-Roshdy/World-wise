# Notes App

A simple notes app I built to practice full-stack patterns in React — auth, real-time data, and a UI that actually works well on mobile.

You can sign up, write notes, edit them, delete them, and everything stays in sync with Firestore.

🔗 **Live demo:** [note-app-tau-opal.vercel.app](https://note-app-tau-opal.vercel.app)

## What it does

- Full auth flow — sign up, login, logout, delete account (and yes, deleting your account actually deletes your notes too, not just the auth entry)
- Create, read, update, delete notes — all synced with Firestore in real time
- Each note has its own URL (`/note/:id`), so you can bookmark or share a link straight to a specific note
- Responsive — on mobile it behaves like a real app: the notes list and the editor don't fight for space, they take turns
- Toast notifications for pretty much everything (create, update, delete, errors)
- Empty states instead of a blank white screen when you have zero notes

## Stack

- **React** + **TypeScript**
- **React Router** — URL-driven state, not local state pretending to be routing
- **TanStack Query** — for fetching/caching notes and handling mutations
- **React Hook Form** — form handling + validation
- **Firebase** — Auth + Firestore
- **Tailwind CSS**

## Running it locally

```bash
git clone https://github.com/Mahmoud-KH-Roshdy/Note-app.git
cd Note-app
npm install
npm run dev
```

You'll need your own Firebase project — create one, enable Auth (email/password) and Firestore, then drop your config into `src/services/firebase.ts`.

## Notes to self / things I learned building this

- Spent way too long debugging a race condition between a form and a query that wasn't done loading yet — turns out the fix wasn't `reset()`, it was just not rendering the form until the data was actually there.
- Switched from storing "the active note" in Context to reading it straight from the URL. Refresh-proof, shareable, way less state to keep in sync.

## Coming soon

- Search
- Arabic/English toggle
