# Deploy Past Papers Portal to Render

## Prerequisites
1. Create a free account at [render.com](https://render.com)
2. Push your code to GitHub (create a repository)

## Step 1: Deploy Backend (Server)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `past-papers-backend`
   - **Region**: Oregon (US West)
   - **Branch**: main (or your branch name)
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node src/app.js`
   - **Instance Type**: Free

5. Add Environment Variables:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add these variables:
     ```
     PORT = 4000
     CLIENT_ORIGIN = https://your-frontend-url.onrender.com
     MONGODB_URI = (leave empty for now, file storage will work)
     ```

6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. **Copy the backend URL** (e.g., `https://past-papers-backend-xxxx.onrender.com`)

## Step 2: Deploy Frontend (Client)

1. Go back to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Static Site"**
3. Connect the same GitHub repository
4. Configure the site:
   - **Name**: `past-papers-frontend`
   - **Region**: Oregon (US West)
   - **Branch**: main
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

5. Add Environment Variable:
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add:
     ```
     VITE_API_URL = https://past-papers-backend-xxxx.onrender.com
     ```
     (Use the backend URL you copied in Step 1)

6. Click **"Create Static Site"**
7. Wait for deployment to complete
8. **Copy the frontend URL** (e.g., `https://past-papers-frontend-xxxx.onrender.com`)

## Step 3: Update Backend CLIENT_ORIGIN

1. Go to your backend service in Render Dashboard
2. Click **"Environment"** tab
3. Edit `CLIENT_ORIGIN` variable:
   - Change to your frontend URL: `https://past-papers-frontend-xxxx.onrender.com`
4. Click **"Save Changes"**
5. Backend will automatically redeploy

## Step 4: Test Your Deployment

1. Open your frontend URL in browser
2. Try to login as Faculty
3. Upload a test paper
4. Login as Student
5. Click "Show All Papers" button
6. Verify papers are displayed

## Important Notes

### Free Tier Limitations
- **Backend**: Free tier spins down after 15 minutes of inactivity
- **First request after sleep**: Takes 30-60 seconds to wake up
- **Data Persistence**: Papers are saved to a JSON file on disk
- **File Storage**: Will persist as long as service doesn't restart

### If You Need Better Performance
1. Upgrade to paid tier ($7/month) for:
   - No sleep/spin down
   - Better performance
   - More reliable storage

2. Or connect to MongoDB Atlas (free tier):
   - Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Create a cluster
   - Get connection string
   - Add to `MONGODB_URI` environment variable

## Troubleshooting

### Papers Not Showing
1. Check browser console for errors (F12)
2. Verify `VITE_API_URL` is set correctly
3. Check backend logs in Render dashboard

### CORS Errors
1. Verify `CLIENT_ORIGIN` matches frontend URL exactly
2. No trailing slash in URLs

### 404 Errors on Refresh
- This is normal for static sites
- Render should auto-redirect to index.html

## GitHub Repository Setup

Before deploying, push your code to GitHub:

```bash
cd C:\Users\rohin\Desktop\PPP
git init
git add .
git commit -m "Initial commit - Past Papers Portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/past-papers-portal.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## After Deployment

Your app will be live at:
- Frontend: `https://past-papers-frontend-xxxx.onrender.com`
- Backend: `https://past-papers-backend-xxxx.onrender.com`

Share the frontend URL with students!
