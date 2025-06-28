# Deployment Guide - Interior Design Project

## 🚀 Quick Deploy Options

### **Option 1: Render (Recommended)**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your repository
5. Configure:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Port:** 4000 (or your preferred port)

### **Option 2: Railway**
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repository
3. Auto-deploy (Railway detects Node.js)

### **Option 3: Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure for Node.js

## 📋 Pre-Deployment Checklist

### ✅ Environment Variables
Make sure these are set in your deployment platform:

```env
# MongoDB Atlas Connection
myMongo=mongodb+srv://username:password@cluster.mongodb.net/InteriorWeb?retryWrites=true&w=majority

# JWT Secret (for production, use a strong secret)
JWT_SECRET=your-super-secure-jwt-secret-here

# Port (optional, most platforms set this automatically)
PORT=4000

# Node Environment
NODE_ENV=production
```

### ✅ Database Setup
1. **MongoDB Atlas is already configured** ✅
2. **Database name is "InteriorWeb"** ✅
3. **Collections exist: projects, blogs, admins, contacts** ✅

### ✅ File Structure
Your project structure is deployment-ready:
- ✅ `app.js` (main entry point)
- ✅ `package.json` (dependencies and scripts)
- ✅ `public/` (static files)
- ✅ `views/` (EJS templates)
- ✅ `models/` (MongoDB schemas)

## 🔧 Platform-Specific Instructions

### **Render Deployment**

1. **Create Account:**
   - Sign up at [render.com](https://render.com)
   - Connect your GitHub account

2. **Create Web Service:**
   - Click "New Web Service"
   - Select your repository
   - Choose "Node" environment

3. **Configure Settings:**
   ```
   Name: interior-design-project
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add all variables from your `.env` file

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for build to complete
   - Your app will be live at `https://your-app-name.onrender.com`

### **Railway Deployment**

1. **Create Account:**
   - Sign up at [railway.app](https://railway.app)
   - Connect GitHub

2. **Deploy:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway auto-detects Node.js

3. **Add Environment Variables:**
   - Go to "Variables" tab
   - Add your environment variables

4. **Access:**
   - Railway provides a URL automatically
   - Usually `https://your-app-name.railway.app`

## 🛠️ Troubleshooting

### **Common Issues:**

1. **Build Fails:**
   - Check if all dependencies are in `package.json`
   - Ensure `start` script exists

2. **Database Connection Fails:**
   - Verify MongoDB Atlas connection string
   - Check if IP whitelist includes deployment platform IPs
   - Ensure database name is correct

3. **Static Files Not Loading:**
   - Check if `public/` folder is included in repository
   - Verify static file middleware in `app.js`

4. **Port Issues:**
   - Most platforms set `PORT` automatically
   - Use `process.env.PORT || 4000` in your app

### **Debug Commands:**
```bash
# Test database connection
npm run test-db

# Check database contents
npm run debug-db

# Seed database (if needed)
npm run seed-all
```

## 🔒 Security Considerations

### **Production Security:**
1. **Use strong JWT secrets**
2. **Enable HTTPS (automatic on most platforms)**
3. **Set proper CORS if needed**
4. **Use environment variables for all secrets**

### **MongoDB Atlas Security:**
1. **Use connection string with username/password**
2. **Whitelist deployment platform IPs**
3. **Use database user with minimal required permissions**

## 📊 Monitoring

### **After Deployment:**
1. **Test all routes:**
   - Homepage: `/`
   - Projects: `/projects`
   - Blogs: `/blogs`
   - Contact: `/contact`
   - Admin: `/admin`

2. **Check logs:**
   - Most platforms provide log access
   - Monitor for errors

3. **Database:**
   - Verify data is accessible
   - Test admin login

## 🎯 Next Steps

1. **Deploy to your chosen platform**
2. **Test all functionality**
3. **Set up custom domain (optional)**
4. **Configure monitoring and alerts**
5. **Set up CI/CD for automatic deployments**

## 📞 Support

If you encounter issues:
1. Check platform-specific documentation
2. Review error logs
3. Test locally with production environment variables
4. Verify database connectivity

---

**Your project is ready for deployment! 🚀** 