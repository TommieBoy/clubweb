# Implementation Checklist

## Platform Baseline

- [ ] Confirm hosting environment supports Drupal 11 requirements.
- [x] Lock project target to `Drupal 11` and use only Drupal 11 compatible modules/themes.
- [x] Use `drupal-11-execution-order.md` as the master implementation sequence.
- [x] Use `navigation-build-sheet.md` for the menu cleanup sequence.
- [x] Use `event-calendar-build-sheet.md` for the Event/calendar setup sequence.
- [x] Use `story-homepage-build-sheet.md` for the Story and homepage views setup sequence.
- [x] Use `roles-permissions-shortcuts-build-sheet.md` for roles, permissions, and admin shortcuts.
- [x] Use `homepage-block-placement-guide.md` for homepage region and block order decisions.
- [x] Use `migration-tracker.md` to track status, owner, and notes during implementation.
- [x] Use `live-build-session-01.md` to start the first real Drupal admin work session.

## Phase 1: Information Architecture

- [ ] Update main navigation to the proposed 7-item structure.
- [ ] Move low-use links into `Resources` dropdown.
- [ ] Confirm all menu labels are short and plain language.

## Phase 2: Content Model

- [ ] Create/confirm content type `Story` with summary + tags.
- [ ] Create content type `Event`.
- [ ] Add Event fields: start date, end date, location, related link, body.
- [ ] Require Event title and start date.
- [ ] Add `Featured on homepage` field to Story.

## Phase 3: Homepage Blocks

- [ ] Build `featured_story` view (1 item).
- [ ] Build `latest_stories` view (5 items).
- [ ] Build `upcoming_events` view (next 5 items).
- [ ] Connect the calendar view to Event content using `field_event_date`.
- [ ] Add topic/tag browse block.

## Phase 4: Admin UX

- [ ] Add shortcuts for Add Story/Add Event in admin toolbar.
- [x] Document weekly publishing routine.
- [ ] Assign role permissions for Editor/Publisher/Admin.

## Phase 5: QA

- [ ] Test desktop + mobile homepage behavior.
- [ ] Confirm story links and filters work.
- [ ] Create a test Event and confirm it appears on the calendar.
- [ ] Confirm calendar block reflects Event updates.
- [ ] Check for broken links after changes.
