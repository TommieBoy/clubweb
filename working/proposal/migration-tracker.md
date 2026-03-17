# Drupal 11 Migration Tracker

Use this file to track progress, ownership, and notes during the rebuild.

Status values:

- `not started`
- `in progress`
- `blocked`
- `done`

Owner suggestions:

- `Tom`
- `Admin`
- `Developer`
- `TBD`

## Platform Baseline

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Confirm hosting supports Drupal 11 | blocked | Tom | Requires access to live hosting details for PHP, database, and hosting limits. |
| Lock project target to Drupal 11 | done | Tom | Proposal docs already updated to Drupal 11. |
| Confirm module/theme compatibility | in progress | Admin | Review required modules before build starts. |

## Information Architecture

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Finalize 7-item top navigation | in progress | Admin | Structure is defined in docs; live Drupal menu update still needed. |
| Move low-use links under Resources | not started | Admin | Keep top-level navigation under 7 items. |
| Confirm menu labels and destinations | not started | Tom | Keep labels short and task-focused. |

## Story System

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Create Story content type | not started | Admin | Use `story-homepage-build-sheet.md`. |
| Add Story fields | not started | Admin | Summary, topic, featured flag, image, body. |
| Create Story topics vocabulary | not started | Admin | Needed for topic browse and filtering. |
| Build featured story view | not started | Admin | One featured story on homepage. |
| Build latest stories view | not started | Admin | Five newest stories. |

## Event and Calendar System

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Create Event content type | not started | Admin | Use `event-calendar-build-sheet.md`. |
| Add Event fields | not started | Admin | Start date, end date, location, link, body. |
| Connect calendar to Event content | not started | Admin | Calendar must use `field_event_date`. |
| Build upcoming events block | not started | Admin | Next 5 events by date. |

## Homepage Layout

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Place homepage story blocks | not started | Admin | Use `homepage-block-placement-guide.md`. |
| Place event and calendar blocks | not started | Admin | Keep events and mini calendar together. |
| Add topic browse block | not started | Admin | Optional if homepage space allows. |
| Remove duplicate legacy blocks | not started | Admin | Disable first, delete later. |

## Roles and Admin UX

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Review existing roles | not started | Admin | Reuse compatible roles if possible. |
| Configure Editor permissions | not started | Admin | Content editing only. |
| Configure Publisher permissions | not started | Admin | Publishing flow only. |
| Configure Site Admin permissions | not started | Admin | Menus, views, blocks, taxonomy. |
| Add editor shortcuts | not started | Admin | Add Story, Add Event, Menu, Views. |

## QA and Launch Readiness

| Work Item | Status | Owner | Notes |
| --- | --- | --- | --- |
| Create test Story and Event content | not started | Admin | Use future-dated Event test items. |
| Verify homepage story discovery | not started | Tom | Stories should be reachable in 1-2 clicks. |
| Verify calendar and event sync | not started | Tom | Calendar and event block must match. |
| Verify mobile homepage behavior | not started | Tom | Navigation and content order must stay readable. |
| Clean up test content | not started | Admin | Unpublish before deleting. |