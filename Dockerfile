FROM node:22-alpine AS build
WORKDIR /usr/src/app

COPY ./package*.json .
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build 

###
FROM nginx:1.29-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/learnee/* /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]