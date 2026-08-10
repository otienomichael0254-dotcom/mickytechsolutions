# Complete Setup Guide: EmailJS + Firebase Admin Panel

## ✅ PART 1: EmailJS Contact Form (DONE)

Your contact form is now connected to EmailJS! Here's what's been set up:

### What it does:
- When a visitor submits the contact form, two emails are sent:
  1. **Notification email** → Goes to you (Michael) with the visitor's details
  2. **Auto-reply email** → Goes to the visitor confirming you received their message

### Current configuration:
- ✅ Public Key: `5s8BwvdPKSrj6jufp`
- ✅ Service ID: `service_35gqr5w`
- ✅ Template IDs configured in `script.js`

### Next step:
1. Visit https://dashboard.emailjs.com/admin/templates
2. Make sure you have these two templates created:
   - **Template 1** (ID: `template_6dyuk08`): Notification email to you
   - **Template 2** (ID: `template_b6fhvwu`): Auto-reply to visitor

If templates don't exist, create them using HTML templates from `email-templates.md`.

---

## 🚀 PART 2: Firebase Admin Panel Setup

Your portfolio now has a **hidden admin page** where you can manage projects without editing HTML.

### Access the admin panel:
```
https://yourwebsite.com/admin
```

### What you get:
- 🔐 Secure login (only your email/password works)
- ➕ Add new projects with images
- ✏️ Edit existing projects
- 🗑️ Delete projects
- ⭐ Mark projects as featured
- 📸 Upload images to Firebase Storage
- 🔄 Live updates (projects appear instantly on main portfolio)

---

## 🔧 Firebase Configuration (REQUIRED)

You need to create a Firebase project and add your credentials.

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Add project"**
3. Enter a project name (e.g., "portfolio-site")
4. Enable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Get Firebase Credentials

1. In Firebase Console, click the **gear icon** (Settings) → **Project Settings**
2. Scroll down to **"Your apps"** section
3. Click **"Web"** icon (or **"Add app"**)
4. You'll see a code snippet with your config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Step 3: Update firebase-config.js

1. Open `firebase-config.js` in your portfolio
2. Replace the placeholder values with your actual Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDp...actual_key_here",
  authDomain: "myproject.firebaseapp.com",
  projectId: "myproject-12345",
  storageBucket: "myproject-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcd1234"
};
```

### Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left menu)
2. Click **"Create Database"**
3. Choose **"Start in production mode"** → **"Next"**
4. Choose region (closest to your users) → **"Enable"**

### Step 5: Set Up Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with this:

```firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read projects
    match /projects/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 6: Set Up Firebase Authentication

1. Go to **Authentication** (left menu) → **"Get started"**
2. Click **"Email/Password"** provider
3. Toggle **"Enable"** → **"Save"**

### Step 7: Create Your Admin Account

1. Go to **Authentication** → **"Users"** tab
2. Click **"Add user"**
3. Enter your email (e.g., `otienomichael0254@gmail.com`)
4. Enter a strong password
5. Click **"Add user"**

Now you can log in to the admin panel with these credentials!

### Step 8: Set Up Firebase Storage (for images)

1. Go to **Storage** (left menu)
2. Click **"Get started"**
3. Keep default rules → **"Next"** → **"Done"**

Your storage is now ready to accept project images.

---

## 🎯 How to Use the Admin Panel

### Login
1. Visit `https://yourwebsite.com/admin`
2. Enter your email and password
3. Click **"Login"**

### Add a Project
1. Fill in **Project Title** (required)
2. Add **Description** (required)
3. Select **Category** (Web Application, Mobile App, etc.)
4. (Optional) Add GitHub link
5. (Optional) Add Live Demo link
6. (Optional) Add tags (comma-separated): `React, Node.js, Firebase`
7. Upload **Project Image**
8. Check **"Featured Project"** if it should stand out
9. Click **"Save Project"**

### Edit a Project
1. Find the project in the "Your Projects" section
2. Click **"Edit"**
3. The form will populate with the project details
4. Make your changes
5. Click **"Save Project"**

### Delete a Project
1. Click **"Delete"** on the project card
2. Confirm the deletion

### View on Main Portfolio
Once you save a project:
- It appears automatically on your main **Projects** page
- The page reads from Firestore in real-time
- No need to edit HTML or redeploy

---

## 📊 How Data is Organized

Your Firestore database has this structure:

```
Firestore Database
└── projects (collection)
    └── [auto-generated document ID]
        ├── title: "Project Name"
        ├── description: "What this project does..."
        ├── category: "Web Application"
        ├── github: "https://github.com/..."
        ├── demo: "https://example.com"
        ├── tags: ["React", "Node.js"]
        ├── image: "https://firebasestorage.googleapis.com/..."
        ├── featured: true/false
        ├── createdAt: 2024-07-15
        └── updatedAt: 2024-07-15
```

---

## 🔒 Security Checklist

- ✅ Only your authenticated account can edit projects
- ✅ Public visitors can view projects but not edit
- ✅ Images are stored securely in Firebase Storage
- ✅ Passwords are never stored in code
- ✅ API keys are only used client-side (see security rules)

---

## 🚨 Troubleshooting

### "Form is not yet connected" message on contact page
→ Your EmailJS credentials need to be verified. Check the template IDs in EmailJS dashboard.

### Admin login doesn't work
→ Make sure you created the user in Firebase Authentication → Users tab

### Projects don't appear on main page
→ Check browser console for errors. Make sure Firestore security rules allow reading.

### Images won't upload
→ Check Firebase Storage is enabled. Make sure you have write permissions in security rules.

### "Firebase not initialized" error
→ Your `firebase-config.js` file might be missing valid credentials. Double-check all values.

---

## 📝 Summary of Files

| File | Purpose |
|------|---------|
| `firebase-config.js` | Your Firebase credentials (UPDATE THIS) |
| `admin.html` | The admin dashboard page |
| `admin.js` | Admin authentication & project management logic |
| `projects-loader.js` | Loads projects from Firestore on main portfolio |
| `emailjs.config.js` | EmailJS API keys (already configured) |
| `script.js` | Contact form + theme toggle + other site features |
| `contact.html` | Contact form (connected to EmailJS) |
| `projects.html` | Main portfolio projects page (loads from Firestore) |

---

## 🎉 Next Steps

1. ✅ Set up Firebase project
2. ✅ Update `firebase-config.js` with your credentials
3. ✅ Set up Firestore database and security rules
4. ✅ Enable Firebase Authentication
5. ✅ Create your admin user account
6. ✅ Visit `/admin` and log in
7. ✅ Add your first project!
8. ✅ Verify it appears on the main Projects page

---

## 💡 Pro Tips

- When uploading project images, use high-quality images (1200x600px works great)
- Add 3-5 tags per project for better organization
- Always mark your best work as **Featured** 
- Write clear, concise project descriptions
- Keep the demo link working and updated
- Regularly review and update project information

Enjoy your dynamic portfolio! 🚀
