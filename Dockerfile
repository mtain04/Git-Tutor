FROM alpine:latest

RUN apk add --no-cache \
    git \
    bash \
    vim \
    nano \
    tree

WORKDIR /workspace

RUN git config --global user.name "GitTutor Student" && \
    git config --global user.email "student@git-tutor.dev" && \
    git config --global init.defaultBranch main

# Shell configuration with custom prompt (thanks AI)
RUN echo 'export PS1="🧠 git-tutor:\w$ "' >> /root/.bashrc && \
    echo 'echo "🎓 Welcome to GitTutor practice environment!"' >> /root/.bashrc && \
    echo 'echo "You can now practice Git commands here."' >> /root/.bashrc && \
    echo 'echo "📁 Your workspace is mounted at /workspace"' >> /root/.bashrc

CMD ["/bin/bash"]
