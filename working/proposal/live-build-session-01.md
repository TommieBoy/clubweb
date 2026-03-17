# Live Build Session 01

This is the first practical live Drupal 11 work session based on the execution order.

## Scope

Finish the first build steps that require access to the live Drupal admin:

1. Confirm Drupal 11 hosting readiness.
2. Clean up the main navigation.
3. Review required modules or theme dependencies.

## Prerequisites

- Access to the live Drupal 11 admin.
- Access to hosting details or control panel.
- A user account with permission to manage menus and inspect modules.

## Session Goal

By the end of this session you should know:

- whether hosting is ready for Drupal 11
- whether any required module/theme compatibility issues exist
- whether the main navigation has been reduced to the planned 7-item structure

## Step 1: Confirm Hosting Readiness

Outside Drupal if needed:

1. Check PHP version.
2. Check database version.
3. Check memory and disk limits.
4. Record any blockers in `migration-tracker.md`.

If the host does not meet Drupal 11 requirements, stop and resolve hosting first.

## Step 2: Review Required Modules and Theme

Admin path: `/admin/modules`

1. List the modules you expect to rely on.
2. Confirm each one has a Drupal 11 compatible release.
3. Check whether the active theme supports the planned homepage block layout.
4. Record any blockers in `migration-tracker.md`.

## Step 3: Update Main Navigation

Admin path: `/admin/structure/menu/manage/main`

1. Keep only these top-level items:
- Stories
- Calendar
- Repeaters
- About
- Join
- Contact
- Resources
2. Move lower-priority links under `Resources`.
3. Save.

## Step 4: Validate Navigation on the Homepage

1. Refresh the homepage.
2. Confirm the order is correct.
3. Confirm no important link disappeared.
4. Check mobile layout if possible.

## Step 5: Update Tracker and Checklist

After the live session:

1. Mark completed items in `migration-tracker.md`.
2. Mark completed items in `implementation-checklist.md`.
3. Note any blockers before starting Session 02.

## Success Criteria

- Hosting readiness is confirmed or explicitly blocked.
- Required modules/theme compatibility is reviewed.
- Main navigation is updated to the approved structure.