# picolo

A minimal, semantic Zola theme built with [PicoCSS](https://picocss.com). This theme emphasizes clean, class-light HTML and automatic responsive design with built-in light/dark mode support.

## Features

- **Minimal & Semantic**: Built with PicoCSS's class-light philosophy
- **Responsive by Default**: Automatically adapts to all screen sizes
- **Dark Mode**: Automatic light/dark theme based on system preferences
- **Fast & Lightweight**: No JavaScript dependencies
- **Customizable**: Easy to customize via CSS variables and Sass
- **Syntax Highlighting**: Built-in code syntax highlighting
- **Blog-Ready**: Pagination, sections, and blog post structure included

## Requirements

- **Zola** >= 0.18.0 - [Install Zola](https://www.getzola.org/documentation/getting-started/installation/)
- **Git** - Required for theme installation via submodule

## Installation

### Using this repository directly

1. Clone this repository
2. Run `zola serve` to preview locally
3. Customize `config.toml` to your preferences

### Using as a theme

1. Create a new Zola site or navigate to your existing one:
   ```bash
   zola init my-site
   cd my-site
   ```

2. Initialize git in your project (if not already done):
   ```bash
   git init
   ```

3. Add the theme as a git submodule:
   ```bash
   git submodule add https://github.com/faizmokh/picolo themes/picolo
   git submodule update --init --recursive
   ```

4. Update your `config.toml` to use the theme:
   ```toml
   theme = "picolo"
   ```

5. Copy the configuration options from `themes/picolo/config.toml` to your project's `config.toml`:
   - Copy the `[extra]` section and customize as needed
   - See the [Configuration](#configuration) section below for all available options

6. Start the development server:
   ```bash
   zola serve
   ```

#### Updating the Theme

To update the theme to the latest version:

```bash
cd themes/picolo
git pull origin main
cd ../..
git add themes/picolo
git commit -m "Update picolo theme"
```

Or update all submodules at once:

```bash
git submodule update --remote
```

## Configuration

Customize the theme by adding these variables to your `config.toml`:

```toml
[extra]
# PicoCSS settings
pico_cdn_version = "2"              # PicoCSS version (1 or 2)
pico_use_cdn = true                 # Use CDN or local PicoCSS
pico_theme = "indigo"               # Color theme (see available options below)

# Site metadata
site_author = "Your Name"
site_description = "Your site description"

# Navigation
show_nav = true
nav_items = [
    { path = "/", name = "Home" },
    { path = "/blog", name = "Blog" },
    { path = "/about", name = "About" }
]

# Pagination settings
pagination_enabled = true              # Global toggle to enable/disable pagination
pagination_default_items = 10          # Default number of items per page (for documentation)

# Footer
show_footer = true                  # Set to false to hide the footer
footer_text = "© 2025 Your Name • Built with Zola & PicoCSS"
footer_extra_content = ""           # Optional: Additional HTML content (displayed above footer_text)
# Example: footer_extra_content = "&copy; 2025 Your Name | <a href=\"/privacy\">Privacy</a>"
```

### Theme Colors

The `pico_theme` option allows you to customize the color scheme. Available options:

- `"default"` - PicoCSS default theme
- Color themes: `"indigo"`, `"blue"`, `"red"`, `"pink"`, `"fuchsia"`, `"purple"`, `"violet"`, `"cyan"`, `"jade"`, `"green"`, `"lime"`, `"yellow"`, `"amber"`, `"pumpkin"`, `"orange"`, `"sand"`, `"grey"`, `"zinc"`, `"slate"`

See [PicoCSS Color Schemes](https://picocss.com/docs/colors) for previews of each theme.

### Hero text color

Set one site-wide color mode for all hero text in `zola.toml`:

```toml
[extra.picolo]
hero_text_color = "default" # Pico's scheme-aware --pico-color
```

Options are `"default"` (uses `--pico-color`), `"inverse"` (uses `--pico-primary-inverse`), or any CSS color/value such as `"#f8f9fa"` or `"var(--pico-muted-color)"`. This applies to the hero title, description, metadata, and tags.

To override the global setting for one page, set `text_color` in that page's `[extra.hero]` front matter:

```toml
[extra.hero]
images = ["content/blog/example/hero.jpg"]
text_color = "inverse" # or a CSS color/value
```

### Categories and tags

Enable the `categories` and `tags` taxonomies in the site's `zola.toml`:

```toml
taxonomies = [
    { name = "categories", render = true, feed = false },
    { name = "tags", render = true, feed = false },
]
```

Assign terms to a page in its front matter:

```toml
[taxonomies]
categories = ["notes"]
tags = ["writing", "notes"]
```

The theme renders the taxonomy index pages at `/categories/` and `/tags/`, term pages such as `/categories/notes/` and `/tags/writing/`, and links the category and tags in `ui.article_head` to their corresponding term pages.

### Pagination

Control how sections display their pages with configurable pagination settings:

- `pagination_enabled` (default: `true`) - Master toggle to show/hide pagination controls globally
- `pagination_default_items` (default: `10`) - Recommended default for items per page

**To enable pagination for a section**, add `paginate_by` to the section's front matter (e.g., `content/blog/_index.md`):

```toml
+++
title = "Blog"
sort_by = "date"
paginate_by = 10          # Show 10 posts per page
template = "section.html"
+++
```

**Behavior:**
- `pagination_enabled = true` (default): Sections with `paginate_by` show pagination controls (Previous/Next buttons)
- `pagination_enabled = false`: Hides pagination controls but sections with `paginate_by` still show posts page-by-page
- To show **all posts on one page**: Remove the `paginate_by` line from the section's front matter

## Customization

### If Using as a Git Submodule (Recommended)

**Important:** Don't edit files inside `themes/picolo/` directly - your changes will be lost when updating the theme.

#### Override Templates

Copy any template from `themes/picolo/templates/` to your project's `templates/` directory. Your version will take precedence over the theme's version.

**Available templates:**
- `base.html` - Base template with header/footer
- `index.html` - Homepage
- `page.html` - Individual pages
- `section.html` - Section listings (blog)
- `404.html` - Error page

**Example:** To customize the base template:
```bash
cp themes/picolo/templates/base.html templates/base.html
# Now edit templates/base.html
```

#### Custom Styles

Create your own Sass files in your project root (not in the theme directory):

1. **Override CSS Variables** - Create `sass/variables.scss` in your project:
   ```scss
   :root {
       --pico-font-size: 18px;
       --pico-spacing: 1.5rem;
       --pico-primary: #0066cc;
   }
   ```

2. **Add Custom Styles** - Create `sass/custom.scss` in your project:
   ```scss
   // Your custom styles here
   .custom-header {
       color: var(--pico-primary);
   }
   ```

3. **Include in Templates** - Override `templates/base.html` and add your stylesheet:
   ```html
   <link rel="stylesheet" href="{{ get_url(path="custom.css") }}">
   ```

Zola will automatically compile your Sass files to `public/`.

#### Using CDN vs Local PicoCSS

By default, the theme uses PicoCSS from CDN. To use a local copy:

1. Download PicoCSS to your `static/` directory
2. Set `pico_use_cdn = false` in `config.toml`
3. Override `templates/base.html` and update the stylesheet link

### If Using Directly (Cloned Repository)

When working directly with a clone of this repository, you can edit theme files directly:

- **CSS Variables**: Edit `sass/_variables.scss` for CSS variable overrides
- **Custom Styles**: Edit `sass/_custom.scss` for additional styles
- **Templates**: Edit files in `templates/` directory
- All Sass files are automatically compiled by Zola

## Content Structure

```
content/
├── _index.md          # Homepage
├── about.md           # About page
└── blog/
    ├── _index.md      # Blog section
    └── *.md           # Blog posts
```

## Shortcodes

### Note/Callout Box

Create highlighted callout boxes:

```
{{/* note(title="Important") */}}
This is a callout box for important information.
{{/* end */}}
```

## Development

1. Clone the repository
2. Run `zola serve` for live preview
3. Edit templates in `templates/`
4. Edit styles in `sass/`
5. Build with `zola build`

## Credits

- **Zola**: [getzola.org](https://www.getzola.org)
- **PicoCSS**: [picocss.com](https://picocss.com)

## License

MIT License - see LICENSE file for details.
