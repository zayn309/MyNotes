# MyNotes

A full-stack notes app with a **Django REST Framework** API and a **React** frontend. You can create, view, edit, search, and delete notes. CORS is handled with `django-cors-headers`.

## Tech stack

- **Backend:** Python, Django, Django REST Framework, SQLite
- **Frontend:** React 18, React Router, Material UI
- **Deployment:** Railway config included (`railway.json`)

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/` | List available routes |
| GET | `/api/notes/` | Get all notes |
| GET | `/api/notes/<id>/` | Get a single note |
| POST | `/api/note/create/` | Create a note (`{"body": "..."}`) |
| PUT | `/api/notes/<id>/update/` | Update a note |
| DELETE | `/api/notes/<id>/delete/` | Delete a note |

## Getting started

### Backend

```bash
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

The API runs at `http://127.0.0.1:8000/`. `migrate` creates a fresh local SQLite database.

### Frontend

```bash
cd frontend
npm install
npm start
```

The React app proxies API requests to the Django server on port 8000.

## Project structure

```
├── api/              # Django app: Note model, serializers, views, URLs
├── mynote_backend/   # Django project settings
├── frontend/         # React app (pages: notes list, single note)
└── manage.py
```

## License

[MIT](LICENSE)
