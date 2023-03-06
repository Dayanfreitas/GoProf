all:
	echo "hello"

back-install:
	docker exec goprof-back npm install

back-bash:
	docker exec -it goprof-back /bin/sh

front-install:
	docker exec goprof-front yarn

front-start:
	docker exec goprof-front yarn start

front-bash:
	docker exec -it goprof-front /bin/sh