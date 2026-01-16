# USTP CI/CD Final Exam

A demonstration of CI/CD best practices and GitHub Actions workflows using a Tetris web application.

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

## 📊 Code Coverage

The optional code coverage was implemented using codecov.io. For this, there is a token needed, called `CODECOV_TOKEN`. This was configured in the GitHub UI under `Settings` > `Secrets and Variables` > `Actions`.

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Build Instructions
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
