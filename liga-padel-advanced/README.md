Proyecto: Liga Pádel — Advanced (Roles, JWT, ELO) - JavaScript

Contenido:
- backend/: Node + Express + Mongoose + JWT + Joi + roles + admin endpoints
- frontend/: Vite + React, simple UI para login/register/ranking

Pasos para correr localmente:

1) Backend
  cd backend
  cp .env.example .env
  # editar .env y poner MONGO_URI y JWT_SECRET
  npm install
  npm run dev

2) Frontend
  cd frontend
  npm install
  npm run dev

Deploy recomendado:
- MongoDB Atlas (free)
- Render.com para backend
- Netlify / Vercel para frontend
