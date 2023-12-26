build:
	docker build -t keep-track-api  .

run:
	docker run -it -p 4000:4000 --name keep-track-api-container keep-track-api

stop:
	docker stop keep-track-api-container
	docker rm keep-track-api-container
