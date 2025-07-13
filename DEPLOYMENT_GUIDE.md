# Deployment Guide - University Registration System
## دليل النشر - منظومة تنزيل المواد والدفع

This guide will help you deploy your University Registration System to **Railway** - a free hosting platform that doesn't require a credit card.

## 🚀 Quick Deployment to Railway

### Step 1: Prepare Your Code
Your code is already prepared for deployment! The following files have been configured:
- ✅ `package.json` - Updated with proper scripts and dependencies
- ✅ `railway.json` - Railway deployment configuration
- ✅ `.gitignore` - Excludes unnecessary files
- ✅ `README.md` - Project documentation

### Step 2: Create a GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new account (if you don't have one)
2. Create a new repository:
   - Click "New repository"
   - Name it: `university-registration-system`
   - Make it **Public** (required for free Railway deployment)
   - Don't initialize with README (we already have one)

### Step 3: Upload Your Code to GitHub
1. Open Command Prompt/Terminal in your project folder
2. Run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit - University Registration System"
git branch -M main
git remote add origin git@github.com:hafedEfheij/university-registration-system.git
git push -u origin main
```

Your repository is ready at: https://github.com/hafedEfheij/university-registration-system

### Step 4: Deploy to Railway
1. Go to [Railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with your GitHub account (no credit card needed!)
4. Click "Deploy from GitHub repo"
5. Select your `university-registration-system` repository
6. Railway will automatically detect it's a Node.js project and deploy it!

### Step 5: Access Your Application
- Railway will provide you with a URL like: `https://your-app-name.railway.app`
- Your application will be live and accessible worldwide!

## 🔧 Alternative Deployment Options

### Option 2: Render (Free Tier)
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Create new "Web Service"
4. Connect your GitHub repository
5. Use these settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Option 3: Cyclic (Free Tier)
1. Go to [Cyclic.sh](https://cyclic.sh)
2. Sign up with GitHub
3. Deploy directly from your repository

### Option 4: Glitch (Free Tier)
1. Go to [Glitch.com](https://glitch.com)
2. Import from GitHub
3. Your app will be live instantly

## 📋 Default Login Credentials

Once deployed, you can access your system with these credentials:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full system management

### Financial Supervisor Account
- **Username**: `financial`
- **Password**: `financial123`
- **Access**: Payment management and account unlocking

### Test Student Account
- **Username**: `student1`
- **Password**: `student123`
- **Access**: Course registration and payment

## 🔒 Security Recommendations

After deployment, immediately:

1. **Change Default Passwords**:
   - Login as admin and go to Profile settings
   - Update admin credentials
   - Update financial supervisor credentials

2. **Add Real Students**:
   - Use the admin panel to add actual students
   - Delete or disable the test student account

3. **Configure System Settings**:
   - Set appropriate course limits
   - Configure payment card values
   - Set up proper departments and courses

## 🗄️ Database Information

- **Database Type**: SQLite (file-based)
- **Auto-Creation**: Database is created automatically on first run
- **Persistence**: Data persists between deployments
- **Backup**: Download your database file from the hosting platform's file manager

## 🌐 Features Available After Deployment

### For Students:
- Course registration and enrollment
- Payment submission using prepaid cards
- View enrollment history and payment status
- Account security with lockout protection

### For Administrators:
- Complete student management
- Course and department management
- Payment oversight and verification
- System configuration and settings

### For Financial Supervisors:
- Payment verification and processing
- Student account management
- Financial reporting and statistics

## 🆘 Troubleshooting

### Common Issues:

1. **App won't start**:
   - Check that `package.json` has correct start script
   - Ensure all dependencies are listed

2. **Database errors**:
   - Database will be created automatically
   - Check file permissions on hosting platform

3. **Arabic text not displaying**:
   - Ensure UTF-8 encoding is set
   - Check that RTL CSS is loading properly

### Getting Help:
- Check Railway/Render logs for error messages
- Ensure your GitHub repository is public
- Verify all files are committed and pushed

## 🎉 Success!

Once deployed, your University Registration System will be:
- ✅ Accessible worldwide 24/7
- ✅ Automatically backed up
- ✅ Running on professional infrastructure
- ✅ Free to use (no credit card required)

**Your system is now ready to serve students and administrators!**

---

**Need help?** Check the hosting platform's documentation or create an issue in your GitHub repository.
