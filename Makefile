build:
	docker build -t keep-track-api  .

run:
	docker run -it -p 4000:4000 keep-track-api
