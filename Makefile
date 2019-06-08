.PHONY: start \
	stop \
	clean \
	build

start:
	docker-compose up

build:
	docker-compose build

stop:
	docker-compose stop

clean:
	rm -rf lambda
