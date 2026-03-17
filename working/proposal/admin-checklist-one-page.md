# KARC Website Update Checklist (One Page)

## Goal

Make stories easy to find and make routine admin updates fast.

Use `drupal-11-execution-order.md` as the master sequence and this file as the short admin reference.

## 1) Main Menu

Admin path: `/admin/structure/menu/manage/main`

- Keep only 7 top links: Stories, Calendar, Repeaters, About, Join, Contact, Resources
- Move less-used links under Resources

## 2) Story Content Type

Admin path: `/admin/structure/types/manage/story/fields`

- Required fields: Title, Summary, Topic, Featured on homepage, Image
- Save display so Summary appears in teaser/list views

## 3) Event Content Type

Admin path: `/admin/structure/types/manage/event/fields`

- Required fields: Title, Start date/time
- Optional fields: End date/time, Location, Related link

## 4) Homepage Blocks (Views)

Admin path: `/admin/structure/views`

- `featured_story`: 1 item, Featured=yes, Published
- `latest_stories`: 5 newest published stories
- `upcoming_events`: next 5 events by date

## 5) Block Placement

Admin path: `/admin/structure/block`

- Featured Story at top
- Latest Stories below featured
- Upcoming Events in sidebar or below main content
- Remove duplicate/old blocks

## 6) Admin Shortcuts

Admin path: `/admin/config/user-interface/shortcut/manage/default`

Add quick links:
- Add Story: `/node/add/story`
- Add Event: `/node/add/event`
- Edit Main Menu: `/admin/structure/menu/manage/main`
- Views: `/admin/structure/views`

## 7) Quick Test Before Finish

- Publish one Story and one Event
- Verify Story appears in latest stories
- Verify Event appears in calendar and upcoming events
- Check homepage on mobile

## Done When

- Visitors can find stories in 1-2 clicks
- Admins can update stories/events without editing code
- Calendar and event list are driven by Event entries
