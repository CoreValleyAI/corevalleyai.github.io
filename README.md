# CoreValley AI Website

Responsive multipage website for **CoreValley AI** — Nepal’s sovereign AI cloud.

## Design direction
- Visual style inspired by **Shakti Cloud** (clean light theme, deep blue primary, soft cards, professional spacing)
- Content combines:
  - Modern AI platform messaging (AI Lab → GPU Workspace → Inference endpoints, fine-tuning, serverless-style access) inspired by Shakti Cloud
  - Strong Nepal-specific advantages (NPR billing, local NPT support, full data residency, no USD/FX friction) drawn from the YetiCloud positioning

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, value props, platform overview, hardware, Nepal advantage, how-it-works |
| `about.html` | Mission, principles, who we serve |
| `services.html` | Platform page (AI Lab / GPU Workspace / Inference) + capabilities + GPU catalog |
| `pricing.html` | Buy vs rent, access models, what’s included |
| `contact.html` | Contact form + quick answers |

## Tech
- Pure HTML + CSS + vanilla JS
- Fully responsive
- Light professional theme using the logo greens (`#1BBF62` primary, `#79F2AE` mint, `#606060` charcoal)
- Google Fonts (Inter)

## View locally
```bash
cd corevalley-ai
python3 -m http.server 8080
# open http://localhost:8080
```

Logo: `images/logo.png`
