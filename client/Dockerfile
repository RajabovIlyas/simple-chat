###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

ENV NODE_ENV=development
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
CMD ["npm", "run", "start"]





###################
# PRODUCTION
###################
FROM node:18-alpine As production

ENV NODE_ENV=production
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
RUN npm run build --prod
CMD ["npm", "run", "production"]