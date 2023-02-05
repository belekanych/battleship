DC=docker-compose
DC_EXEC=$(DC) exec
APP=$(DC_EXEC) battleship-app
SERVER=$(DC_EXEC) battleship-server
APP_NPM=$(APP) npm run
SERVER_NPM=$(SERVER) npm run

env:
	cp app/.env.example app/.env && cp server/.env.example server/.env

start:
	$(DC) up -d

stop:
	$(DC) stop

app-ssh:
	$(APP) sh

server-ssh:
	$(SERVER) sh

install:
	$(APP) npm install && $(SERVER) npm install

server-start:
	$(SERVER_NPM) start

app-dev:
	$(APP_NPM) dev
