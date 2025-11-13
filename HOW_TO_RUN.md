# 🚀 How to Run the Application

## Quick Start (Easiest Method)

### Option 1: Use PowerShell Scripts (Recommended)

1. **Open TWO separate PowerShell windows** (or tabs in Windows Terminal)

2. **In the FIRST PowerShell window**, run:
   ```powershell
   .\start-server.ps1
   ```
   This starts the backend server on **http://localhost:4000**

3. **In the SECOND PowerShell window**, run:
   ```powershell
   .\start-client.ps1
   ```
   This starts the frontend on **http://localhost:5173**

4. **Open your browser** and go to:
   - **Frontend (Main App)**: http://localhost:5173
   - **Backend Health Check**: http://localhost:4000/health

---

## Option 2: Manual Commands

### Step 1: Start Backend Server

Open PowerShell and run:
```powershell
Set-Location C:\Users\rohin\Desktop\PPP\server
npm start
```

You should see:
```
server listening on http://localhost:4000
```

### Step 2: Start Frontend Client

Open a **NEW** PowerShell window and run:
```powershell
Set-Location C:\Users\rohin\Desktop\PPP\client
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser

Click on the link shown in the terminal, or manually open:
- **http://localhost:5173** (Frontend - Main Application)

---

## First Time Setup (If Needed)

If you get errors about missing packages, run these commands first:

```powershell
# Install backend dependencies
Set-Location C:\Users\rohin\Desktop\PPP\server
npm install

# Install frontend dependencies
Set-Location C:\Users\rohin\Desktop\PPP\client
npm install
```

---

## What You'll See

1. **Landing Page** - Beautiful anime-style gradient background
2. **Student Login/Signup** - For students to access past papers
3. **Faculty Login/Signup** - For faculty to upload papers
4. **Development Mode Banner** - Shows if Firebase is not configured (this is OK for testing)

---

## Troubleshooting

### Port Already in Use?
If port 4000 or 5173 is busy, the app will automatically use the next available port. Check the terminal output for the actual URL.

### Firebase Not Configured?
That's OK! The app will use mock authentication for development. You can still test all features.

### MongoDB Not Connected?
That's OK too! The server will start without MongoDB. You just won't be able to save papers to the database, but the app will still run.

---

## Access URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health
- **API Papers**: http://localhost:4000/api/papers

---

## Stop the Servers

Press `Ctrl + C` in each PowerShell window to stop the servers.

