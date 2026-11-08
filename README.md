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
footer_text = "© 2026 Your Name • Built with Zola & PicoCSS"
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

### Hero image tint

Tint a hero image by overlaying a CSS color. Set `tint_colour`, `tint_amount`, and `tint_method` in `[extra.hero]`:

```toml
[extra.hero]
tint_colour = "#000000"
tint_amount = 0.25
tint_method = "multiply"
```

`tint_colour` accepts any CSS color and defaults to `"white"`. `tint_amount` is an opacity from `0` to `1` and defaults to `0`, so no tint is applied by default. `tint_method` selects the CSS blend mode and defaults to `"normal"`:

- `"normal"` applies a standard translucent color overlay.
- `"lighten"` keeps the lighter color values; `"screen"` is another lightening mode.
- `"darken"` keeps the darker color values.
- "multiply" multiplies the tint with the image, usually darkening it. Use a dark tint color; white has little or no effect with this mode.

To combine adjustments, add an ordered `tint_layers` array. The single `tint_*` settings above are applied first when `tint_amount` is greater than zero; then these layers are applied in order:

```toml
[extra.hero]
tint_layers = [
    { colour = "white", amount = 0.12, method = "screen" },
    { colour = "black", amount = 0.18, method = "multiply" },
    { colour = "#A82229", amount = 0.12, method = "normal" },
]
```

A white `screen` layer lifts shadows, a black `multiply` layer reduces highlights, and a final `normal` layer adds a color tint. Each layer has its own `colour`, `amount` (opacity from `0` to `1`), and `method`. The adjustments affect the full image, but their effect varies with each pixel's color; they are not separate shadow/highlight masks.

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

Set widths for taxonomy index and term pages in `config.toml` with `extra.taxonomy_container_widths`:

```toml
[extra.taxonomy_container_widths]
tags = "3xl"
categories = "4xl"
```

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

### Container widths

The theme provides these content-width tokens: `sm` (24rem), `md` (28rem), `lg` (32rem), `xl` (36rem), `2xl` (42rem), `3xl` (48rem), and `4xl` (56rem). Use `pico` to match PicoCSS `.container` max widths responsively, or `full` to use 100% of the available width. The `pico` option follows Pico's viewport widths: 510px at `sm`, 700px at `md`, 950px at `lg`, 1200px at `xl`, and 1450px at `xxl` (100% below `sm`). These content widths are independent of responsive breakpoints. All content types use the same site-wide default; if it is not configured, the theme uses `4xl`.

Set the default width and, optionally, a separate width for page/section headings and hero header content in `config.toml`:

```toml
[extra]
container_width = "4xl"
header_content_width = "3xl" # Optional; defaults to the resolved container_width
```

Override either value for an individual page, post, or section using its front matter:

```toml
[extra]
container_width = "3xl"
header_content_width = "xl" # Optional; applies to page/section and hero headers
```

A section can use one width for its listing and another default for its child pages. Set `page_container_width` in the section's `_index.md`:

```toml
[extra]
container_width = "2xl"      # The section listing
page_container_width = "3xl" # Pages rendered under this section
```

A child page's own `extra.container_width` overrides `page_container_width`. The section's `page_template` chooses which template renders those pages; the page width setting applies regardless of which page template is selected. `header_content_width` controls the heading/description area without changing the body width. Taxonomy pages use the site default and can still be overridden per taxonomy with `extra.taxonomy_container_widths` as shown above. Responsive rules use PicoCSS v2's breakpoint names and default thresholds: `sm` (576px), `md` (768px), `lg` (1024px), `xl` (1280px), and `xxl` (1536px). Theme media queries use the shared `bp.up()` and `bp.down()` mixins in `sass/settings/_breakpoints.scss`; `down(md)` means below 768px. The content-width tokens are defined separately in `sass/settings/_variables.scss`.

## Print styles

When printing, the theme hides the site header and navigation, along with the footer. Page content remains visible; links are underlined and their destination URLs are printed after the link text.

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

### Image viewer modal

Resized images rendered with `img.resize`, `ui.image_fit`, `ui.media_text`, and `ui.hero` open in an image modal by default. A single image opens by itself. A `ui.hero` slider opens as a gallery with full-height left/right navigation hotspots, slide-selection dots, keyboard arrow-key support, and synchronized slider position. The modal uses the larger image variant, and the image link still works as a fallback if JavaScript is unavailable. Set `slider_label` on `ui.hero` (or `extra.hero.slider_label` in page front matter) to show a heading above the modal gallery; when omitted, no visible heading is rendered. The slider region keeps an accessible `Image slider` label as a fallback. For example:

```toml
[extra.hero]
images = ["content/projects/example/one.jpg", "content/projects/example/two.jpg"]
slider = true
slider_label = "Project development photos"
```

Disable the modal for an individual component with `modal={false}`:

```markdown
{{ <ui.image_fit path={page.colocated_path ~ 'photo.jpg'} alt="A description of the image" modal={false} /> }}
```

For `ui.media_text`, set `link_url` to make the image navigate to a destination instead of opening the modal. `link_url` takes precedence over `modal`:

```markdown
{% <ui.media_text path={page.colocated_path ~ 'photo.jpg'} alt="A description of the image" link_url={page.permalink}> %}
Project description goes here.
{% </ui.media_text> %}
```

For a page or section hero, set `modal = false` in `[extra.hero]` front matter:

```toml
[extra.hero]
images = ["content/blog/example/hero.jpg"]
modal = false
```

### Video player

Embed a YouTube video by providing its URL and an accessible title:

```markdown
{{ <ui.video youtube_url="https://www.youtube.com/watch?v=VIDEO_ID" title="Project video" caption="Optional text shown below the video." /> }}
```

The component also accepts `youtu.be` share URLs, YouTube `/embed/`, `/shorts/`, and `/live/` URLs. It creates a responsive, lazy-loaded embed using YouTube's privacy-enhanced domain.

For a local video, provide its Zola path instead. A co-located asset can use Zola's `@/` syntax:

```markdown
{{ <ui.video video_file="@/projects/example/demo.mp4" title="Project demo" poster="@/projects/example/poster.jpg" captions_file="@/projects/example/captions.vtt" caption="Optional video caption." /> }}
```

For files in `static/`, use the path relative to that directory; for example, `video_file="videos/demo.mp4"` refers to `static/videos/demo.mp4`. The local player uses native controls and preloads metadata. `mime_type` defaults to `video/mp4`; set it to `video/webm` for WebM files. `poster` and `captions_file` are optional, and the captions file should be WebVTT. Use exactly one of `youtube_url` or `video_file`. Set a descriptive `title` for the YouTube iframe or local video player.

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
