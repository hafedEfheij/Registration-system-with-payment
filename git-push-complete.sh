#!/bin/bash

# Complete Git Push Script for University Registration System
# This script will push all files and folders to GitHub repository

echo "🚀 Starting complete Git push to GitHub repository..."
echo "Repository: git@github.com:hafedEfheij/Registration-system-with-payment.git"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

print_info "Git is available"

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    print_info "Initializing Git repository..."
    git init
    print_status "Git repository initialized"
else
    print_info "Git repository already exists"
fi

# Add remote origin if not already added
if ! git remote get-url origin &> /dev/null; then
    print_info "Adding remote origin..."
    git remote add origin git@github.com:hafedEfheij/Registration-system-with-payment.git
    print_status "Remote origin added"
else
    print_info "Remote origin already exists"
    # Update remote URL to ensure it's correct
    git remote set-url origin git@github.com:hafedEfheij/Registration-system-with-payment.git
    print_status "Remote origin URL updated"
fi

# Create/update .gitignore to exclude sensitive files but include everything else
print_info "Creating comprehensive .gitignore..."
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Grunt intermediate storage
.grunt

# Bower dependency directory
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons
build/Release

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# parcel-bundler cache
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs
*.log

# Temporary files
tmp/
temp/
EOF

print_status ".gitignore created/updated"

# Add all files to git
print_info "Adding all files to Git..."
git add .

# Check git status
print_info "Git status:"
git status --short

# Create a comprehensive commit message
COMMIT_MESSAGE="🚀 Complete University Registration System with Payment

✨ Features:
- Student registration and enrollment system
- Payment system with prepaid cards
- Admin and financial supervisor dashboards
- QR code generation for prepaid cards
- Responsive design for all devices
- Arabic language support
- Account security with lockout protection

🎯 Recent Improvements:
- Mobile-responsive layouts
- Professional UI/UX design
- Enhanced prepaid cards management
- Improved navigation and user experience
- Bug fixes and optimizations

🔧 Technical Stack:
- Node.js with Express.js
- SQLite3 database
- Bootstrap 5 with RTL support
- Font Awesome icons
- Session-based authentication

📱 Ready for deployment on Glitch or any Node.js hosting platform

🔑 Default credentials:
- Admin: admin/admin123
- Financial: financial/financial123
- Student: student1/student123"

# Commit changes
print_info "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

if [ $? -eq 0 ]; then
    print_status "Changes committed successfully"
else
    print_warning "No changes to commit or commit failed"
fi

# Push to GitHub
print_info "Pushing to GitHub repository..."
print_warning "This may take a few moments for large repositories..."

# Try to push to main branch first
if git push -u origin main 2>/dev/null; then
    print_status "Successfully pushed to main branch"
elif git push -u origin master 2>/dev/null; then
    print_status "Successfully pushed to master branch"
else
    print_error "Failed to push to repository"
    print_info "This might be due to:"
    print_info "1. SSH key not configured"
    print_info "2. Repository doesn't exist"
    print_info "3. No internet connection"
    print_info "4. Permission issues"
    echo ""
    print_info "Trying to get more information..."
    git remote -v
    exit 1
fi

# Display repository information
echo ""
print_status "🎉 Complete push successful!"
echo ""
print_info "Repository Details:"
echo "📁 Repository URL: https://github.com/hafedEfheij/Registration-system-with-payment"
echo "🔗 Clone URL (HTTPS): https://github.com/hafedEfheij/Registration-system-with-payment.git"
echo "🔗 Clone URL (SSH): git@github.com:hafedEfheij/Registration-system-with-payment.git"
echo ""

print_info "Files and Folders Pushed:"
echo "📂 Complete project structure including:"
echo "   • package.json and dependencies"
echo "   • index.js (entry point)"
echo "   • server/ directory (backend code)"
echo "   • public/ directory (frontend files)"
echo "   • database files and schema"
echo "   • documentation and README files"
echo "   • all recent improvements and fixes"
echo ""

print_status "✨ Your complete University Registration System is now on GitHub!"
print_info "🚀 Ready for deployment on Glitch or any Node.js platform"
echo ""

# Show final git status
print_info "Final repository status:"
git log --oneline -5
echo ""
print_status "🎊 All done! Your project is successfully pushed to GitHub."
