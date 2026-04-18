# 📝 Notes App

A Notion-inspired notes app built with vanilla HTML, CSS, and JavaScript. This is **version 1** — a working prototype before migrating to React.

---

## Features

### Pages

- Create new pages
- View all pages in the sidebar
- Click a page to load its content
- Auto-save content while typing
- Rename pages inline

### Editor

- Emoji icon per page
- Insert images into the editor
- Bold and italic text formatting
- Increase and decrease font size
- Font options: Montserrat (default), sans-serif, monospace
- Export page as PDF
- Export page as CSV
- AI-powered content summariser

### Skipped in v1 (coming in v2)

- ~~Light and dark theme~~
- ~~User account panel~~

---

## Tech stack

|         |                                                                             |
| ------- | --------------------------------------------------------------------------- |
| Markup  | HTML5                                                                       |
| Styling | CSS3 (custom properties, flexbox)                                           |
| Logic   | Vanilla JavaScript (ES6+)                                                   |
| Storage | localStorage (no backend yet)                                               |
| Font    | [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts |

---

## Getting started

No install needed. Just clone and open.

```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
open index.html
```

Or drag `index.html` into your browser.

---

## Project structure

```
notes-app/
├── index.html       # App shell and layout
├── style.css        # All styles
└── app.js           # All logic (pages, editor, save/load)
```

---

## Roadmap

### v1 — current (HTML/CSS/JS)

- [x] Page create, rename, delete
- [x] Sidebar with page list
- [x] Rich text formatting (bold, italic, font size, font family)
- [x] Image insertion
- [x] Auto-save to localStorage
- [x] Export as PDF and CSV
- [x] AI summariser

### v2 — React rewrite (post-deploy)

- [ ] React + Next.js frontend
- [ ] Supabase for auth and database
- [ ] Dark mode
- [ ] User accounts
- [ ] Real-time collaboration
- [ ] Deployed on Vercel

---

## License

MIT
