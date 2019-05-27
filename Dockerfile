FROM node:10.15.0

ARG REACT_APP_ENV
ENV REACT_APP_ENV ${REACT_APP_ENV}

ADD package.json /sound-chat-client/package.json
ADD package-lock.json /sound-chat-client/package-lock.json

WORKDIR /sound-chat-client

RUN npm install

COPY . /sound-chat-client

RUN npm run build 

CMD node server.js