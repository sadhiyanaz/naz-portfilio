# 🚀 Premium Apple-Inspired Static Portfolio Website | Sadiya Naz

A beautiful, modern, minimalist personal portfolio website inspired by Apple's design language. Tailored to showcase the profile, skills, projects, certifications, and academics of a **Data Science & AI/ML Enthusiast**.

This project is built as a **standalone static website**, requiring absolutely **no build steps, command lines, or Node.js/npm dependencies**. You can upload it to GitHub and view it instantly!

---

## 📂 Repository File Structure

To deploy your portfolio website, upload **only** these files and folders to your GitHub repository:

* **`assets/`**
  * `profile.jpg` (Your uploaded portrait image)
  * `resume.pdf` (Your downloadable resume PDF)
  * `favicon.svg` (Browser tab icon)
* **`index.html`** (The main webpage structure)
* **`style.css`** (Custom layout styles and page animations)
* **`script.js`** (Typewriters, theme switching, loading page progress, form submissions)
* **`README.md`** (This file)

---

## 🎨 Key Features & Aesthetics

* 💻 **Minimalist Apple Design**: Large typography titles, micro-shadows, generous whitespace, and sleek typography.
* 🧼 **Glassmorphism Theme**: Translucent cards using custom CSS backdrops and saturation filters (`backdrop-blur-md`).
* ⏳ **Custom Loader**: An elegant loading transition showing custom spaced title animation (`SADIYA NAZ`) with progress percentage tracking.
* 🌒 **Dark / Light Mode**: Integrated theme toggle syncing to local storage and system preferences.
* 📈 **Scroll Progress Bar**: A sleek progress line tracking user viewport depth.
* 📬 **EmailJS Contact Form**: An active client-side contact form with validation toasts and simulated fallbacks.
* 📱 **Fully Responsive Layout**: Premium mobile navigation drawer and scaling typography layouts.

---

## 🚀 How to Upload & Deploy on GitHub Pages (Free Hosting)

Follow these simple steps to put your website online:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/).
2. Click **New** (green button) to create a new repository.
3. Name it (e.g., `sadiya-portfolio`).
4. Set it to **Public**.
5. **CRITICAL**: Do **NOT** check "Add a README file", "Add .gitignore", or "Choose a license" (they are already included in your files!).
6. Click **Create repository**.

### Step 2: Upload Your Files
1. On the setup screen, click on the **"uploading an existing file"** link.
2. Drag and drop these files and folders from your computer:
   * **`assets/`** (drag the entire folder)
   * **`index.html`**
   * **`style.css`**
   * **`script.js`**
   * **`README.md`**
3. Wait for the upload progress bar to finish.
4. Scroll to the bottom and click **Commit changes** (green button).

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on **Settings** (top-right menu bar).
2. On the left sidebar, click on **Pages**.
3. Under **Build and deployment** -> **Branch**:
   - Change the source branch dropdown from `None` to **`main`** (or `master`).
   - Leave the folder as `/ (root)`.
4. Click **Save**.

Your portfolio website is now live! Within 1 minute, GitHub will show your website link at the top of the Pages section (e.g., `https://your-username.github.io/sadiya-portfolio/`).

---

## 📬 Setting up EmailJS Contact Form

To make the contact form send real messages directly to your email inbox:

1. Create a free account on [EmailJS](https://www.emailjs.com/).
2. Add an email service provider and create an email template.
3. Open **`script.js`** in a text editor (like Notepad, VS Code) and scroll to line 219:
   ```javascript
   const serviceId = "YOUR_EMAILJS_SERVICE_ID";
   const templateId = "YOUR_EMAILJS_TEMPLATE_ID";
   const publicKey = "YOUR_EMAILJS_PUBLIC_KEY";
   ```
4. Paste your actual EmailJS keys, save the file, and commit/push the update to GitHub.
   *Note: If these keys are left empty, the contact form automatically runs in "Simulation Mode" so recruiters can test it and receive success feedback alerts immediately!*
