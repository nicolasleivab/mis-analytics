# DISCLAIMER

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. Please refer to the full [MIT License](https://github.com/nicolasleivab/mis-analytics/blob/main/LICENSE) for details on the terms and conditions.

# MIS-Analytics

Analytics tool for generating insights from Medical Image Segmentation data.

## How to run this app locally with Docker

Build and run container:

```
docker build -f infrastructure/Dockerfile -t mis-analytics-react-app .
docker run -d -p 4000:80 mis-analytics-react-app
```

## How to run this app locally with node

Setup nvm for using the node versio needed for this project.

```
nvm install && nvm use
```

Install dependencies and start a dev local server.

```
npm install && npm run dev
```

## 🤝 Contributing

We welcome contributions from the community! To maintain a clean and efficient workflow, please follow the guidelines below.

### 🧾 Ground Rules

- All changes must be made via **Pull Requests (PRs)**.
- **Do not push directly to the `main` branch.** It is protected and requires PR review.
- Ensure your code adheres to the project's **code style** and **linting rules**.
- Be respectful and constructive in all discussions and code reviews.

### 🛠️ How to Contribute

1. **Fork** this repository.
2. **Clone** your fork and create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes.
4. Run tests and lint checks (if available).
5. Commit your changes with clear messages.
6. Push to your fork and submit a **Pull Request**

### ✅ Pull Request Requirements

- PRs must target the `main` branch.
- At least **one reviewer must approve** the PR before merging.
- Include a clear description of the changes and any relevant issue numbers.
- If introducing a new feature or breaking change, update or add to the documentation.

### 🔀 Branch Names

Please follow conventional branch names:

```
feature/your-feature-name
fix/feature-to-fix
docs/documentation-section
```
