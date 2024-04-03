FROM node

RUN mkdir -p /home/app

WORKDIR /home/app

EXPOSE 3005

CMD ["node", "index.js"]