@echo off
setlocal enabledelayedexpansion

REM Complete Git Push Script for University Registration System
REM This script will push all files and folders to GitHub repository

echo.
echo 🚀 Starting complete Git push to GitHub repository...
echo Repository: git@github.com:hafedEfheij/Registration-system-with-payment.git
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed. Please install Git first.
    pause
    exit /b 1
)

echo ✅ Git is available

REM Initialize git repository if not already initialized
if not exist ".git" (
    echo ℹ️  Initializing Git repository...
    git init
    echo ✅ Git repository initialized
) else (
    echo ℹ️  Git repository already exists
)

REM Add remote origin if not already added
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ℹ️  Adding remote origin...
    git remote add origin git@github.com:hafedEfheij/Registration-system-with-payment.git
    echo ✅ Remote origin added
) else (
    echo ℹ️  Remote origin already exists
    REM Update remote URL to ensure it's correct
    git remote set-url origin git@github.com:hafedEfheij/Registration-system-with-payment.git
    echo ✅ Remote origin URL updated
)

REM Create/update .gitignore
echo ℹ️  Creating comprehensive .gitignore...
(
echo # Dependencies
echo node_modules/
echo npm-debug.log*
echo yarn-debug.log*
echo yarn-error.log*
echo.
echo # Runtime data
echo pids
echo *.pid
echo *.seed
echo *.pid.lock
echo.
echo # Coverage directory used by tools like istanbul
echo coverage/
echo.
echo # nyc test coverage
echo .nyc_output
echo.
echo # Grunt intermediate storage
echo .grunt
echo.
echo # Bower dependency directory
echo bower_components
echo.
echo # node-waf configuration
echo .lock-wscript
echo.
echo # Compiled binary addons
echo build/Release
echo.
echo # Dependency directories
echo jspm_packages/
echo.
echo # Optional npm cache directory
echo .npm
echo.
echo # Optional REPL history
echo .node_repl_history
echo.
echo # Output of 'npm pack'
echo *.tgz
echo.
echo # Yarn Integrity file
echo .yarn-integrity
echo.
echo # dotenv environment variables file
echo .env
echo .env.local
echo .env.development.local
echo .env.test.local
echo .env.production.local
echo.
echo # parcel-bundler cache
echo .cache
echo .parcel-cache
echo.
echo # next.js build output
echo .next
echo.
echo # nuxt.js build output
echo .nuxt
echo.
echo # vuepress build output
echo .vuepress/dist
echo.
echo # Serverless directories
echo .serverless
echo.
echo # FuseBox cache
echo .fusebox/
echo.
echo # DynamoDB Local files
echo .dynamodb/
echo.
echo # TernJS port file
echo .tern-port
echo.
echo # OS generated files
echo .DS_Store
echo .DS_Store?
echo ._*
echo .Spotlight-V100
echo .Trashes
echo ehthumbs.db
echo Thumbs.db
echo.
echo # IDE files
echo .vscode/
echo .idea/
echo *.swp
echo *.swo
echo *~
echo.
echo # Logs
echo logs
echo *.log
echo.
echo # Temporary files
echo tmp/
echo temp/
) > .gitignore

echo ✅ .gitignore created/updated

REM Add all files to git
echo ℹ️  Adding all files to Git...
git add .

REM Check git status
echo ℹ️  Git status:
git status --short

REM Commit changes with comprehensive message
echo ℹ️  Committing changes...
git commit -m "🚀 Complete University Registration System with Payment

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

if errorlevel 1 (
    echo ⚠️  No changes to commit or commit failed
) else (
    echo ✅ Changes committed successfully
)

REM Push to GitHub
echo ℹ️  Pushing to GitHub repository...
echo ⚠️  This may take a few moments for large repositories...

REM Try to push to main branch first
git push -u origin main >nul 2>&1
if not errorlevel 1 (
    echo ✅ Successfully pushed to main branch
    goto :success
)

REM Try master branch if main failed
git push -u origin master >nul 2>&1
if not errorlevel 1 (
    echo ✅ Successfully pushed to master branch
    goto :success
)

REM If both failed
echo ❌ Failed to push to repository
echo ℹ️  This might be due to:
echo    1. SSH key not configured
echo    2. Repository doesn't exist
echo    3. No internet connection
echo    4. Permission issues
echo.
echo ℹ️  Repository information:
git remote -v
pause
exit /b 1

:success
echo.
echo ✅ 🎉 Complete push successful!
echo.
echo ℹ️  Repository Details:
echo 📁 Repository URL: https://github.com/hafedEfheij/Registration-system-with-payment
echo 🔗 Clone URL (HTTPS): https://github.com/hafedEfheij/Registration-system-with-payment.git
echo 🔗 Clone URL (SSH): git@github.com:hafedEfheij/Registration-system-with-payment.git
echo.
echo ℹ️  Files and Folders Pushed:
echo 📂 Complete project structure including:
echo    • package.json and dependencies
echo    • index.js (entry point)
echo    • server/ directory (backend code)
echo    • public/ directory (frontend files)
echo    • database files and schema
echo    • documentation and README files
echo    • all recent improvements and fixes
echo.
echo ✅ ✨ Your complete University Registration System is now on GitHub!
echo ℹ️  🚀 Ready for deployment on Glitch or any Node.js platform
echo.
echo ℹ️  Final repository status:
git log --oneline -5
echo.
echo ✅ 🎊 All done! Your project is successfully pushed to GitHub.
echo.
pause
