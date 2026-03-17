# Drupal Action List (Exact Steps)

This is a practical implementation path for rebuilding the current KARC homepage on Drupal 11.

## Platform Decision

- Required CMS target: Drupal 11
- Any module/theme choice must be compatible with Drupal 11.
- Prefer admin route paths below to avoid UI label differences between minor versions.

## 1. Main Navigation Cleanup

Admin path: `/admin/structure/menu/manage/main`

1. Keep these top-level links only:
- Stories
- Calendar
- Repeaters
- About
- Join
- Contact
- Resources
2. Move low-use links under `Resources` as children.
3. Set menu weight so order matches the list above.
4. Save and clear cache if order does not update immediately.

## 2. Story Content Type

Admin path: `/admin/structure/types`

1. Create (or confirm) content type: `Story`.
2. Add fields:
- `field_summary` (Text)
- `field_story_topic` (Taxonomy term reference)
- `field_featured_story` (Boolean)
- `field_hero_image` (Image)
3. Set publishing defaults:
- Promoted to front page: off
- Sticky at top: off
4. Ensure URL alias pattern exists for stories if Pathauto is enabled.

## 3. Event Content Type (Calendar Source)

Admin path: `/admin/structure/types`

1. Create (or confirm) content type: `Event`.
2. Add fields:
- `field_event_date` (Date)
- `field_event_end` (Date, optional)
- `field_location` (Text)
- `field_event_link` (Link)
- `body` (Long text, optional details/agenda)
3. Require title and start date.
4. Set `field_event_date` widget to date + time if meeting times matter.
5. Keep one authoritative event node per event.
6. Create one sample Event at `/node/add/event` and use it to verify the calendar hookup.

## 4. Views for Homepage Story Discovery

Admin path: `/admin/structure/views`

1. Create view: `featured_story`
- Show: Content of type Story
- Filter: `field_featured_story = Yes`, `Published = Yes`
- Sort: Newest first
- Display: Block
- Items: 1

2. Create view: `latest_stories`
- Show: Content of type Story
- Filter: `Published = Yes`
- Sort: Newest first
- Display: Block
- Items: 5
- Exposed filter: Topic (optional, if taxonomy view is desired)

3. Create view: `upcoming_events`
- Show: Content of type Event
- Filter: `field_event_date >= now`
- Sort: `field_event_date ASC`
- Display: Block
- Items: 5

## 5. Place Blocks on Homepage

Admin path: `/admin/structure/block`

1. Assign regions on front page:
- `featured_story` block near top content region
- `latest_stories` below featured block
- `upcoming_events` in sidebar or lower content region
2. Hide old duplicate story/event blocks to reduce clutter.
3. Save block layout.

## 6. Calendar Alignment

Admin path: `/admin/structure/views/view/calendar`

1. Edit the calendar view to use `Content` as the base if needed.
2. Add filter: `Content type = Event`.
3. Map the calendar date source to `field_event_date`.
4. Add title and date fields to the calendar display.
5. Keep mini calendar in sidebar; add `Full calendar` link near it.
6. Confirm adding an Event node appears in both calendar and upcoming events block.

## 7. Admin Shortcuts

Admin path: `/admin/config/user-interface/shortcut/manage/default`

1. Add quick links for editors:
- Add Story (`node/add/story`)
- Add Event (`node/add/event`)
- Edit Main Menu (`admin/structure/menu/manage/main`)
- Views (`admin/structure/views`)
2. Save and test with editor role account.

## 8. Permissions

Admin path: `/admin/people/permissions`

1. Editor role:
- Create/edit own Story and Event
- Access content overview
- Use text format needed for story body
2. Publisher role:
- Publish/unpublish Story and Event
3. Admin role:
- Manage menus, views, and blocks

## 9. Weekly Operating Routine

1. Add or update upcoming events for next 4-6 weeks.
2. Publish at least 1 fresh story.
3. Mark one story as featured.
4. Verify homepage story and calendar blocks.
5. Check broken links on newly published content.

## 10. Acceptance Checks

- Stories discoverable in 1-2 clicks from homepage.
- Calendar updates from Event entries without manual duplication.
- Editors can update content without touching theme code.
- Navigation remains under 7 top-level items.
