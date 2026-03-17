// Calendar widget for club events
class ClubCalendar {
  constructor() {
    this.events = [];
    this.currentDate = new Date();
    this.init();
  }

  getPlaceholderMarkup() {
    return '<p class="placeholder">Click on a date with events to see details.</p>';
  }

  async init() {
    try {
      // Fetch events from JSON
      const response = await fetch('/prototype/events.json');
      this.events = await response.json();
      this.render();
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }

  render() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;

    calendar.innerHTML = '';
    
    // Calendar header
    const header = document.createElement('div');
    header.className = 'calendar-header';
    
    const monthYear = this.currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
    
    header.innerHTML = `
      <div class="calendar-nav" aria-label="Calendar month navigation">
        <button class="nav-btn prev-month" type="button" aria-label="Previous month">←</button>
        <h3>${monthYear}</h3>
        <button class="nav-btn next-month" type="button" aria-label="Next month">→</button>
      </div>
    `;
    
    calendar.appendChild(header);
    
    // Day names
    const dayNames = document.createElement('div');
    dayNames.className = 'calendar-day-names';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
      const dayEl = document.createElement('div');
      dayEl.textContent = day;
      dayNames.appendChild(dayEl);
    });
    calendar.appendChild(dayNames);
    
    // Days grid
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Get events for this month
    const monthEvents = this.getEventsForMonth(year, month);
    
    let currentDate = new Date(startDate);
    while (currentDate <= lastDay || currentDate.getDay() !== 0) {
      const dayCell = document.createElement('button');
      dayCell.className = 'calendar-day';
      dayCell.type = 'button';
      
      if (currentDate.getMonth() !== month) {
        dayCell.classList.add('other-month');
      }
      
      const dateStr = currentDate.toISOString().split('T')[0];
      const dayEvents = monthEvents.filter(e => e.date === dateStr);
      
      if (dayEvents.length > 0) {
        dayCell.classList.add('has-event');
        dayCell.title = dayEvents.map(e => e.title).join('\n');
      }
      
      const eventTitles = dayEvents
        .slice(0, 2)
        .map((event) => `<span class="event-title">${event.title}</span>`)
        .join('');
      const moreCount = dayEvents.length > 2 ? `<span class="event-more">+${dayEvents.length - 2} more</span>` : '';

      dayCell.innerHTML = `
        <span class="day-number">${currentDate.getDate()}</span>
        <div class="day-events">${eventTitles}${moreCount}</div>
      `;
      
      dayCell.addEventListener('click', () => {
        if (dayEvents.length > 0) {
          this.showEventDetails(dayEvents);
        }
      });
      
      grid.appendChild(dayCell);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    calendar.appendChild(grid);
    
    // Attach event listeners
    document.querySelector('.prev-month')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.render();
    });
    
    document.querySelector('.next-month')?.addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.render();
    });
  }

  getEventsForMonth(year, month) {
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }

  showEventDetails(dayEvents) {
    const detailsDiv = document.getElementById('event-details');
    if (!detailsDiv) return;

    let html = `
      <div class="event-details-toolbar">
        <button class="close-details-btn" type="button" aria-label="Close event details">Close</button>
      </div>
      <div class="events-list">
    `;
    dayEvents.forEach(event => {
      const eventDate = new Date(event.date);
      const dateStr = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      
      html += `
        <div class="event-card">
          <div class="event-header">
            <h3>${event.title}</h3>
            <span class="event-category ${event.category}">${event.category}</span>
          </div>
          <p class="event-date">${dateStr} at ${event.time}</p>
          <p class="event-location"><strong>Location:</strong> ${event.location}</p>
          <p class="event-description">${event.description}</p>
        </div>
      `;
    });
    html += '</div>';
    
    detailsDiv.innerHTML = html;
    detailsDiv.querySelector('.close-details-btn')?.addEventListener('click', () => {
      this.clearEventDetails();
    });
  }

  clearEventDetails() {
    const detailsDiv = document.getElementById('event-details');
    if (!detailsDiv) return;
    detailsDiv.innerHTML = this.getPlaceholderMarkup();
  }
}

// Initialize calendar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ClubCalendar();
});
