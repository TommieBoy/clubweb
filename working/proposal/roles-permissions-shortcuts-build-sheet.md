# Roles, Permissions, and Shortcuts Build Sheet

This is a click-by-click Drupal 11 setup guide for defining admin roles, assigning content permissions, and adding useful editor shortcuts.

## Goal

- Let editors manage stories and events without touching site configuration.
- Let publishers approve content.
- Keep menu, view, and block configuration limited to site admins.

## Recommended Roles

- Editor
- Publisher
- Site Admin

## Before You Start

- Confirm you are working on the Drupal 11 site.
- Log in as a user with permission to manage people, roles, permissions, and shortcuts.
- Review any existing custom roles before changing permissions.

## Step 1: Review Existing Roles

Admin path: `/admin/people/roles`

1. Review existing roles.
2. Reuse compatible roles if they already exist.
3. Create missing roles:
- Editor
- Publisher
- Site Admin
4. Save.

## Step 2: Configure Editor Permissions

Admin path: `/admin/people/permissions`

Grant the Editor role permission to:

- Access content overview
- Create Story content
- Edit own Story content
- Delete own Story content if appropriate
- Create Event content
- Edit own Event content
- Delete own Event content if appropriate
- Use the required text format for story and event body fields
- Access media library if images are used

Do not grant Editor permission to:

- Administer views
- Administer blocks
- Administer menus
- Administer content types
- Administer permissions

## Step 3: Configure Publisher Permissions

Admin path: `/admin/people/permissions`

Grant the Publisher role permission to:

- Access content overview
- Edit any Story content
- Edit any Event content
- Delete any Story content if appropriate
- Delete any Event content if appropriate
- Publish and unpublish Story content if moderation is enabled
- Publish and unpublish Event content if moderation is enabled

Keep site configuration permissions off unless there is a clear operational need.

## Step 4: Configure Site Admin Permissions

Admin path: `/admin/people/permissions`

Grant the Site Admin role permission to:

- Administer menus
- Administer views
- Administer block layout
- Administer content types
- Administer taxonomy
- Administer URL aliases or Pathauto settings if used

Grant broader configuration permissions only if this role is intended to manage the whole site.

## Step 5: Create or Edit Shortcut Set

Admin path: `/admin/config/user-interface/shortcut/manage/default`

1. Open the default shortcut set or a custom editor shortcut set.
2. Add these shortcuts:
- Add Story: `/node/add/story`
- Add Event: `/node/add/event`
- Edit Main Menu: `/admin/structure/menu/manage/main`
- Views: `/admin/structure/views`
- Content: `/admin/content`
3. Save.

## Step 6: Assign Shortcut Set

Admin path: `/admin/config/user-interface/shortcut`

1. Assign the shortcut set to the roles or users who need it.
2. Confirm editors see only useful shortcuts.
3. Save.

## Step 7: Test with Real Accounts

1. Log in as an Editor test account.
2. Confirm the user can add Story and Event content.
3. Confirm the user cannot edit views, menus, or block layout.
4. Log in as a Publisher test account.
5. Confirm the user can manage published content as intended.
6. Log in as a Site Admin test account.
7. Confirm the user can reach menus, views, and block layout.

## Verification

1. Editors can add and update content without configuration access.
2. Publishers can manage publishing flow if needed.
3. Site Admin can manage menus, views, and block layout.
4. Shortcut links open the expected Drupal 11 routes.
5. No role has more permission than required.

## Safe Rollback

- If a role loses needed access, restore only the missing permissions instead of broadening the whole role.
- If a shortcut set is confusing, remove individual shortcuts rather than deleting the whole set.