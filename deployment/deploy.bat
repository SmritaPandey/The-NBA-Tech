@echo off
echo Starting deployment process for NBA Tech website...

REM Step 1: Build the application
echo Building the application...
call npm run build

REM Step 2: Prepare the deployment directory
echo Preparing deployment directory...
if not exist dist mkdir dist
xcopy /E /I /Y .next dist\.next
xcopy /E /I /Y public dist\public
copy package.json dist\
copy next.config.js dist\

REM Step 3: Install production dependencies in the dist folder
echo Installing production dependencies...
cd dist
call npm install --production --legacy-peer-deps
cd ..

REM Step 4: Create a deployment package
echo Creating deployment package...
powershell Compress-Archive -Path dist -DestinationPath nba-tech-website.zip -Force

echo Deployment package created: nba-tech-website.zip
echo Deployment preparation completed successfully!

REM Instructions for deployment
echo.
echo === Deployment Instructions ===
echo 1. Upload nba-tech-website.zip to your server
echo 2. Extract the package
echo 3. Navigate to the extracted directory
echo 4. Start the server: npm start
echo.
echo For production deployment with PM2:
echo pm2 start npm --name "nba-tech" -- start
echo.
