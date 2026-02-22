@echo off
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"
echo Servers are starting...
echo Once started:
echo - Frontend will run on http://localhost:5173
echo - Backend will run on http://localhost:3000
