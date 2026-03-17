# Admin One-Session Checklist (60-90 Minutes)

Use this in one working session to improve story discovery and simplify ongoing updates.

Use `drupal-11-execution-order.md` for the full build order and this file for a fast implementation session.

## Prep (5 min)

- [ ] Log in with an account that can edit menus, views, and content types.
- [ ] Open two tabs: homepage and admin dashboard.

## Step 1: Navigation Cleanup (10 min)

Admin path: `/admin/structure/menu/manage/main`

- [ ] Keep top-level items to: Stories, Calendar, Repeaters, About, Join, Contact, Resources.
- [ ] Move lower-priority items under Resources.
- [ ] Save menu and refresh homepage.

## Step 2: Story Content Fields (10-15 min)

Admin path: `/admin/structure/types/manage/story/fields`

- [ ] Confirm/add: Summary, Topic tags, Featured on homepage, Hero image.
- [ ] Ensure Summary is visible in teasers.
- [ ] Save fields and display settings.

## Step 3: Event Content Fields (10 min)

Admin path: `/admin/structure/types/manage/event/fields`

- [ ] Confirm/add: Start date/time, End date/time, Location, Related link.
- [ ] Make Start date/time required.
- [ ] Save fields and display settings.

## Step 4: Homepage Views Blocks (15-20 min)

Admin path: `/admin/structure/views`

- [ ] `featured_story` block: 1 published Story with Featured=yes.
- [ ] `latest_stories` block: 5 newest published Stories.
- [ ] `upcoming_events` block: next 5 Events by ascending date.
- [ ] Save each view and preview output.

## Step 5: Place Blocks (10 min)

Admin path: `/admin/structure/block`

- [ ] Place featured story near top homepage content.
- [ ] Place latest stories below featured story.
- [ ] Place upcoming events in sidebar or lower content area.
- [ ] Disable duplicate or older blocks causing clutter.

## Step 6: Editor Shortcuts (5 min)

Admin path: `/admin/config/user-interface/shortcut/manage/default`

- [ ] Add links: `/node/add/story`, `/node/add/event`, `/admin/structure/menu/manage/main`, `/admin/structure/views`.
- [ ] Verify editor role can access only needed links.

## Step 7: Quick QA (5-10 min)

- [ ] Publish one test Story and one test Event.
- [ ] Confirm Story appears in latest stories block.
- [ ] Confirm Event appears in upcoming events and calendar.
- [ ] Check mobile view quickly for readability.

## Done Criteria

- Visitors can find stories from homepage in 1-2 clicks.
- Admins can add Story/Event without touching theme code.
- Calendar and event list update from the same Event content.
