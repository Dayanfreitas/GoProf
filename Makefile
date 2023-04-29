all:
	echo "hello"

run-migrate:
	docker exec goprof-back npx knex migrate:latest

back-install:
	docker exec goprof-back npm install

back-bash:
	docker exec -u node -it goprof-back /bin/sh

front-install:
	docker exec goprof-front yarn

front-start:
	docker exec goprof-front yarn start

front-bash:
	cd front && rm -rf node_modules &&
	docker exec -it goprof-front /bin/sh