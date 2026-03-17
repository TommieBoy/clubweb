# Story and Homepage Views Build Sheet

This is a click-by-click Drupal 11 setup guide for creating the `Story` content type and connecting it to the homepage story blocks.

## Goal

- Create one `Story` content type for articles and club stories.
- Use homepage views to show one featured story and a list of latest stories.
- Keep story discovery within 1-2 clicks from the homepage.

## Before You Start

- Confirm you are working on the Drupal 11 site.
- Log in as a user with permission to manage content types, views, media, and permissions.
- If the homepage already has story blocks, note their current filters before changing them.

## Step 1: Create Content Type

Admin path: `/admin/structure/types/add`

1. Click `Add content type`.
2. Name: `Story`
3. Machine name: `story`
4. Description: `Club story or article for homepage and archive listings.`
5. Save and manage fields.

## Step 2: Add Story Fields

Admin path: `/admin/structure/types/manage/story/fields`

Add these fields:

1. `field_summary`
- Type: `Text (plain)` or `Text (formatted, long)`
- Label: `Summary`
- Required: yes

2. `field_story_topic`
- Type: `Taxonomy term reference`
- Label: `Story topic`
- Reference vocabulary: create or use `Story topics`
- Required: no

3. `field_featured_story`
- Type: `Boolean`
- Label: `Featured on homepage`
- Required: no

4. `field_hero_image`
- Type: `Image` or `Media reference` depending on site setup
- Label: `Featured image`
- Required: no

5. `body`
- Use the standard Body field if available.
- Label: `Body`
- Required: yes

## Step 3: Configure Form Display

Admin path: `/admin/structure/types/manage/story/form-display`

1. Place fields in this order:
- Title
- Summary
- Body
- Story topic
- Featured image
- Featured on homepage
2. Save.

## Step 4: Configure Display

Admin path: `/admin/structure/types/manage/story/display`

1. Show these fields on full view:
- Title
- Featured image
- Summary
- Body
- Story topic
2. Hide the `Featured on homepage` field from public display.
3. Save.

## Step 5: Create Story Topics Vocabulary

Admin path: `/admin/structure/taxonomy`

1. Create vocabulary: `Story topics` if it does not exist.
2. Add a few starter terms.
3. Confirm `field_story_topic` points to this vocabulary.

## Step 6: Create Test Stories

Admin path: `/node/add/story`

1. Create at least two sample Story nodes.
2. Mark one of them as `Featured on homepage`.
3. Publish both.
4. Confirm the nodes save correctly.

## Step 7: Build Featured Story View

Admin path: `/admin/structure/views/add`

1. Create view name: `featured_story`.
2. Show: `Content` of type `Story`.
3. Create a block display.
4. Add filters:
- `Published = Yes`
- `Content type = Story`
- `Featured on homepage = True`
5. Sort by newest first.
6. Limit to 1 item.
7. Add fields or use rendered entity output.
8. Save.

## Step 8: Build Latest Stories View

Admin path: `/admin/structure/views/add`

1. Create view name: `latest_stories`.
2. Show: `Content` of type `Story`.
3. Create a block display.
4. Add filters:
- `Published = Yes`
- `Content type = Story`
5. Sort by newest first.
6. Limit to 5 items.
7. Add title, summary, topic, date, and image as needed.
8. Save.

## Step 9: Optional Topic Browse

Admin path: `/admin/structure/views/add`

1. Create a taxonomy-based block or simple list for `Story topics`.
2. Use it for a homepage `Browse by Topic` section if desired.
3. Save.

## Step 10: Place Homepage Blocks

Admin path: `/admin/structure/block`

1. Place `featured_story` in the featured story region near the top of the homepage.
2. Place `latest_stories` below it.
3. Place the topic block if used.
4. Restrict block visibility to the homepage if needed.
5. Save block placement.

## Step 11: Story URLs

Admin path: `/admin/config/search/path/patterns`

1. If Pathauto is enabled, add or confirm the Story pattern.
2. Recommended pattern: `stories/[node:title]`
3. Save.

## Step 12: Permissions

Admin path: `/admin/people/permissions`

For the editor role, allow:

- Create Story content
- Edit own Story content
- Delete own Story content if appropriate
- Access content overview

For the publisher/admin role, allow:

- Edit any Story content
- Publish or unpublish Story content as needed
- Administer views

## Verification

1. Confirm the featured story block shows exactly one featured Story.
2. Confirm latest stories shows the newest 5 published Story nodes.
3. Confirm non-Story content does not appear in either block.
4. Confirm the homepage has a clear `View all stories` link.
5. Confirm story pages show breadcrumbs and topic terms if desired.

## Safe Rollback

- If a homepage view breaks, disable or unplace the affected block and save.
- If test stories should not remain visible, unpublish them first.