all:
	echo "hello"

run-migrate:
	docker exec goprof-back npx knex migrate:latest

back-install:
	docker exec goprof-back npm install

back-bash:
	docker exec -u node -it goprof-back /bin/sh

back-start-dev:
	docker exec -u node -it goprof-back yarn dev

front-install:
	docker exec goprof-front yarn

front-start:
	docker exec -u node goprof-front yarn start

front-bash:
	docker exec -u node -it goprof-front /bin/sh