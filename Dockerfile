FROM node:alpine

WORKDIR /mnt/user/appdata/NitradoStatus/

COPY . .

RUN npm i
RUN npm install mariadb request discord.js @discordjs/builders @discordjs/rest discord-api-types
RUN npm list

CMD ["node", "index.js"]
