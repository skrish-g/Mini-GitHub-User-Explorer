# 🔍 GitHub User Mini Explorer

A simple single-page **GitHub User Explorer** built using **Vanilla JavaScript** and **Bootstrap**.  
Search any GitHub username and instantly view profile details + latest repositories.

---

## ✨ Features

- Search GitHub users by username  
- Display profile information:
  - Avatar  
  - Name (fallback to username)  
  - Bio (handles empty bio)  
  - Followers / Following  
  - Public repository count  
- Show latest **5 updated repositories** with clickable links  
- Handles application states:
  - Loading  
  - User not found (404)  
  - Network / API errors (403, offline, rate limit)

---

## 🛠 Tech Stack

- HTML5  
- Bootstrap 5  
- Vanilla JavaScript (Async/Await)  
- GitHub REST API  

---

## 📡 API Endpoints

- User Profile  
  `https://api.github.com/users/{username}`  

- Latest Repositories  
  `https://api.github.com/users/{username}/repos?sort=updated&per_page=5`

---

## 📂 Folder Structure

```text
Mini-GitHub-User-Explorer/
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## 🙌 Credits

Special thanks to **Sofikul Bhaiya** for guidance and support.  

GitHub: [SOFIKUL SK](https://github.com/sofikulsk02)

---

## 👤 Author

**Krish Gupta**  
GitHub: [skrish-g](https://github.com/skrish-g)

---

⭐ If you like this project, consider giving it a star!