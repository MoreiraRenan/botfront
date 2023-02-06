FROM node:14.20-alpine AS quasar_build
WORKDIR /build
COPY package*.json ./
RUN apk add --update git python3 build-base gcc wget
COPY . LayoutsPortal
WORKDIR /build/LayoutsPortal
RUN rm -rf node_modules && \ 
    npm i -g @quasar/cli && npm i 
RUN npm run build && \
    mkdir ../public && \
    cp -rf dist/spa/* ../public/ 
WORKDIR /build
RUN rm -rf LayoutsPortal .git .gitmodules .nyc_output .tern-project

#spin nginx service
FROM nginx:1.19.2-alpine as production
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=quasar_build /build/public /app
EXPOSE 80
