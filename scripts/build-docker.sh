#!/bin/bash

echo "🐳 Building Git-Tutor Docker image..."

# Build the Docker image
docker build -t git-tutor:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image 'git-tutor:latest' built successfully!"
    echo "🎓 You can now run git-tutor to start practicing!"
else
    echo "❌ Failed to build Docker image try to launch docker desktop"
    exit 1
fi
