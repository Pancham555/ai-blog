const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Initialize git repository if not already initialized
try {
  execSync("git rev-parse --git-dir", { stdio: "ignore" })
  console.log("Git repository already initialized")
} catch (error) {
  console.log("Initializing git repository...")
  execSync("git init")
  execSync("git branch -M main")
}

// Create blog directory if it doesn't exist
const blogDir = path.join(process.cwd(), "blog")
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true })
  console.log("Created blog directory")
}

// Create .gitignore if it doesn't exist
const gitignorePath = path.join(process.cwd(), ".gitignore")
const gitignoreContent = `
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
build/

# Misc
.DS_Store
*.tsbuildinfo

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts
`

if (!fs.existsSync(gitignorePath)) {
  fs.writeFileSync(gitignorePath, gitignoreContent)
  console.log("Created .gitignore file")
}

// Set up git user (optional)
try {
  execSync('git config user.name "AI News Hub Bot"')
  execSync('git config user.email "bot@ainewshub.com"')
  console.log("Git user configuration set")
} catch (error) {
  console.log("Could not set git user configuration")
}

console.log("Git setup completed!")
