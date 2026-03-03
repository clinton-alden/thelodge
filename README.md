# The Lodge

A collaborative platform for UW Law students and environmental graduate researchers to learn, connect, and engage with field-based environmental challenges and solutions.

## Features

- **Dynamic Event Calendar** - Interactive calendar showing upcoming field trips and events
- **Comprehensive About Page** - Organization mission, member profiles, and field trip types
- **Earthy Design** - Beautiful, nature-inspired color scheme and responsive design
- **Easy Event Management** - Simple event data structure for adding new trips

## Field Trip Examples

The Lodge organizes field trips in various areas:
- Forest Management & Timber Harvesting
- Water Resources & Agriculture
- Conservation Lands & Habitat Protection
- Salmon Recovery & Fisheries
- Tribal Environmental Leadership
- EPA & Regulatory Frameworks
- Wetlands & Ecosystem Restoration

## Project Structure

```
/
├── index.html          # Home page with mission cards and calendar
├── about.html          # About Us page with detailed mission and member info
├── styles.css          # Earthy-themed styles
├── script.js           # Dynamic calendar functionality
├── _config.yml         # Jekyll configuration
└── README.md           # This file
```

## Adding Events

Edit the `events` array in `script.js` to add new field trips:

```javascript
{
    date: 'YYYY-MM-DD',
    title: 'Event Title',
    description: 'Event Description',
    location: 'Location'
}
```

## Local Development

To run this site locally:

```bash
gem install bundler jekyll
jekyll serve
```

Visit `http://localhost:4000/thelodge` in your browser.

## Deployment

The site is deployed on GitHub Pages at:
https://clinton-alden.github.io/thelodge

Push changes to the `main` branch to deploy.

## Customization

- **Colors**: Edit CSS variables at the top of `styles.css`
- **Content**: Update HTML in `index.html` and `about.html`
- **Events**: Modify the `events` array in `script.js`
- **Contact**: Update email in HTML files

## Contact

Email: thelodge@uw.edu

---

© 2026 The Lodge. A collaboration of UW Law and Environmental Graduate Students.

