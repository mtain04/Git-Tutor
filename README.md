# 🧠 GitTutor

**GitTutor** is an open source interactive CLI for practicing Git through hands-on exercises, executed in isolated environments using Docker.

<p align="center">
  <img src="https://img.shields.io/badge/Educational-Tool-brightgreen?style=for-the-badge&logo=graduation-cap&logoColor=white" alt="Educational">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Coverage-15.45%25-red?style=for-the-badge&logo=vitest&logoColor=white" alt="Code Coverage">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220" alt="PNPM">
  <img src="https://img.shields.io/badge/CLI-4D4D4D?style=for-the-badge&logo=windows-terminal&logoColor=white" alt="CLI">
  <img src="https://img.shields.io/badge/Open%20Source-%23FF6B6B.svg?style=for-the-badge&logo=github&logoColor=white" alt="Open Source">
</p>

## 🚀 Goal

Enable junior developers to learn and master Git through realistic and guided scenarios: `init`, `commit`, `merge`, `rebase`, `conflicts`, `stash`, etc.
Each exercise is isolated in a **Docker container**, to avoid any interference with your local environment.

---

## ✨ Features

- 🔄 In comming

---

## 📁 Project Structure

```
Git-Tutor/
├── docs/
│   └──LIBRARY.md # Library resume
├── src/
│   ├── main.ts # Entrée principale de la CLI
│   └── menu.ts # Main menu to select exercice
├── exercises/
│   └── init-commit/
│       ├── setup.ts # Prépare l’environnement de l’exercice
│       ├── validate.ts # Valide les actions de l’utilisateur
│       └── meta.json # Métadonnées de l’exercice
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ How does it work?

1. **Start the CLI:**

```bash
git-tutor
```

2. **Choose an exercise** from the interactive menu

3. The CLI:

   - creates a workspace `workspaces/<exo>`
   - launches an isolated Docker container with Git
   - runs `setup.ts` in this container to initialize the repository

4. **The user enters the container** to complete the exercise:

```bash
docker exec -it git-tutor-<exo> sh
```

5. Once finished, they run **validation** via the CLI

6. `validate.ts` automatically checks the state of the repository

---

## 🐳 Docker & Environment

Each exercise is run in a Docker container:

- Local volume mounted in `/workspace/<exo>`
- Custom image with Git + Node.js + CLI
- Disposable, controlled, and reproducible environment

### 📦 Example of manual launch:

```bash
docker run -dit \
 --name git-tutor-init-commit \
 -v $(pwd)/workspace/init-commit:/workspace \
 git-tutor-image
```

---

## 📦 Installation and Development

### 🔧 Setup:

```bash
pnpm install
pnpm build
pnpm link --global
```

### 👨‍💻 Development launch:

```bash
pnpm build
# or
make
```

---

## 📝 License

This project is under the **MIT** license.

---

## ❤️ Contribute

Contributions are welcome!
Propose an exercise, improve the validation system, or add an advanced mode.
Fork, PR, review: everything is appreciated.
