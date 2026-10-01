+++
title = "Using Shortcodes"
date = 2025-01-03
description = "How to use custom shortcodes to enhance your content"
+++

Zola supports custom shortcodes that let you add reusable components to your content. This theme includes a `note` shortcode for creating callout boxes.

## What are Shortcodes?

Shortcodes are snippets of code that expand into HTML when your site is built. They're perfect for adding common elements without writing HTML directly in your markdown.

## The Note Shortcode

This theme includes a `note` shortcode for highlighting important information. Here's how to use it:

{% <ui.note title="Pro Tip"> %}
You can use the note shortcode to draw attention to important information, tips, warnings, or any content that deserves special emphasis.
{% </ui.note> %}

## Another Example

{% <ui.note title="Did You Know?"> %}
PicoCSS automatically styles the `<aside>` element, which is what this shortcode uses. This means the note boxes automatically adapt to light and dark mode without any extra styling!
{% </ui.note> %}

## Without a Title

You can also use the shortcode without a title:

{% <ui.note> %}
This is a note without a title. It's useful for simple callouts that don't need a heading.
{% </ui.note> %}

## How It Works

The shortcode is defined in `templates/shortcodes/note.html` and uses PicoCSS's semantic styling for the `<aside>` element. The markdown content inside the shortcode is automatically converted to HTML.

## Creating Your Own Shortcodes

Want to add your own shortcodes? Just create a new HTML file in the `templates/shortcodes/` directory and use it in your content!

{% <ui.note title="Learn More"> %}
Check out the [Zola documentation on shortcodes](https://www.getzola.org/documentation/content/shortcodes/) to learn how to create your own custom components.
{% </ui.note> %}
