# USTP CI/CD Final Exam

![Build and Test](https://github.com/frvnzz/ustp-cicd-final/actions/workflows/build.yml/badge.svg?event=push)
![Release](https://github.com/frvnzz/ustp-cicd-final/actions/workflows/release.yml/badge.svg)
![Publish to GitHub Pages](https://github.com/frvnzz/ustp-cicd-final/actions/workflows/publish.yml/badge.svg)
[![codecov](https://codecov.io/gh/frvnzz/ustp-cicd-final/branch/main/graph/badge.svg)](https://codecov.io/gh/frvnzz/ustp-cicd-final)

A demonstration of CI/CD best practices and GitHub Actions workflows using a Tetris web application.

## 🌐 Live Application

**GitHub Pages:** [https://frvnzz.github.io/ustp-cicd-final/](https://frvnzz.github.io/ustp-cicd-final/)

## 🎯 Project Purpose

This repository demonstrates comprehensive CI/CD workflows and GitHub repository management, including:

- ✅ Automated build and test pipelines
- ✅ Multi-OS testing matrix (Windows & Ubuntu)
- ✅ Build artifact management
- ✅ Automated GitHub Pages deployment
- ✅ Semantic versioning and automated releases
- ✅ Dependabot dependency management
- ✅ Branch protection rules and CODEOWNERS
- ✅ Markdown spell checking
- ✅ Pull request workflows with squash merging
- ✅ Code coverage reporting

## 🛠️ Local Development

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm (comes with Node.js)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/frvnzz/ustp-cicd-final.git
   cd ustp-cicd-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Production files will be generated in the `dist/` directory

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Testing

**Run all tests**
```bash
npm test
```

**Run tests in watch mode**
```bash
npm run test:watch
```

**Run tests with UI**
```bash
npm run test:ui
```

**Generate coverage report**
```bash
npm run test:coverage
```
Coverage reports will be generated in the `coverage/` directory

### Linting

```bash
npm run lint
```

## 📊 Code Coverage

Code coverage is automatically tracked using [Codecov](https://codecov.io). Coverage reports are generated on every push and pull request to the main branch.

The `CODECOV_TOKEN` is configured in GitHub repository settings under `Settings` > `Secrets and Variables` > `Actions`.

## 🚀 CI/CD Workflows

### Build and Test
- Triggers on push and pull requests to main/master branches
- Runs on Ubuntu and Windows
- Executes tests and generates coverage reports
- Uploads build artifacts

### Release and Tag
- Triggers when a tag matching `vX.X.X` is pushed
- Automatically creates a GitHub release with:
  - Release title: "USTP CI/CD Tetris vX.X.X"
  - Build artifacts (zip and tar.gz)
  - Auto-generated release notes

### Publish to GitHub Pages
- Manual workflow dispatch
- Deploys the application to GitHub Pages

## 📦 Dependabot

Dependabot is configured to check for dependency updates weekly and create grouped pull requests for:
- npm dependencies (production and development)
- GitHub Actions versions

## 👥 CODEOWNERS

Changes to workflow files (`.github/workflows/`) automatically request review from `@frvnzz`.

## 📝 License

See [LICENSE](LICENSE) file for details.
