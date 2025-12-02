# Deploy Soutien Ensemble to GitHub Pages and Render
# Run this script: .\deploy-all.ps1

Write-Host "🚀 Starting deployment..." -ForegroundColor Green
Write-Host ""

# Step 1: Deploy Frontend to GitHub Pages
Write-Host "📱 Step 1: Deploying frontend to GitHub Pages..." -ForegroundColor Cyan
Set-Location frontend

Write-Host "Running: npm run deploy" -ForegroundColor Yellow
npm run deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend deployed successfully!" -ForegroundColor Green
    Write-Host "   URL: https://pikatcho509.github.io/soutien-ensemble" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend deployment failed. Check npm output above." -ForegroundColor Red
    exit 1
}

Set-Location ..
Write-Host ""

# Step 2: Instructions for Backend
Write-Host "🖥️  Step 2: Backend deployment instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your backend is ready to deploy to Render!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Follow these steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://render.com" -ForegroundColor White
Write-Host "2. Sign up with your GitHub account" -ForegroundColor White
Write-Host "3. Click 'New +' → 'Web Service'" -ForegroundColor White
Write-Host "4. Select your 'soutien-ensemble' repository" -ForegroundColor White
Write-Host "5. Configure:" -ForegroundColor White
Write-Host "   - Root Directory: backend" -ForegroundColor Gray
Write-Host "   - Build Command: npm install" -ForegroundColor Gray
Write-Host "   - Start Command: npm start" -ForegroundColor Gray
Write-Host "   - Environment: Node.js" -ForegroundColor Gray
Write-Host "6. Click 'Create Web Service'" -ForegroundColor White
Write-Host "7. Wait for deployment (2-5 minutes)" -ForegroundColor White
Write-Host "8. Copy your API URL (looks like: https://soutien-api-xxxx.onrender.com)" -ForegroundColor White
Write-Host ""

# Step 3: Update Frontend API URL
Write-Host "🔗 Step 3: Update frontend with backend URL" -ForegroundColor Cyan
Write-Host ""
Write-Host "After Render deployment is complete:" -ForegroundColor Yellow
Write-Host "1. Edit: frontend/src/App.js" -ForegroundColor White
Write-Host "2. Find: http://localhost:5000 (appears ~6 times)" -ForegroundColor White
Write-Host "3. Replace with: YOUR_RENDER_URL" -ForegroundColor White
Write-Host "4. Then run:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm run build" -ForegroundColor Gray
Write-Host "   npm run deploy" -ForegroundColor Gray
Write-Host ""

Write-Host "✨ Deployment process initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: https://pikatcho509.github.io/soutien-ensemble" -ForegroundColor Green
Write-Host "Backend: Configure in Render (see steps above)" -ForegroundColor Green
