# The Ashford Inn — Website

A single-page, production-ready marketing site for **The Ashford Inn**, a historic 1839 bed &
breakfast and private event venue in historic downtown Clinton, North Carolina.

## Business Details

| | |
|---|---|
| **Name** | The Ashford Inn (McPherson Hospitality) |
| **Address** | 615 College Street, Clinton, NC 28328 |
| **Phone** | (910) 249-9546 |
| **Email** | mcphersonhospitality@gmail.com |
| **Facebook** | [facebook.com/ashfordinn](https://www.facebook.com/ashfordinn) |
| **Built** | 1839 · Inn since 1995 |
| **Capacity** | Up to 50 guests · 6 guest rooms |

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no environment variables.

```
index.html    # entry point — all sections
styles.css    # design system + responsive layout
script.js     # nav, scroll reveal, form validation
favicon.svg   # favicon placeholder
```

## Running Locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Sections

Hero (with CTA) → Trust bar → Events/Services → Spaces → Our Story → Testimonials →
CTA banner → Contact (with form) → Footer.

## Notes

- **Content** is real and sourced from the inn's live booking site, Visit Sampson NC, Cvent
  and TripAdvisor. All testimonials are verbatim guest reviews.
- **Images** come from Pexels. The images on the previous Hostex booking site were unmodified
  template defaults (Mediterranean beachfront villas and a generic "HomeStay" placeholder logo),
  so none were carried over. Replacing them with authentic photography of the actual property is
  the single highest-impact next step.
- **The contact form** has no backend. It validates client-side, then composes a pre-filled
  message to `mcphersonhospitality@gmail.com` via the visitor's mail client. Swap in a form
  service (Formspree, Netlify Forms, etc.) when a backend is available.
- **SEO**: semantic HTML, meta/Open Graph/Twitter tags, and `BedAndBreakfast` + `EventVenue`
  JSON-LD structured data with address, phone, capacity and amenities.
