CMD=git-tutor

all: build run

run:
	${CMD}

link:
	pnpm link --global

build:
	pnpm build

clean:
	pnpm clean

.PHONY: all run link build clean
