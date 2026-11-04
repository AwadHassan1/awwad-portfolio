# Awwad Hassan Awwad — Portfolio

A responsive, static portfolio for Awwad Hassan Awwad, Junior Backend Developer focused on .NET. It uses plain HTML, CSS, and JavaScript, so it can be hosted on any static web host without a build step.

## Run locally

Open `index.html` in a browser, or serve the folder with any static file server. For example, with Python installed:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

Upload the project files to a static host such as GitHub Pages, Netlify, or Cloudflare Pages. Set the publish directory to the repository root; there is no build command.

## Add the real documents and portrait

The supplied workspace includes Awwad’s portrait and the original EZZO application screenshots. The CV, training certificates, and individual project repository URLs were not supplied, so the site marks those items as unavailable and does not fabricate them.

- The supplied portrait is integrated from `assets/awwad-profile.png` in the hero. Replace that file to update the photo, keeping the same path and dimensions in the image markup.
- Put the CV at `assets/documents/Awwad_Hassan_Awwad_CV.pdf`. Change `provided` to `true` in `documents.json` and replace the “CV coming soon” link with a download link using `download="Awwad_Hassan_Awwad_CV.pdf"`.
- Add certificate PDFs or images under `assets/documents/` and update `documents.json` with their paths, dates, and organizations. The current gallery intentionally reports no files until source documents are supplied.
- The EZZO case study uses the supplied original screenshots in `assets/EZZO/`; the other projects keep clearly labeled conceptual previews until their real screenshots are supplied.
- Replace each “Repository link to be added” placeholder with the verified repository URL when available. No individual project URL was supplied.

## Contact form

The form validates its fields in the browser and prepares an email to the listed address through the visitor's configured email app. It does not transmit data to a server, store submissions, or show a false “sent” confirmation. For direct submission, connect a backend or trusted form service and update the form behavior.

## Features

- Responsive single-page layout with accessible navigation and reduced-motion support.
- Dark and light themes, with theme preference stored in the browser.
- English default with Arabic text and RTL direction toggle.
- Project, education, training, achievement, document, and contact sections.
- SEO description, Open Graph metadata, and custom SVG favicon.


## EZZO project gallery

The EZZO Delivery Management System case study includes all 16 original screenshots under `assets/EZZO/`. The gallery preserves their full interface with contained previews and an accessible full-screen viewer with keyboard arrow navigation.
