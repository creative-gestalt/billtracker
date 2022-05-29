FROM node:lts-alpine as build-stage
WORKDIR /bt_back
COPY package.json ./
RUN npm set progress=false && npm install
COPY . .
RUN npm run build

FROM node:lts-alpine as prod-stage
COPY --from=build-stage /bt_back/dist /bt_back/dist
COPY --from=build-stage /bt_back/node_modules /bt_back/node_modules