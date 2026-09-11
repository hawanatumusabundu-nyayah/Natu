# Hawanatu Musa Bundu — Portfolio Website

A premium, modern personal portfolio built with **HTML5** and **CSS3** only. No frameworks, no JavaScript.

## How to Open Locally

1. Navigate to the `portfolio` folder.
2. Double-click **`index.html`** to open it in your web browser.
3. No server or installation is required.

## Project Structure

```
portfolio/
├── index.html          ← Main website (edit content here)
├── style.css           ← All styling (edit colors/fonts here)
├── images/
│   └── profile.jpg     ← Your profile photo
└── README.md           ← This file
```

## How to Replace Your Profile Photo

1. Save your professional portrait as **`profile.jpg`**.
2. Place it in the **`images/`** folder, replacing the existing file.
3. Keep the filename as `profile.jpg`, or update the `src` attribute in `index.html`:

```html
<img src="images/profile.jpg" alt="Portrait of Hawanatu Musa Bundu">
```

**Recommended image size:** 600 × 750 pixels (portrait orientation).

## How to Edit Content

Open **`index.html`** in any text editor. Each section is marked with HTML comments:

- `<!-- ========== HERO ========== -->`
- `<!-- ========== ABOUT ========== -->`
- `<!-- ========== EXPERIENCE ========== -->`
- etc.

Edit the text inside each section directly. Save the file and refresh your browser to see changes.

## How to Customize Colors & Fonts

Open **`style.css`** and edit the variables at the top:

```css
:root {
  --forest: #1B4332;    /* Main dark green */
  --sage: #8FAE8B;      /* Soft green */
  --ivory: #F8F5F0;     /* Background */
  --gold: #C4A962;      /* Accent color */
  /* ... */
}
```

## How to Connect the Contact Form

The contact form is currently visual only. To make it send messages, you can connect it to a free service:

### Option 1: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Change the form tag in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 2: Netlify Forms
If you deploy to [Netlify](https://netlify.com), add `netlify` to the form tag:
```html
<form netlify name="contact" method="POST">
```

## How to Add Social Media Links

In `index.html`, find the footer social links and replace `#` with your real URLs:

```html
<a href="https://linkedin.com/in/your-profile" aria-label="LinkedIn">
```

Do the same for Facebook, Instagram, and WhatsApp.

## How to Link Your Research Project

Find the "View Project" button in the Featured Research section and update the `href`:

```html
<a href="documents/your-dissertation.pdf" class="btn btn-primary project-btn">View Project</a>
```

## Browser Support

Works in all modern browsers: Chrome, Firefox, Safari, Edge.

---

© 2026 Hawanatu Musa Bundu. All rights reserved.
