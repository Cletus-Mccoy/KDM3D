# Cloudflare Pages Deployment

## Pre-deployment Checklist ✅

- [x] Build succesvol getest
- [x] TypeScript fouten opgelost
- [x] Formspree geïntegreerd met endpoint `mkoavqqp`
- [x] Contact email ingesteld: kasper.daems@gmail.com
- [x] Bedrijfsnaam bijgewerkt naar KADANS KONSULT
- [x] `_redirects` bestand toegevoegd voor SPA routing

## Cloudflare Pages Setup

### Optie 1: Via Git (Aanbevolen)

1. Push je code naar GitHub/GitLab
2. Ga naar [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Klik op "Workers & Pages" → "Create application" → "Pages"
4. Selecteer je Git repository
5. Configureer de build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `app` (indien je repo een parent folder heeft)
6. Klik op "Save and Deploy"

### Optie 2: Direct Upload

1. Build je project lokaal: `npm run build`
2. Ga naar [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Klik op "Workers & Pages" → "Create application" → "Pages" → "Upload assets"
4. Upload de `dist` folder
5. Geef je project een naam
6. Klik op "Deploy"

## Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview build
npm run preview
```

## Environment Variables

Geen environment variables nodig - Formspree endpoint is direct in de code.

## Post-deployment

1. Test het contactformulier
2. Controleer of alle afbeeldingen laden
3. Test alle navigatie links
4. Verifieer scroll animaties werken
5. Test op mobile devices

## Custom Domain (Optioneel)

1. Ga naar je Pages project in Cloudflare
2. Klik op "Custom domains"
3. Voeg je domein toe
4. Update DNS records zoals geïnstrueerd

## Troubleshooting

**404 bij refresh**: De `_redirects` file zorgt ervoor dat alle routes naar `index.html` gaan.

**Afbeeldingen laden niet**: Zorg dat alle images in de `public/images` folder staan.

**Formspree werkt niet**: Check of het endpoint `mkoavqqp` actief is in je Formspree dashboard.
