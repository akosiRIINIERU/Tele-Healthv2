# ⚡ Quick Start - 3 Minutes to Running App

## 🎯 For Complete Beginners

### 1️⃣ Install Node.js (if not installed)
1. Go to https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. Click "Next" until installed
5. Verify: Open terminal/command prompt and type `node --version`

### 2️⃣ Open Project in VS Code
1. Open VS Code
2. Click **File** → **Open Folder**
3. Navigate to this project folder
4. Click **Select Folder**

### 3️⃣ Open Terminal in VS Code
- Press **Ctrl + `** (backtick key, usually above Tab)
- Or click **Terminal** → **New Terminal** from menu
- You should see a terminal at the bottom of VS Code

### 4️⃣ Install Dependencies
In the terminal, type:
```bash
npm install
```
Press **Enter** and wait 2-3 minutes (downloads all packages)

### 5️⃣ Start the App
In the terminal, type:
```bash
npm run dev
```
Press **Enter**

### 6️⃣ Open in Browser
- Look for the line that says: `Local: http://localhost:5173/`
- Hold **Ctrl** and click the link
- Or open your browser and go to: `http://localhost:5173`

## 🎉 That's it!

You should now see the login screen!

---

## 🧪 Try These Features

### Login as Patient
1. Click on **Patient** tab
2. Enter any email (e.g., `test@example.com`)
3. Enter any password
4. Click **Sign In**
5. Explore:
   - Book appointments
   - Chat with doctors
   - Read health articles
   - Check health tips

### Login as Doctor
1. Click on **Doctor** tab
2. Enter any email (e.g., `doctor@example.com`)
3. Enter any password
4. Click **Sign In**
5. Explore:
   - Change status (Available/Busy/Offline)
   - Approve appointments
   - View earnings
   - Withdraw funds

---

## 🎨 Try Dark Mode
1. Login to the app
2. Click **Profile** (bottom right)
3. Click **Settings**
4. Toggle **Dark Mode**

---

## 🛑 To Stop the App
- In VS Code terminal, press **Ctrl + C**
- Type `Y` if asked to confirm

---

## 🚀 To Start Again
```bash
npm run dev
```

---

## 📱 View on Phone (Optional)

1. Make sure your phone and computer are on same WiFi
2. When you run `npm run dev`, look for the **Network** URL
3. It will look like: `http://192.168.1.x:5173`
4. Open this URL on your phone's browser

---

## ❓ Common Issues

### "Command not found: npm"
→ You need to install Node.js (see step 1)

### "Port 5173 is already in use"
→ Close other terminals or change port:
```bash
npm run dev -- --port 3000
```

### Changes not showing?
→ Save the file (Ctrl+S) and refresh browser (F5)

### App not loading?
→ Check terminal for errors (red text)

---

## 🎓 What's Next?

- Edit files in `components/` folder
- Changes appear instantly (no restart needed!)
- Check `SETUP.md` for detailed guide
- Read `README.md` for all features

---

## 🆘 Still Need Help?

1. Check the terminal output for error messages
2. Google the error message
3. Read SETUP.md for troubleshooting
4. Check if Node.js is installed: `node --version`
5. Make sure you're in the right folder

---

**Happy Coding! 🎉**
