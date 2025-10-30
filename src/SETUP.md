# 🚀 Quick Setup Guide

Follow these steps to get your Doctor Booking App running in VS Code:

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ Node.js (version 18 or higher) - [Download here](https://nodejs.org/)
- ✅ VS Code - [Download here](https://code.visualstudio.com/)
- ✅ Git (optional) - [Download here](https://git-scm.com/)

## 🛠️ Installation Steps

### Step 1: Open in VS Code

1. Open VS Code
2. Click `File` → `Open Folder`
3. Select this project folder

### Step 2: Install Dependencies

Open the integrated terminal in VS Code (`Ctrl+` ` or View → Terminal`) and run:

```bash
npm install
```

This will install all required packages (might take 2-3 minutes).

### Step 3: Start Development Server

Once installation is complete, run:

```bash
npm run dev
```

You should see output like:
```
VITE v5.4.3  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 4: Open in Browser

1. Hold `Ctrl` (or `Cmd` on Mac) and click the `http://localhost:5173/` link
2. Or manually open your browser and go to `http://localhost:5173/`

## 🎉 You're Ready!

The app should now be running! You'll see the login screen.

### Test Accounts

Try logging in with these demo flows:

**As a Patient:**
- Email: any email (e.g., `patient@test.com`)
- Password: any password
- Select: Patient tab

**As a Doctor:**
- Email: any email (e.g., `doctor@test.com`)
- Password: any password
- Select: Doctor tab

> Note: This is a demo app with mock authentication. Any email/password will work!

## 🔧 Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📱 Features to Explore

### As a Patient:
1. 🏥 Browse and search doctors
2. 📅 Book appointments with calendar
3. 💬 Chat with doctors
4. 📞 Make video/voice calls
5. 📚 Read health articles and tips
6. 💳 Try payment flow
7. 🌙 Toggle dark/light theme in Settings

### As a Doctor:
1. 📊 View dashboard with stats
2. ⚡ Change availability status
3. ✅ Confirm/reject appointments
4. 💰 View earnings and withdrawals
5. 📋 Manage patient appointments
6. 💬 Chat with patients

## 🎨 VS Code Extensions (Recommended)

Install these extensions for a better development experience:

1. **ES7+ React/Redux/React-Native snippets** - `dsznajder.es7-react-js-snippets`
2. **Tailwind CSS IntelliSense** - `bradlc.vscode-tailwindcss`
3. **Prettier** - `esbenp.prettier-vscode`
4. **ESLint** - `dbaeumer.vscode-eslint`

Install via: `Ctrl+Shift+X` → Search → Install

## 🐛 Troubleshooting

### Port 5173 already in use?
```bash
# Kill the process or change port in vite.config.ts
npm run dev -- --port 3000
```

### Module not found errors?
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors?
```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P → Type "TypeScript: Restart TS Server"
```

### Styles not loading?
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

## 📂 Project Structure

```
doctor-booking-app/
├── 📁 components/          # React components
│   ├── auth/              # Login, Register
│   ├── patient/           # Patient screens
│   ├── doctor/            # Doctor screens
│   ├── shared/            # Shared components
│   └── ui/                # UI components (ShadCN)
├── 📁 contexts/           # React contexts
│   ├── AuthContext.tsx    # Authentication
│   └── ThemeContext.tsx   # Theme management
├── 📁 lib/                # Utilities
│   └── mockData.ts        # Demo data
├── 📁 styles/             # Global styles
│   └── globals.css        # Tailwind + custom styles
├── 📁 public/             # Static assets
├── 📄 App.tsx             # Main app component
├── 📄 main.tsx            # Entry point
├── 📄 index.html          # HTML template
├── 📄 package.json        # Dependencies
├── 📄 vite.config.ts      # Vite configuration
└── 📄 tsconfig.json       # TypeScript config
```

## 🔄 Making Changes

The app uses **Hot Module Replacement (HMR)**, so changes appear instantly:

1. Edit any `.tsx` or `.css` file
2. Save (`Ctrl+S`)
3. See changes immediately in browser (no refresh needed!)

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy Options

- **Vercel**: `npm i -g vercel` → `vercel`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Configure in repository settings
- **Firebase**: `firebase deploy`

## 💡 Tips

- Use `Ctrl+Click` on imports to jump to file
- Use `F12` on variables to see definition
- Use `Ctrl+P` for quick file search
- Use `Ctrl+Shift+F` for global search
- Use `Ctrl+B` to toggle sidebar

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com/)

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed features
- Search for errors in browser console (`F12`)
- Check terminal output for build errors
- Review component files for usage examples

---

Happy Coding! 🎉
