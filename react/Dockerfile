#build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ARG PPIRL_API
ARG BLOOMFILTER_API
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_PPIRL_API=$PPIRL_API
ENV REACT_APP_BLOOMFILTER_API=$BLOOMFILTER_API
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g 
COPY . ./
RUN npm run build

#production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]