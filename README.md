# Sairaj Mote — UI/UX Designer & Developer

This repository contains my portfolio case study and a frameworkless UI component library. The `website/` directory is the portfolio and interactive design-system showcase; the root also includes reusable components, starter layouts and UI utilities.

## Explore

- [Portfolio and design-system case study](website/index.html)
- [Interactive component documentation](components/index.html)
- [Reusable page layouts](Layouts/)
- [UI utilities](main_UI.js)

## Design-system showcase

The site presents the RanchiMall Design System's foundations, tokens, native Web Components, interface patterns, accessibility guidance and implementation decisions. I designed and developed the system while working at RanchiMall; it is currently in use there. The case study shows how I connect UX thinking, visual design and frontend development in one working project.

Run locally with:

```sh
python -m http.server 8080
```

Then visit `http://localhost:8080/website/`.

## Build and verification

The website's generated token and component artifacts can be regenerated and checked with:

```sh
npm test
```

The repository is a static project and does not require a framework build step to browse the portfolio.
