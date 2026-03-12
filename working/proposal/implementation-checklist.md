# Implementation Checklist

## Phase 1: Information Architecture

- [ ] Update main navigation to the proposed 7-item structure.
- [ ] Move low-use links into `Resources` dropdown.
- [ ] Confirm all menu labels are short and plain language.

## Phase 2: Content Model

- [ ] Create/confirm content type `Story` with summary + tags.
- [ ] Create/confirm content type `Event` with date and location.
- [ ] Add `Featured on homepage` field to Story.

## Phase 3: Homepage Blocks

- [ ] Build `featured_story` view (1 item).
- [ ] Build `latest_stories` view (5 items).
- [ ] Build `upcoming_events` view (next 5 items).
- [ ] Add topic/tag browse block.

## Phase 4: Admin UX

- [ ] Add shortcuts for Add Story/Add Event in admin toolbar.
- [ ] Document weekly publishing routine.
- [ ] Assign role permissions for Editor/Publisher/Admin.

## Phase 5: QA

- [ ] Test desktop + mobile homepage behavior.
- [ ] Confirm story links and filters work.
- [ ] Confirm calendar block reflects Event updates.
- [ ] Check for broken links after changes.
