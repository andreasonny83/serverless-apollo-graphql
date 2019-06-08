.PHONY: start \
	stop \
	clean

start:
	docker-compose up

stop:
	docker-compose stop

clean:
	rm -rf lambda
