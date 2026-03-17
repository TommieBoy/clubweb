# Homepage Block Placement Guide

This guide maps the homepage wireframe to Drupal 11 block and view placement.

## Goal

- Place homepage content blocks in a clear order.
- Match the proposal wireframe as closely as the chosen Drupal theme allows.
- Keep the homepage readable on desktop and mobile.

## Source Layout

Target section order:

1. Header
2. Hero
3. Quick Actions
4. Featured Story
5. Latest Stories
6. Upcoming Events
7. Topic Browse
8. Footer

## Core Content Blocks

- `featured_story`
- `latest_stories`
- `upcoming_events`
- `story_topics` or equivalent taxonomy/topic block
- optional mini calendar block
- optional quick actions custom block

## Preferred Placement Order

## 1. Hero Area

Use a custom block or theme region for:

- club headline
- `View All Stories` button
- `Join` button

Keep this above dynamic story and event content.

## 2. Quick Actions

Use a small custom block for:

- Add Story
- Add Event
- View Calendar
- Contact

If public visitors should not see editor actions, split this into public quick links and admin shortcuts.

## 3. Featured Story

Place the `featured_story` block directly below the hero or beside quick actions if the theme supports a two-column layout.

Recommended content:

- image
- title
- summary
- read more link

## 4. Latest Stories

Place the `latest_stories` block below the featured story.

Recommended display:

- 5 items on desktop
- clear dates
- topic labels if available
- `View More` or `View All Stories` link

## 5. Upcoming Events and Mini Calendar

Place `upcoming_events` below latest stories or in a lower two-column section.

Recommended layout:

- left: upcoming events list
- right: mini calendar

On mobile, show the events list before the mini calendar.

## 6. Topic Browse

Place the topic browse block below stories and events.

Recommended display:

- simple chips or compact links
- avoid long term descriptions

## 7. Footer

Keep lower-priority links and reference material here:

- Contact
- social links
- location
- Resources links

## Suggested Region Mapping

Actual region names depend on the Drupal theme, but use this order:

- Header region: main navigation
- Top content region: hero and quick actions
- Main content region: featured story and latest stories
- Lower content or sidebar region: upcoming events and mini calendar
- Lower content region: topic browse
- Footer region: contact and resource links

## Block Visibility Rules

- Keep homepage-specific story and event blocks restricted to the homepage if needed.
- Do not duplicate the same story list in multiple visible regions.
- Hide legacy blocks once replacement blocks are working.

## Verification

1. Homepage reads top to bottom without duplicated sections.
2. Featured story appears before latest stories.
3. Upcoming events and mini calendar appear together logically.
4. Topic browse does not crowd the top of the page.
5. Mobile order remains readable.

## Safe Rollback

- Unplace one block at a time if the homepage becomes cluttered.
- Keep old blocks disabled rather than deleted until the replacement layout is proven.