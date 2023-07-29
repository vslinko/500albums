FROM docker-registry.vslinko.xyz/vslinko/nodejs:latest as builder
RUN mkdir /500albums
ADD ./package.json ./package-lock.json /500albums
WORKDIR /500albums
RUN npm ci

FROM docker-registry.vslinko.xyz/vslinko/nodejs:latest
ADD ./images /500albums/images
COPY --from=builder /500albums/node_modules /500albums/node_modules
ADD ./500albums.json ./template.html ./index.mjs /500albums
WORKDIR /500albums
EXPOSE 8080/tcp
ENTRYPOINT ["node", "index.mjs"]
