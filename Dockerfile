FROM node:12

USER root

RUN mkdir -p /home/node/app
RUN chown root:root /home/node/app

COPY --chown=root:root ./dist /home/node/app/dist
COPY --chown=root:root ./node_modules /home/node/app/node_modules

WORKDIR /home/node/app

#CMD ["node", "--max-old-space-size=2048", "dist/main.js"]
CMD ["node", "dist/main.js"]
