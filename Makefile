CMD=git-tutor

all: build docker run

list:
	@echo "📋 Available make commands:"
	@echo "  all           - 🔨 Build, create Docker image, and run the application"
	@echo "  run           - 🚀 Run the git-tutor application"
	@echo "  link          - 🔗 Link the package globally using pnpm"
	@echo "  build         - 🏗️  Build the project using pnpm"
	@echo "  test          - 🧪 Run tests using pnpm"
	@echo "  test-coverage - 📊 Run tests with coverage report"
	@echo "  docker        - 🐳 Build Docker image using build script"
	@echo "  clean         - 🧹 Clean build artifacts and remove Docker image"
	@echo "  list          - ❓ Show this help message"

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
