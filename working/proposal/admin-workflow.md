# Admin Workflow

## Objective

Allow non-technical admins to update stories, events, and navigation with minimal training.

## Content Types

1. Story
- Title
- Summary
- Body
- Topic tags
- Publish date
- Featured image
- Featured on homepage (yes/no)

2. Event
- Title
- Date/time start
- Date/time end
- Location
- Description
- Related link
- This content type is the only source for calendar entries.

3. Announcement
- Title
- Short text
- Start date
- End date

## Roles

- Editor: create/edit Story and Event
- Publisher: approve and publish
- Site Admin: menu/config changes only

## Weekly Admin Routine

1. Add new stories.
2. Add or update Event items so the calendar stays current.
3. Confirm one featured story is selected.
4. Check homepage blocks show expected items.
5. Verify calendar entries display correctly.

## Update Paths

- Stories: `/node/add/story` (Content -> Add content -> Story)
- Events: `/node/add/event` (Content -> Add content -> Event)
- Menus: `/admin/structure/menu/manage/main` (Structure -> Menus -> Main navigation)
- Homepage views: `/admin/structure/views` (Structure -> Views)
- Permissions: `/admin/people/permissions` (People -> Permissions)

## Quality Checklist

- Story has summary and image.
- Event has date and location.
- No empty menu links.
- Homepage has at least 3 fresh stories.
- Calendar month has all upcoming meetings.

## Optional Improvements

- Add moderation workflow (Draft -> Review -> Published).
- Add auto-expire for announcements.
- Add monthly export of stories/events to archive.
