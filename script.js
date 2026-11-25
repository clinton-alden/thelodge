// THE LODGE — EVENT MANAGEMENT
// Add real events inside the array below, using this format:
// {
//     date: '2027-01-15', // YYYY-MM-DD (example only)
//     title: 'Event name',
//     description: 'Time, details, and registration instructions.',
//     location: 'Meeting location'
// },
// Save and commit this file in GitHub to publish your changes.
// The example above is commented out and will not appear on the website.
const events = [
    // Add upcoming and past events here.
];

// Loading screen: preserve the original cabin animation on first visit.
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        let alreadyVisited = false;
        try {
            alreadyVisited = sessionStorage.getItem('lodgeVisited') === 'true';
            sessionStorage.setItem('lodgeVisited', 'true');
        } catch (error) {
            // If browser storage is blocked, the CSS animation still finishes.
        }
        if (alreadyVisited) {
            loadingScreen.style.display = 'none';
        } else {
            setTimeout(() => {
                loadingScreen.style.pointerEvents = 'none';
            }, 2300);
        }
    }
    initializeCalendar();
});

// Calendar — the date is always the first of the displayed month,
// preventing skipped months when navigating from the 29th, 30th, or 31st.
const now = new Date();
let currentDate = new Date(now.getFullYear(), now.getMonth(), 1);
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

function initializeCalendar() {
    // The About page does not contain a calendar.
    const requiredIds = ['prevMonth', 'nextMonth', 'currentMonth', 'calendarMonth', 'eventsList', 'showAllEvents'];
    if (!requiredIds.every(id => document.getElementById(id))) return;

    document.getElementById('prevMonth').addEventListener('click', () => changeMonth(-1));
    document.getElementById('nextMonth').addEventListener('click', () => changeMonth(1));
    document.getElementById('showAllEvents').addEventListener('click', () => {
        document.querySelectorAll('.calendar-day[aria-pressed]').forEach(button => {
            button.setAttribute('aria-pressed', 'false');
        });
        renderEventsList();
    });
    renderCalendar();
}

function changeMonth(offset) {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
    renderCalendar();
}

function dateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function formatDate(value) {
    // Parse a calendar date locally, not as UTC midnight.
    // This avoids showing the previous day in Pacific Time.
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day).toLocaleDateString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
    });
}

function renderCalendar() {
    const calendarMonth = document.getElementById('calendarMonth');
    if (!calendarMonth) return;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    calendarMonth.replaceChildren();

    const header = document.createElement('div');
    header.className = 'calendar-header';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const element = document.createElement('div');
        element.className = 'day-name';
        element.textContent = day;
        header.appendChild(element);
    });
    calendarMonth.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());

    // A consistent six-week grid, including surrounding-month dates.
    for (let i = 0; i < 42; i++) {
        const day = i - firstDay + 1;
        const actualDate = new Date(year, month, day);
        const inMonth = day >= 1 && day <= daysInMonth;
        const key = dateKey(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate());
        const hasEvent = inMonth && events.some(event => event.date === key);
        const element = document.createElement(hasEvent ? 'button' : 'div');
        element.className = 'calendar-day';
        element.textContent = actualDate.getDate();
        if (!inMonth) element.classList.add('other-month');
        if (inMonth && key === todayKey) {
            element.classList.add('today');
            element.setAttribute('aria-current', 'date');
        }
        if (hasEvent) {
            element.type = 'button';
            element.classList.add('has-event');
            element.setAttribute('aria-label', `Show events for ${formatDate(key)}`);
            element.setAttribute('aria-pressed', 'false');
            element.addEventListener('click', () => {
                grid.querySelectorAll('[aria-pressed]').forEach(button => button.setAttribute('aria-pressed', 'false'));
                element.setAttribute('aria-pressed', 'true');
                renderEventsList(key);
            });
        }
        grid.appendChild(element);
    }
    calendarMonth.appendChild(grid);
    renderEventsList();
}

function renderEventsList(selectedDate = null) {
    const list = document.getElementById('eventsList');
    if (!list) return;
    const monthPrefix = dateKey(currentDate.getFullYear(), currentDate.getMonth(), 1).slice(0, 7);
    const matching = events.filter(event => selectedDate ? event.date === selectedDate : event.date.startsWith(monthPrefix + '-'))
        .sort((a, b) => a.date.localeCompare(b.date));
    list.replaceChildren();

    if (!matching.length) {
        const message = document.createElement('div');
        message.className = 'no-events';
        message.textContent = selectedDate ? 'No events on this date.' : 'No events scheduled for this month. Check back soon!';
        list.appendChild(message);
        const link = document.createElement('a');
        link.href = 'https://mailman23.u.washington.edu/mailman/listinfo/thelodge';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Join our listserv for event announcements.';
        message.append(document.createElement('br'), link);
        return;
    }
    matching.forEach(event => list.appendChild(createEventElement(event)));
}

function createEventElement(event) {
    const item = document.createElement('article');
    item.className = 'event-item';
    const fields = [
        ['event-date', formatDate(event.date)],
        ['event-title', event.title],
        ['event-description', event.description],
        ['event-location', event.location ? `📍 ${event.location}` : '']
    ];
    // Use textContent so event text is displayed safely as plain text.
    fields.forEach(([className, value]) => {
        if (!value) return;
        const element = document.createElement('div');
        element.className = className;
        element.textContent = value;
        item.appendChild(element);
    });
    return item;
}
