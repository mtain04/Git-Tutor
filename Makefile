CMD=git-tutor

all: build link run

run:
	${CMD}

link:
	pnpm link --global

build:
	pnpm build

clean:
	pnpm clean

.PHONY: all run link build clean
