# syntax=docker/dockerfile:1

FROM node:18-alpine AS builder

WORKDIR /app

# Adicionar esta COPY instrução antes de executar npm installou copiar o código do aplicativo permite que você aproveite o mecanismo de cache do Docker
COPY package*.json ./
COPY ./prisma ./prisma

RUN npm install 

COPY . .

RUN npm run build

FROM node:18-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]