# Cloudflare Workers migration

Temporary deployment marker for the Cloudflare Workers migration.

Current route compatibility fix:
- removed the conflicting `/[lang]/[page]` dynamic route
- preserved `/about`, `/contact`, `/privacy`, and `/terms` as explicit routes
- kept article routing at `/[lang]/[category]/[slug]`

This file is intentionally non-runtime and can be removed after the migration is complete.
