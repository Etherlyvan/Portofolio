FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG SITE_URL=http://localhost:8080
ARG KARI_ENABLED=false
ARG KARI_WIDGET_URL=/kari/embed.js
ARG KARI_API_BASE=/kari/api
ARG KARI_SITE_ID=portfolio
ENV SITE_URL=$SITE_URL
ENV KARI_ENABLED=$KARI_ENABLED KARI_WIDGET_URL=$KARI_WIDGET_URL KARI_API_BASE=$KARI_API_BASE KARI_SITE_ID=$KARI_SITE_ID
ENV ASTRO_TELEMETRY_DISABLED=1
RUN npm run check && npm run build

FROM nginx:stable-alpine@sha256:0985e772fb9f729e6fa0980da05fca5d9c468e870eed43071545afa9d2e27d94 AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
