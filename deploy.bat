@echo off
echo ========================================
echo University Registration System Deployment
echo ========================================
echo.

echo Checking if Git is installed...
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from: https://git-scm.com/download/windows
    pause
    exit /b 1
)

echo Git is installed!
echo.

echo Initializing Git repository...
git init

echo Adding all files to Git...
git add .

echo Creating initial commit...
git commit -m "Initial commit - University Registration System"

echo Setting main branch...
git branch -M main

echo.
echo Adding remote repository...
git remote add origin git@github.com:hafedEfheij/university-registration-system.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo SUCCESS! Your code is now on GitHub!
echo ========================================
echo Repository URL: https://github.com/hafedEfheij/university-registration-system
echo.
echo NEXT STEP: Deploy to Railway
echo 1. Go to https://railway.app
echo 2. Sign up with your GitHub account
echo 3. Click "Deploy from GitHub repo"
echo 4. Select: hafedEfheij/university-registration-system
echo 5. Railway will automatically deploy your app!
echo.
echo ========================================

pause
