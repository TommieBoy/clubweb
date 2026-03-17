# Navigation and Menu Cleanup Build Sheet

This is a click-by-click Drupal 11 setup guide for cleaning up the main navigation and moving low-use pages into a `Resources` menu group.

## Goal

- Keep the top navigation simple.
- Limit top-level navigation to 7 items.
- Make stories, calendar, and joining the club easier to find.

## Target Menu Structure

Top-level items:

1. Stories
2. Calendar
3. Repeaters
4. About
5. Join
6. Contact
7. Resources

Resources children:

- Club Constitution
- Club Personnel
- Meeting Minutes
- Forms
- Archive

## Before You Start

- Confirm you are working on the Drupal 11 site.
- Log in as a user with permission to manage menus.
- Open the homepage in a second tab for quick checks.

## Step 1: Open Main Navigation

Admin path: `/admin/structure/menu/manage/main`

1. Open the `Main navigation` menu.
2. Review the current top-level links.
3. Identify links that are low-use or duplicated elsewhere.

## Step 2: Keep Only the Core Top-Level Links

Admin path: `/admin/structure/menu/manage/main`

1. Keep only these items at the top level:
- Stories
- Calendar
- Repeaters
- About
- Join
- Contact
- Resources
2. Reorder menu items so they match the target structure.
3. Save.

## Step 3: Create or Confirm Resources Parent

Admin path: `/admin/structure/menu/manage/main`

1. Create `Resources` if it does not already exist.
2. Make sure `Resources` is a top-level item.
3. Save.

## Step 4: Move Low-Use Links Under Resources

Admin path: `/admin/structure/menu/manage/main`

1. Edit each low-use link.
2. Set its parent to `Resources`.
3. Save each change.
4. Repeat until only the core 7 items remain at the top level.

## Step 5: Check Labels

Admin path: `/admin/structure/menu/manage/main`

1. Keep labels short.
2. Prefer plain language.
3. Avoid labels longer than 1-2 words unless required.
4. Save any wording changes.

## Step 6: Verify Key Destinations

Confirm these links resolve correctly:

- Stories
- Calendar
- Repeaters
- About
- Join
- Contact

If a destination page changes later, update the menu link rather than adding duplicate links.

## Step 7: Homepage and Mobile Check

1. Refresh the homepage.
2. Confirm the new menu order appears correctly.
3. Confirm `Resources` opens or displays as expected.
4. Check mobile navigation for wrapping or overflow.

## Step 8: Optional Story Discovery Additions

If the menu design allows it:

1. Add `Latest Stories` under `Stories`.
2. Add `Story Topics` under `Stories`.
3. Keep these as secondary links, not top-level items.

## Verification

1. Top-level navigation count is 7 or fewer.
2. Stories and Calendar are visible without opening `Resources`.
3. Low-use pages are grouped under `Resources`.
4. No duplicate top-level links remain.
5. Navigation is readable on desktop and mobile.

## Safe Rollback

- If the new arrangement is confusing, move links back one by one rather than rebuilding the whole menu.
- If a menu link breaks, disable or edit only that link instead of reverting the entire menu.