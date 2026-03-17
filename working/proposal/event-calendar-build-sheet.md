# Event and Calendar Build Sheet

This is a click-by-click Drupal 11 setup guide for creating the `Event` content type and making the calendar use it.

## Goal

- Create one content type for all calendar entries.
- Make the calendar read from `Event` content only.
- Make upcoming events blocks and calendar displays agree.

## Before You Start

- Confirm you are working on the Drupal 11 site.
- Log in as a user with permission to manage content types, views, and permissions.
- If the current calendar is already live, note its existing filters before changing it.

## Step 1: Create Content Type

Admin path: `/admin/structure/types/add`

1. Click `Add content type`.
2. Name: `Event`
3. Machine name: `event`
4. Description: `Calendar item for meetings and club events.`
5. Save and manage fields.

## Step 2: Add Event Fields

Admin path: `/admin/structure/types/manage/event/fields`

Add these fields in this order:

1. `field_event_date`
- Type: `Date`
- Label: `Start date`
- Required: yes

2. `field_event_end`
- Type: `Date`
- Label: `End date`
- Required: no

3. `field_location`
- Type: `Text (plain)`
- Label: `Location`
- Required: no

4. `field_event_link`
- Type: `Link`
- Label: `Related link`
- Required: no

5. `body`
- Use the standard Body field if available.
- Label: `Description`
- Required: no

## Step 3: Configure Form Display

Admin path: `/admin/structure/types/manage/event/form-display`

1. Place fields in this order:
- Title
- Start date
- End date
- Location
- Related link
- Description
2. Set `Start date` to a date and time widget if meeting times matter.
3. Save.

## Step 4: Configure Display

Admin path: `/admin/structure/types/manage/event/display`

1. Show these fields on full view:
- Title
- Start date
- End date
- Location
- Description
- Related link
2. Hide fields you do not want duplicated in teasers.
3. Save.

## Step 5: Create a Test Event

Admin path: `/node/add/event`

1. Create one sample event.
2. Use a future date.
3. Publish it.
4. Confirm the node saves correctly.

## Step 6: Connect Calendar View

Admin path: `/admin/structure/views/view/calendar`

1. Edit the existing calendar view.
2. Confirm the view is based on `Content`.
3. Add or update filter: `Content type = Event`.
4. Set the calendar date field to `field_event_date`.
5. Add these fields if the display needs them:
- Content: Title
- Content: field_event_date
- Content: field_location
6. Save the view.

## Step 7: Connect Upcoming Events Block

Admin path: `/admin/structure/views`

1. Create or edit view `upcoming_events`.
2. Show: `Content`
3. Filter: `Content type = Event`
4. Filter: `Published = Yes`
5. Filter: `field_event_date >= now`
6. Sort: `field_event_date ASC`
7. Create a block display.
8. Limit to 5 items.
9. Save.

## Step 8: Place the Block

Admin path: `/admin/structure/block`

1. Place the `upcoming_events` block in the desired region.
2. Restrict visibility if needed.
3. Save block placement.

## Step 9: Permissions

Admin path: `/admin/people/permissions`

For the editor role, allow:

- Create Event content
- Edit own Event content
- Delete own Event content if appropriate
- Access content overview

For the publisher/admin role, allow:

- Edit any Event content
- Delete any Event content if appropriate
- Administer views

## Verification

1. Add a second future Event.
2. Confirm both events appear on the calendar.
3. Confirm both events appear in `upcoming_events` in date order.
4. Edit one Event date and confirm the calendar updates.
5. Confirm no non-Event content appears on the calendar.

## Safe Rollback

- If the calendar display breaks, remove the new Event filter changes from the view and save.
- If needed, unpublish the test Event nodes rather than deleting them immediately.