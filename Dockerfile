FROM docker-registry.vslinko.xyz/vslinko/nodejs:latest
RUN mkdir /500albums
ADD ./package.json ./package-lock.json /500albums
WORKDIR /500albums
RUN npm ci
ADD ./images /500albums/images
ADD ./500albums.json ./template.html ./index.mjs /500albums
EXPOSE 8080/tcp
ENTRYPOINT ["node", "index.mjs"]
