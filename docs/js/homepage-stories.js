(function () {
  const STORIES_URL = '/prototype/stories.html';
  const STATUS_URL = '/prototype/story-status.json';
  const MAX_CARDS = 4;

  function normalizeWhitespace(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
  }

  function summarize(text, maxLength) {
    const cleaned = normalizeWhitespace(text);
    if (cleaned.length <= maxLength) {
      return cleaned;
    }

    return `${cleaned.slice(0, maxLength).trimEnd()}...`;
  }

  function parseMeta(metaText) {
    const cleaned = normalizeWhitespace(metaText);
    const dateMatch = cleaned.match(/^[A-Za-z]{3},\s+\d{4}-\d{2}-\d{2}/);
    const authorMatch = cleaned.match(/(?:- by|—)\s+(.+)$/);

    return {
      date: dateMatch ? dateMatch[0] : cleaned,
      author: authorMatch ? authorMatch[1].trim() : 'KARC'
    };
  }

  function inferCategory(story) {
    const source = `${story.title} ${story.summary}`.toLowerCase();

    if (source.includes('meeting')) return 'Meetings';
    if (source.includes('repeater')) return 'Repeaters';
    if (source.includes('field day') || source.includes('picnic') || source.includes('contest') || source.includes('party')) return 'Events';
    if (source.includes('member') || source.includes('award') || source.includes('silent key')) return 'Members';

    return 'Stories';
  }

  function parseTopStories(doc) {
    const nodes = Array.from(doc.querySelectorAll('main section[id^="story-"]'));

    return nodes.map((node) => {
      const id = (node.id || '').replace('story-', '');
      const title = normalizeWhitespace(node.querySelector('h2, h3')?.textContent);
      const metaText = normalizeWhitespace(node.querySelector('.card-date')?.textContent);
      const bodyParagraphs = Array.from(node.querySelectorAll('p'))
        .filter((paragraph) => !paragraph.classList.contains('section-kicker') && !paragraph.classList.contains('card-date'))
        .map((paragraph) => normalizeWhitespace(paragraph.textContent))
        .filter(Boolean);
      const summary = summarize(bodyParagraphs[0] || '', 220);
      const meta = parseMeta(metaText);

      return {
        id,
        title,
        summary,
        date: meta.date,
        author: meta.author,
        category: inferCategory({ title, summary }),
        url: `/prototype/stories.html#story-${id}`
      };
    }).filter((story) => story.id && story.title);
  }

  function parseLegacyStories(html) {
    const match = html.match(/const legacyStories = \[(.*?)\n\s*\];/s);
    if (!match) {
      return [];
    }

    try {
      const legacyStories = new Function(`${match[0]}; return legacyStories;`)();
      return legacyStories.map((story) => {
        const meta = parseMeta(story.meta || '');
        const title = normalizeWhitespace(story.title);
        const summary = summarize(story.body || '', 170);

        return {
          id: String(story.id),
          title,
          summary,
          date: meta.date,
          author: meta.author,
          category: inferCategory({ title, summary }),
          url: `/prototype/stories.html#story-${story.id}`
        };
      });
    } catch (error) {
      console.warn('Unable to parse legacy stories for homepage', error);
      return [];
    }
  }

  async function loadStatuses() {
    try {
      const response = await fetch(STATUS_URL, { cache: 'no-store' });
      if (!response.ok) {
        return {};
      }

      return await response.json();
    } catch (error) {
      console.warn('Unable to load story statuses for homepage', error);
      return {};
    }
  }

  async function loadStories() {
    const response = await fetch(STORIES_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load stories archive');
    }

    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const primaryStories = parseTopStories(doc);
    const legacyStories = parseLegacyStories(html);
    const statuses = await loadStatuses();
    const visibleStatuses = new Set(['moved-events', 'later']);
    const seen = new Set();

    return primaryStories.concat(legacyStories).filter((story) => {
      if (!story.id || seen.has(story.id)) {
        return false;
      }

      seen.add(story.id);
      return !visibleStatuses.has(statuses[story.id]);
    });
  }

  function renderFeatured(story) {
    const title = document.getElementById('homepage-latest-title');
    const summary = document.getElementById('homepage-latest-summary');
    const meta = document.getElementById('homepage-latest-meta');
    const link = document.getElementById('homepage-latest-link');
    const kicker = document.getElementById('homepage-latest-kicker');

    if (!title || !summary || !meta || !link || !kicker) {
      return;
    }

    kicker.textContent = 'Latest Story';
    title.textContent = story.title;
    summary.textContent = story.summary;
    meta.innerHTML = '';

    [story.date, story.category, `By ${story.author}`].forEach((value) => {
      const span = document.createElement('span');
      span.textContent = value;
      meta.appendChild(span);
    });

    link.href = story.url;
    link.textContent = 'Read latest story';
  }

  function renderCards(stories) {
    const container = document.getElementById('homepage-latest-cards');
    if (!container || !stories.length) {
      return;
    }

    container.innerHTML = '';

    stories.slice(0, MAX_CARDS).forEach((story) => {
      const article = document.createElement('article');
      article.className = 'card';

      const date = document.createElement('p');
      date.className = 'card-date';
      date.textContent = story.date;

      const heading = document.createElement('h3');
      const link = document.createElement('a');
      link.className = 'story-link';
      link.href = story.url;
      link.textContent = story.title;
      heading.appendChild(link);

      const summary = document.createElement('p');
      summary.textContent = story.summary;

      article.appendChild(date);
      article.appendChild(heading);
      article.appendChild(summary);
      container.appendChild(article);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const stories = await loadStories();
      if (!stories.length) {
        return;
      }

      renderFeatured(stories[0]);
      renderCards(stories.slice(1));
    } catch (error) {
      console.warn('Unable to update homepage stories', error);
    }
  });
})();