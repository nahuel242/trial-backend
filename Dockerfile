FROM node:12-alpine

RUN mkdir /app  && chown -R node /app
WORKDIR /app
COPY . .
USER node
RUN yarn
EXPOSE 3030

CMD [ "yarn", "start" ]