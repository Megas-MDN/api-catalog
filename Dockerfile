FROM node:22.13.1-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma

RUN npm install -g npm@11.1.0
RUN npm install -g tsc

RUN npm ci --only=production && \
    npx prisma generate

COPY . .

RUN npm run build

FROM node:22.13.1-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./
COPY public ./public

EXPOSE 3001

ENTRYPOINT [ "sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm start" ]
