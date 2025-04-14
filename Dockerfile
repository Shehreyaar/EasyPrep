# stage: base
FROM node:22.13.0 AS base
WORKDIR /app

# stage: frontend-base
FROM base AS frontend-base
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --omit dev
COPY frontend/ . 

# stage: frontend-final
FROM frontend-base AS frontend-final
EXPOSE 5173
CMD ["npm", "run", "dev"]

# stage: backend-base
FROM base AS backend-base
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit dev
COPY backend/ .

# stage: backend-final
FROM backend-base AS backend-final
EXPOSE 3000
CMD ["npm", "start"]
