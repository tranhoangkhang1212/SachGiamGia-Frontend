FROM node:18

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

ARG API_ENDPOINT

ENV NEXT_PUBLIC_API_ENDPOINT=$API_ENDPOINT
ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_ENDPOINT
RUN echo "API_ENDPOINT: $NEXT_PUBLIC_API_ENDPOINT"

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]