FROM node:latest as build-step 

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install --save --legacy-peer-deps
RUN npm config set legacy-peer-deps true
RUN npm install
# RUN npm i angular-font-awesome
# RUN npm install --save font-awesome angular-font-awesome


COPY . /app

# RUN npm run build --prod
#qa || production
ARG configuration=qa

#RUN npm run build --configuration=production
RUN npm run build:$configuration

FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-step /app/dist/mf-reportsgds /usr/share/nginx/html 
CMD ["nginx", "-g", "daemon off;"]

# RUN rm -rf /usr/share/nginx/html/*

# CMD [ "nginx", "-g", "daemon off;"]
