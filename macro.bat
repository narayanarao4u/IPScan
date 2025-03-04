DOSKEY cbf=cd backend
DOSKEY nrd=npm run dev
DOSKEY cfr=cd frontend
DOSKEY p=ping -t 10.34.128.1
DOSKEY pg=ping -t 10.34.$1

DOSKEY /macros:all

for /f "tokens=5" %a in ('netstat -ano ^| findstr :3000') do taskkill /f /pid %a

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do taskkill /f /pid %%a

