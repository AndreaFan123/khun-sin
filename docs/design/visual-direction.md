# Visual Direction — Education Site

**Status:** Accepted, 2026-10-24. The approved homepage prototype is `.audit/brand-prototype/landing-current-content.html`. This decision supersedes the earlier navy / paper / amber layout and homepage wave system.

**Applies to:** all `education/` routes and both locales. Existing source copy, rescue instructions, datasets, metadata, asset provenance, citations, and route relationships remain authoritative.

## Glacier / Pacific

Use quiet blue surfaces, generous spacing, and the approved restrained brutalist accents. Strong headings, large report-step numbers and decisive action shapes establish hierarchy. Cards use an 8px radius and actions use 6px. Static cards retain soft 1px borders; full-card navigation links use 1.5px primary-text borders. Avoid hard shadows, loud color blocks and extra decorative rules. The homepage centers the large 118 message over the original ocean video with a readable theme-colored overlay. Four report steps form a two-column grid on desktop and one column below 800px. The complete do / don't lists sit in rounded panels. Navigation retains the original Khun-Sin wordmark, visible desktop links, locale switcher, and sticky header that becomes a floating pill after scrolling. Its opaque theme surface preserves text contrast over dark sections. On smaller screens, the original bottom bar keeps menu, language, and 118 access. The modal navigation sheet also contains language and 118 links. One header icon opens device, light, and dark preferences with visible text and native radio controls. Decorative arrows, heading rules, and wave dividers are removed from the shared page composition.

| Role                    | Light: Glacier | Dark: Pacific |
| ----------------------- | -------------- | ------------- |
| Page                    | `#E8F2F4`      | `#0A3A5A`     |
| Card                    | `#F7FBFB`      | `#0E4B70`     |
| Soft surface / footer   | `#D5E6EA`      | `#072B43`     |
| Primary text / headings | `#153B57`      | `#F0F8FB`     |
| Secondary text          | `#345267`      | `#C2D9E5`     |
| Link / focus            | `#056A82`      | `#83D5E7`     |
| Attention               | `#A84E36`      | `#F0A66A`     |
| Text on attention       | `#FFFFFF`      | `#173149`     |
| Border                  | `#A9C2C9`      | `#5C8097`     |

`app.css` owns semantic tokens. Components consume `--bg`, `--bg-card`, `--bg-soft`, `--text-primary`, `--text-secondary`, `--heading`, `--signal`, `--accent`, and `--on-accent`. Ordinary reading sections, data pages, maps, research KPIs, threat cards, rescue instructions, county tables, tooltips and photo-credit panels follow the active theme. Light mode uses light surfaces throughout ordinary content, rather than keeping fixed dark data bands.

Fixed legacy ramps remain available for chart series, status chips, and explicitly dark photographic sections; they are not globally inverted with the page theme. Actual photo overlays use `--text-on-dark`, `--text-on-dark-secondary`, and `--accent-on-dark`. Cetacean and turtle photo heroes, the white dolphin photo introduction, the turtle journey photograph and the homepage ocean video keep their existing media treatment. Status chip backgrounds retain matching fixed foregrounds. Chart labels and surrounding surfaces use semantic tokens.

Maps use `--map-land`, `--map-outline`, `--map-marker`, `--map-emphasis` and `--map-label`. Their legend uses the same marker and emphasis tokens. In light mode, the land is soft blue, normal markers are deep teal and emphasized markers are rust. In dark mode, the land is deep blue with bright teal outlines and markers. Halos remain decorative. Labels use primary text, and county-table text follows the active mode. Small KPI unit text uses secondary ink because rust on the soft light surface does not meet ordinary-text contrast.

## Display preference

The root `data-theme` attribute stores `auto`, `light`, or `dark`. CSS follows `prefers-color-scheme` in auto mode, including later system changes. A small guarded script applies a valid saved preference before paint. The icon controls read that root state after mounting and persist changes locally; blocked browser storage leaves the current selection usable. Without JavaScript, auto mode follows the device. Theme state does not belong to route data or the locale context.

## Typography and interaction

Headings default to weight 800 with modest negative letter spacing. Preserve the existing responsive type sizes, paragraph line heights, content widths and section spacing. Photo headings are already large and do not need further enlargement. Navigation labels, metric labels and body text retain their own weights. Keep functional circles and pills for theme controls, status badges, map symbols and the floating Navbar; content buttons use the shared action radius. Lucide supplies interface icons.

Interactive elements use explicit 180ms hover transitions for color, background, borders and underline offset. Action buttons and full-card links may move up 2px on devices with a fine pointer and hover support. Static cards remain still. Reduced motion disables these transitions and lifts. The skip link remains immediate, and keyboard focus outlines are not animated. Navbar scrolling, Chevron rotation, chart reveals and tooltip behavior retain their own motion rules.

Keep the existing Noto Sans TC / PingFang TC / Microsoft JhengHei / system stack and the original wordmark identity, including its colored tittle. No font downloads or new dependencies. Root and body text start at 18px on desktop and mobile. Secondary labels remain readable; chart labels retain their dedicated scale. Body line height is at least 1.6. Homepage copy is unchanged in both locales.

Use native button keyboard behavior. Escape closes the mobile menu and returns focus to its menu button. Following a link closes it and lets focus move to the destination; crossing the desktop breakpoint returns focus to a visible header control. Keep every navigation destination, locale counterpart, support page, and direct 118 call accessible. A visible direct-call link remains in the homepage hero. Radio arrow keys change the theme while keeping the panel open; pointer selection, Enter, or Space confirms and closes it.

## Content navigation

Group stranding data and maps beneath each animal overview in navigation. Each animal label is a disclosure button with an SVG chevron; the first dropdown link opens its overview. Report and disclosure controls share a44px height and vertically centered text. Overview pages place two resource cards after their narrative content, linking directly to their animal's tools.

Each animal has its own `stranding-data` and `stranding-map` child routes in both languages. Child pages render only that animal, with breadcrumbs linking home, the animal overview and the current tool. The old `/data` and `/map` routes are compact animal-selection hubs, retaining `#cetaceans` and `#sea-turtles` targets for old bookmarks. White dolphin detail remains under cetaceans. Language changes preserve the animal and tool destination, plus supported fragments on legacy hubs and detail pages.

Chinese statistics-tool labels use「擱淺統計」across navigation, cards, breadcrumbs, page headings and metadata. Existing `stranding-data` URLs and English labels remain unchanged. Footer navigation provides the two animal overviews, with support access retained separately. Generic statistics and map links are removed from Footer. The four legacy shared hubs remain directly accessible for compatibility and are not required destinations in the home-navigation reachability check; all ordinary content pages retain that check.

Page components own breadcrumb placement. Photo pages render the shared breadcrumb inside their existing Hero content layer, aligned with the heading and using `tone="media"` for fixed light text and focus outlines. Statistics, maps, compatibility hubs and support pages place `tone="surface"` breadcrumbs above their headings inside the existing content container. The breadcrumb has no separate width or wrap padding, and the global layout no longer adds a strip. Home pages have no breadcrumb; every other registered page has exactly one. Trails can wrap on narrow screens without dropping parent links.

Maps provide expandable HTML county tables. Stacked charts provide a contrasting segment separator and expandable dead/live count tables. Source notes distinguish individuals from event counts and identify the period and original report. Verified white dolphin monitoring belongs in the white dolphin detail; general cetacean research records stay in general conservation content.

Reduced motion hides and pauses the homepage ocean video; changing the preference resumes or pauses playback appropriately. Preserve existing reduced-motion behavior for maps, charts, and other page animations. Visible focus, text labels, status wording, and chart value labels remain required; color alone must not convey information. New color pairs require contrast verification against their actual surfaces, including photo overlays.
