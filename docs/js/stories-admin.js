(function () {
  const UPDATE_FLAG = 'storiesAdminUpdate';
  const STATUS_LABELS = {
    review: 'Needs Review',
    kept: 'Kept',
    later: 'In Holdings',
    'moved-events': 'Moved to Events'
  };
  const updateRequested = new URLSearchParams(window.location.search).get('update') === '1';
  const active = updateRequested || sessionStorage.getItem(UPDATE_FLAG) === '1';
  let statusesCache = {};

  if (updateRequested) {
    sessionStorage.setItem(UPDATE_FLAG, '1');
  }

  function parseDateAndTime(metaText) {
    const dateMatch = metaText.match(/(\d{4})-(\d{2})-(\d{2})/);
    const timeMatch = metaText.match(/\b(\d{1,2}):(\d{2})\b/);
    const date = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}` : new Date().toISOString().slice(0, 10);
    const time = timeMatch ? `${String(timeMatch[1]).padStart(2, '0')}:${timeMatch[2]}` : '19:00';
    return { date, time };
  }

  function storyFromNode(node) {
    const id = (node.id || '').replace('story-', '');
    const title = (node.querySelector('h2, h3')?.textContent || `Story ${id}`).trim();
    const meta = (node.querySelector('.card-date')?.textContent || '').trim();
    const body = (node.querySelector('.story-body, p:not(.section-kicker):not(.card-date)')?.textContent || '').trim();
    const dt = parseDateAndTime(meta);

    return {
      id,
      title,
      meta,
      description: body.slice(0, 280),
      body,
      eventDate: dt.date,
      eventTime: dt.time,
      url: `${location.origin}/prototype/stories.html#story-${id}`
    };
  }

  async function postAction(action, story) {
    const response = await fetch('/stories-admin/save-story-action.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, story })
    });

    if (!response.ok) {
      throw new Error('Unable to save action. Verify admin auth is active.');
    }

    return response.json();
  }

  function setStoryBadge(node, status) {
    const existing = node.querySelector('.story-admin-badge');
    if (existing) {
      existing.remove();
    }

    if (!active) {
      node.classList.remove('story-is-muted');
      return;
    }

    const effectiveStatus = status || 'review';

    if (!STATUS_LABELS[effectiveStatus]) {
      node.classList.remove('story-is-muted');
      return;
    }

    const badge = document.createElement('p');
    badge.className = `story-admin-badge ${effectiveStatus}`;
    badge.textContent = STATUS_LABELS[effectiveStatus];
    node.insertBefore(badge, node.firstChild);

    if (effectiveStatus === 'later' || effectiveStatus === 'moved-events') {
      node.classList.add('story-is-muted');
    } else {
      node.classList.remove('story-is-muted');
    }
  }

  function setStoryStatus(node, status) {
    const id = (node.id || '').replace('story-', '');
    if (!id) return;

    if (status) {
      statusesCache[id] = status;
    } else {
      delete statusesCache[id];
    }

    setStoryBadge(node, status);
  }

  function renderEditControls(node) {
    const holder = node.querySelector('.story-admin-controls') || document.createElement('div');
    holder.className = 'hero-actions story-admin-controls';
    holder.innerHTML = '';

    const keep = document.createElement('button');
    keep.type = 'button';
    keep.className = 'btn btn-outline';
    keep.textContent = 'Keep Story';

    const move = document.createElement('button');
    move.type = 'button';
    move.className = 'btn btn-outline';
    move.textContent = 'Move to Events';

    const later = document.createElement('button');
    later.type = 'button';
    later.className = 'btn btn-outline';
    later.textContent = 'Look at Later';

    keep.addEventListener('click', async () => {
      const story = storyFromNode(node);
      await postAction('keep', story);
      setStoryStatus(node, 'kept');
      renderReEditControl(node);
    });

    move.addEventListener('click', async () => {
      const story = storyFromNode(node);
      await postAction('move-events', story);
      setStoryStatus(node, 'moved-events');
      node.style.display = 'none';
    });

    later.addEventListener('click', async () => {
      const story = storyFromNode(node);
      await postAction('look-later', story);
      setStoryStatus(node, 'later');
      renderReEditControl(node);
    });

    holder.appendChild(keep);
    holder.appendChild(move);
    holder.appendChild(later);

    if (!holder.parentElement) {
      node.appendChild(holder);
    }
  }

  function renderReEditControl(node) {
    const holder = node.querySelector('.story-admin-controls') || document.createElement('div');
    holder.className = 'hero-actions story-admin-controls';
    holder.innerHTML = '';

    const reedit = document.createElement('button');
    reedit.type = 'button';
    reedit.className = 'btn btn-primary';
    reedit.textContent = 'Re-Edit';
    reedit.addEventListener('click', async () => {
      const story = storyFromNode(node);
      await postAction('reedit', story);
      setStoryStatus(node, null);
      renderEditControls(node);
    });

    holder.appendChild(reedit);

    if (!holder.parentElement) {
      node.appendChild(holder);
    }
  }

  function updateModeButtons() {
    const container = document.getElementById('stories-admin-mode');
    if (!container) return;
    container.innerHTML = '';

    if (active) {
      const holdings = document.createElement('a');
      holdings.href = '/prototype/temporary-holdings.html';
      holdings.className = 'btn btn-outline';
      holdings.textContent = 'Temporary Holdings';

      const exit = document.createElement('button');
      exit.type = 'button';
      exit.className = 'btn btn-light';
      exit.textContent = 'Exit Update Mode';
      exit.addEventListener('click', () => {
        sessionStorage.removeItem(UPDATE_FLAG);
        const url = new URL(window.location.href);
        url.searchParams.delete('update');
        window.location.href = url.toString();
      });

      container.appendChild(holdings);
      container.appendChild(exit);
    } else {
      const enter = document.createElement('a');
      enter.href = '/stories-admin/activate.html';
      enter.className = 'btn btn-light';
      enter.textContent = 'Admin Update';
      container.appendChild(enter);
    }
  }

  async function applyStatuses() {
    let statuses = {};
    try {
      const response = await fetch('/prototype/story-status.json', { cache: 'no-store' });
      if (response.ok) {
        statuses = await response.json();
      }
    } catch (error) {
      console.warn('Status file unavailable', error);
    }

    statusesCache = statuses;
    const nodes = Array.from(document.querySelectorAll('section[id^="story-"], article[id^="story-"]'));

    nodes.forEach((node) => {
      const id = (node.id || '').replace('story-', '');
      const status = statuses[id];

      if (status === 'moved-events') {
        node.style.display = 'none';
        return;
      }

      if (!active && status === 'later') {
        node.style.display = 'none';
        return;
      }

      if (!active) {
        return;
      }

      setStoryBadge(node, status);

      if (status === 'kept' || status === 'later' || status === 'moved-events') {
        renderReEditControl(node);
      } else {
        renderEditControls(node);
      }
    });
  }

  window.karcStoriesAdmin = {
    active,
    refreshNode(node) {
      if (!active) return;
      const id = (node.id || '').replace('story-', '');
      const status = statusesCache[id];

      if (status === 'moved-events') {
        node.style.display = 'none';
        return;
      }

      setStoryBadge(node, status);
      if (status === 'kept' || status === 'later' || status === 'moved-events') {
        renderReEditControl(node);
      } else {
        renderEditControls(node);
      }
    }
  };

  document.addEventListener('DOMContentLoaded', async () => {
    updateModeButtons();
    await applyStatuses();
  });
})();
