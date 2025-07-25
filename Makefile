CMD=git-tutor

all: build docker run

run:
	${CMD}

link:
	pnpm link --global

build:
	pnpm build

test:
	pnpm test

test-coverage:
	pnpm test:coverage

docker:
	./scripts/build-docker.sh

clean:
	pnpm clean
	docker rmi git-tutor:latest 2>/dev/null || true

.PHONY: all run link build docker clean
