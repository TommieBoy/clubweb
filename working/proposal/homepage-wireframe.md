# Homepage Wireframe

## Section Order

1. Header
2. Hero
3. Quick Actions
4. Featured Story
5. Latest Stories
6. Upcoming Events
7. Topic Browse
8. Footer

## Wireframe (Desktop)

```text
+------------------------------------------------------+
| Logo | Stories | Calendar | Repeaters | About | Join |
+------------------------------------------------------+
| HERO: Club headline + "View All Stories" + "Join"      |
+--------------------------+---------------------------+
| Featured Story           | Quick Actions             |
| image + summary + read   | Add Story, Add Event,    |
|                          | View Calendar, Contact    |
+------------------------------------------------------+
| Latest Stories (5 cards with tags + dates)           |
+------------------------------------------------------+
| Upcoming Events (list)   | Mini Calendar             |
+------------------------------------------------------+
| Browse by Topic (chips)                                |
+------------------------------------------------------+
| Footer: Contact, social, location, resources          |
+------------------------------------------------------+
```

## Mobile Behavior

- Collapse nav into a single menu button.
- Keep hero buttons stacked and visible without scrolling.
- Show 3 latest stories first, then `View More`.
- Events list appears before mini calendar for readability.

## Content Blocks to Build in Drupal

- View: `latest_stories` (limit 5)
- View: `featured_story` (1 item)
- View: `upcoming_events` (next 5 events)
- Taxonomy block: `story_topics`
