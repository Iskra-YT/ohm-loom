# Contributing to OhmLoom

First off, thank you for considering contributing to OhmLoom! It's people like you that make OhmLoom a great tool for everyone.

## How Can I Contribute?

### Reporting Bugs

- **Check if the bug is already reported** in the issues section.
- If not, **open a new issue**. Clearly describe the problem, steps to reproduce, and what you expected to happen.
- Include screenshots if possible.

### Suggesting Enhancements

- **Open a new issue** to discuss your idea.
- Provide a clear and concise description of the feature or improvement.
- Explain why this enhancement would be useful to other users.

### Pull Requests

1. **Fork the repository** and create your branch from `main`.
2. **If you've added code** that should be tested, add tests.
3. **Ensure the code is clean** and follows the existing style.
4. **Update the documentation** if you've added new features.
5. **Submit a pull request** with a clear description of your changes.

## Development Setup

1. Clone your fork of the repository.
2. Since OhmLoom uses native ES modules, you might need a local web server to run it properly (to avoid CORS issues with `file://` protocol).
   - You can use `npx serve` or any other static file server.
3. Open the browser and navigate to the local server address (usually `http://localhost:3000` or similar).

## Coding Standards

- Use ES6+ features where appropriate.
- Keep components modular and encapsulated in the `js/elements/` directory.
- Follow the existing naming conventions (PascalCase for classes, camelCase for variables/functions).
- Add comments to complex logic, especially within the `symulation/` directory.

## License Agreement

By contributing to OhmLoom, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE).
