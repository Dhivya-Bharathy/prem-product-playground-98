@echo off
echo 🚀 Preparing deployment to Render...

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please initialize git first:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    echo    git remote add origin ^<your-repo-url^>
    pause
    exit /b 1
)

REM Check if we have uncommitted changes
git diff-index --quiet HEAD
if errorlevel 1 (
    echo ⚠️  You have uncommitted changes. Please commit them first:
    echo    git add .
    echo    git commit -m "Prepare for Render deployment"
    pause
    exit /b 1
)

REM Check if remote is set
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No remote origin found. Please add your remote repository:
    echo    git remote add origin ^<your-repo-url^>
    pause
    exit /b 1
)

echo ✅ Git repository is ready

REM Push to remote
echo 📤 Pushing to remote repository...
git push origin main

if errorlevel 1 (
    echo ❌ Failed to push to remote repository
    pause
    exit /b 1
)

echo ✅ Code pushed successfully!
echo.
echo 🎉 Next steps:
echo 1. Go to https://render.com and sign in
echo 2. Click "New +" and select "Blueprint"
echo 3. Connect your Git repository
echo 4. Render will automatically detect render.yaml and deploy both services
echo.
echo 📋 Your services will be available at:
echo    Frontend: https://prem-product-playground-frontend.onrender.com
echo    Backend:  https://prem-product-playground-backend.onrender.com
echo.
echo 🔍 Monitor deployment in the Render dashboard
pause 