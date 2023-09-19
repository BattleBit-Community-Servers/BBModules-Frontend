FROM node:20 AS builder
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build

FROM ghcr.io/thedevminertv/gostatic:1.2.2
CMD ["--compress-level", "2", "--spa"]

COPY --from=builder /build/dist /static
