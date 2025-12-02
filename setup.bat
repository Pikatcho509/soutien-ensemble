@echo off
REM Setup and run Soutien Ensemble locally

echo.
echo ========== Soutien Ensemble - Setup Local ==========
echo.

REM Install backend
echo [1/4] Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend
echo [2/4] Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Build frontend
echo [3/4] Building frontend...
cd frontend
call npm run build
cd ..

echo [4/4] Setup complete!
echo.
echo Next steps:
echo   1. In Terminal 1, run: cd backend ^&^& npm start
echo   2. In Terminal 2, run: cd frontend ^&^& npm start
echo   3. Frontend will open at http://localhost:3000
echo   4. Backend API runs at http://localhost:5000/api/health
echo.
echo To deploy:
echo   - GitHub Pages: cd frontend ^&^& npm run deploy
echo   - Render: Follow DEPLOYMENT_GUIDE.md
echo.
pause
