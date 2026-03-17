# Drupal 11 Execution Order

This document puts the proposal work into a practical build order for the Drupal 11 rebuild.

## Use These Detailed Guides

- `navigation-build-sheet.md`
- `story-homepage-build-sheet.md`
- `event-calendar-build-sheet.md`
- `roles-permissions-shortcuts-build-sheet.md`
- `homepage-block-placement-guide.md`
- `migration-tracker.md`
- `live-build-session-01.md`

## Recommended Order

## 1. Confirm Platform Baseline

- Confirm hosting supports Drupal 11.
- Confirm the project target is Drupal 11 only.
- Confirm any required modules or themes are Drupal 11 compatible.

## 2. Clean Up Navigation First

Guide: `navigation-build-sheet.md`
Suggested live session: `live-build-session-01.md`

Do this early because:

- It establishes the site structure.
- It keeps page placement decisions stable.
- It reduces confusion while testing later homepage changes.

Expected outcome:

- A 7-item top navigation with `Resources` holding low-use links.

## 3. Build the Story Content Model

Guide: `story-homepage-build-sheet.md`

Do this before homepage views because:

- The views depend on Story fields.
- Topic taxonomy and featured flags should exist before block setup.

Expected outcome:

- A working `Story` content type with summary, topic, image, and homepage feature flag.

## 4. Build the Event Content Model

Guide: `event-calendar-build-sheet.md`

Do this before calendar cleanup because:

- The calendar should use a real content type, not manual entries.
- Upcoming events blocks depend on the Event date field.

Expected outcome:

- A working `Event` content type with start date as the calendar source.

## 5. Build Homepage Story Views

Guide: `story-homepage-build-sheet.md`

Set up:

- `featured_story`
- `latest_stories`
- optional topic browse block

Expected outcome:

- Homepage story discovery works from real Story content.

## 6. Connect Calendar and Event Views

Guide: `event-calendar-build-sheet.md`

Set up:

- calendar view filtered to Event content
- `upcoming_events` block sorted by `field_event_date`

Expected outcome:

- Calendar and event list are driven by the same Event entries.

## 7. Place Homepage Blocks

Use `homepage-block-placement-guide.md` together with the story and event build sheets for this step.

Place:

- featured story block
- latest stories block
- upcoming events block
- optional topic browse block

Expected outcome:

- Homepage layout matches the proposal wireframe.

## 8. Configure Roles, Permissions, and Shortcuts

Guide: `roles-permissions-shortcuts-build-sheet.md`

Do this after major structure changes because:

- You can assign permissions against the final content model.
- Shortcut links can point to the final admin routes.

Expected outcome:

- Editors can manage content safely.
- Admin users can manage structure without giving that access to editors.

## 9. Run QA with Test Content

- Create test Story content.
- Create test Event content.
- Confirm homepage blocks render correctly.
- Confirm calendar updates from Event entries.
- Confirm mobile navigation and homepage layout remain usable.

## 10. Clean Up and Hand-Off

- Unpublish or remove temporary test content if needed.
- Update documentation if any field names or routes changed during implementation.
- Keep the build sheets as the operating reference for future site admins.
- Update `migration-tracker.md` as work moves from `not started` to `done`.

## Fast Implementation Summary

1. Navigation
2. Story content type
3. Event content type
4. Story views
5. Calendar and upcoming events
6. Block placement
7. Roles and shortcuts
8. QA

## Done Criteria

- Navigation is simplified and consistent.
- Stories are easy to find from the homepage.
- Calendar and event listings come from Event content.
- Editors can update stories and events without touching site configuration.