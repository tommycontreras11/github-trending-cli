# 📈 GitHub Trending CLI

**Project URL:** https://roadmap.sh/projects/github-trending-cli

A command-line application built with **Node.js** that fetches and displays the most starred GitHub repositories created within a selected time range using the **GitHub Search API**.

The CLI allows developers to quickly discover trending repositories by specifying a time period and the number of repositories to display, while validating user input and handling API errors gracefully.

---

# 🚀 Features

## Repository Search

- Search trending repositories by creation date
- Sort repositories by stars
- Limit the number of displayed repositories
- Display repository name
- Display description
- Display primary language
- Display star count

## CLI

- Interactive command-line interface
- Argument validation
- Default values for optional arguments
- Helpful validation messages

## Error Handling

- Invalid command detection
- Invalid argument detection
- Invalid value detection
- GitHub API error handling
- Empty search result handling

---

# 🛠 Technologies Used

- Node.js
- JavaScript (ES Modules)
- GitHub REST API
- Fetch API

---

# 🏗 Architecture

The application follows a simple modular architecture where each module has a single responsibility.

```text
              User
                │
                ▼
        Command Line (stdin)
                │
                ▼
        Command Dispatcher
                │
                ▼
      Input Validation Module
                │
                ▼
      Parameter Processing
                │
                ▼
      GitHub API Service
                │
                ▼
      Response Formatter
                │
                ▼
          Console Output
```

## Module Responsibilities

| Module | Responsibility |
|---------|----------------|
| CLI | Read user commands |
| Validation | Validate identifiers and values |
| Helpers | Parse and transform arguments |
| API | Fetch repositories from GitHub |
| Formatter | Format repository data |
| Output | Display formatted repositories |

---

# 📂 Project Structure

```text
github-trending-cli/
│
├── helper.js
├── index.js
└── README.md
```

---

# ▶ Installation

Clone the repository:

```bash
git clone https://github.com/tommycontreras11/github-trending-cli.git
```

Install dependencies:

```bash
npm install
```

---

# ▶ Running the Project

Start the CLI:

```bash
npm start
```

Once running, you can execute commands directly from the terminal.

---

# 💻 Available Commands

## Get Trending Repositories

```bash
trending-repos
```

Uses the default values:

- Duration: `week`
- Limit: `10`

---

### Specify Duration

```bash
trending-repos --duration month
```

---

### Specify Limit

```bash
trending-repos --limit 20
```

---

### Specify Both

```bash
trending-repos --duration year --limit 25
```

---

### Exit the CLI

```bash
exit
```

---

# ⚙ Available Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--duration` | Time range to search | `week` |
| `--limit` | Number of repositories to display | `10` |

---

# 📅 Supported Durations

| Value | Description |
|-------|-------------|
| `day` | Repositories created today |
| `week` | Repositories created during the last month* |
| `month` | Repositories created during the last month |
| `year` | Repositories created during the last year |

> **Note:** In the current implementation, both `week` and `month` search repositories created during the last month.

---

# 📄 Output Example

```text
[
  {
    repository_name: "awesome-project",
    description: "An awesome open source project",
    number_of_stars: 1250,
    language: "TypeScript"
  },
  {
    repository_name: "next-library",
    description: "A useful JavaScript library",
    number_of_stars: 980,
    language: "JavaScript"
  }
]
```

---

# 🔎 Command Examples

Get the top 10 repositories created within the last month:

```bash
trending-repos --duration month
```

Get the top 50 repositories created within the last year:

```bash
trending-repos --duration year --limit 50
```

Get the top 5 repositories created today:

```bash
trending-repos --duration day --limit 5
```

---

# ✅ Input Validation

The CLI validates:

- Unknown identifiers
- Invalid duration values
- Negative limits
- Missing values
- Invalid commands

Example:

```bash
trending-repos --duration yesterday
```

Output:

```text
Sorry, the values we allow for the id "--duration" are day,week,month,year
```

---

# ❌ Error Handling

The application gracefully handles:

- Invalid commands
- Invalid identifiers
- Invalid values
- GitHub API errors
- Rate limiting errors
- No repositories found
- Network errors

Example:

```text
Sorry, no data found, try selecting another time range.
```

---

# 🌐 GitHub API

The CLI uses GitHub's Search Repositories endpoint:

```http
GET https://api.github.com/search/repositories
```

Repositories are searched using:

- Creation date
- Star count
- Descending order
- Configurable result limit

---

# 💡 Future Improvements

Possible enhancements include:

- GitHub authentication using Personal Access Tokens
- Repository topics
- License information
- Fork count
- Open issues count
- Better table formatting
- Colored terminal output
- Pagination
- Additional sorting options
- Configuration file support
- Unit tests
- Integration tests
- Docker support

---

# 👨‍💻 Author

**Tommy Contreras**

GitHub: https://github.com/tommycontreras11

---

# 📄 License

This project is licensed under the **MIT License**.
