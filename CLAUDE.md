# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint via next lint
```

There are no tests in this project.

## Environment Variables

Copy `.env` with the following variables for the contact form to work:

```
EMAIL=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
```

The contact form uses Gmail via Nodemailer. `EMAIL_PASS` must be a [Gmail App Password](https://support.google.com/accounts/answer/185833), not the account password.

## Architecture

This is a Next.js 13 (pages router) personal portfolio site. No `src/` directory — pages are at `pages/`, components at `components/`.

**Pages:** `index`, `about`, `services`, `work`, `testimonials`, `contact` — all under `pages/`.

**Layout system:** Every page is wrapped in `Layout` (via `_app.js`) which renders `Nav`, `Header`, and `TopLeftImg` as persistent chrome. `Transition` (framer-motion) animates between route changes using `router.route` as the motion key.

**Animation:** `variants.js` exports a single `fadeIn(direction, delay)` helper used across all pages with framer-motion `motion.*` components.

**Contact form flow:** `pages/contact/index.js` → `lib/api.js` (`fetch /api/contact`) → `pages/api/contact.js` → `config/nodemailer.js` (Gmail transporter) → sends email to self.

**Styling:** Tailwind CSS with custom theme — primary `#1a1a1a`, accent `#4452fb`. Font is Sora (loaded via `@next/font/google`). `tailwind-scrollbar` plugin is used. Custom animations: `spin-slow`, `vblink`, `vmove`.

**Sliders:** `ServiceSlider`, `WorkSlider`, `TestimonialSlider` use Swiper.js. `ParticlesContainer` uses tsParticles/react-tsparticles on the home page.
