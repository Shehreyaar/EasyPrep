FROM node:22.13.0 AS base
WORKDIR /easyprep-main

FROM base AS frontend-base
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install --omit-dev
COPY frontend/vite.config.js .
COPY frontend/index.html .
COPY frontend/eslint.config.js .
COPY frontend/public/Images ./public/Images
COPY frontend/src ./src

FROM frontend-base AS frontend-build
RUN npm run build

FROM base AS final
ENV NODE_ENV=production
COPY backend/package.json .
COPY backend/package-lock.json .
RUN npm install --omit-dev
COPY backend/httpServer.js ./src/
COPY backend/firebaseAuthMiddleware.js ./src/
COPY --from=frontend-build /easyprep-main/dist ./src/static
EXPOSE 3000

CMD [ "node", "src/httpServer.js" ]
