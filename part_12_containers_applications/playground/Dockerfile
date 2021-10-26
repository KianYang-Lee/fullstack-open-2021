FROM node:16

WORKDIR /usr/src/app

# Copy the application with a non-root user
COPY --chown=node:node . .

RUN npm ci

ENV DEBUG=playground:*

CMD npm start