// Sample Events Data - Can be updated with real events
const events = [
    {
        date: '2026-03-15',
        title: 'Forest Management Field Trip',
        description: 'Learn about timber harvesting and forest restoration practices with local foresters in the Cascade Range.',
        location: 'Snoqualmie National Forest, WA'
    },
    {
        date: '2026-03-22',
        title: 'Yakima Basin Water Forum',
        description: 'Explore agricultural water use, irrigation practices, and competing demands in one of Washington\'s most important agricultural regions.',
        location: 'Yakima Valley, WA'
    },
    {
        date: '2026-04-05',
        title: 'Salmon Recovery Symposium',
        description: 'Meet with fish biologists and restoration specialists working on Puget Sound salmon recovery projects.',
        location: 'UW Campus & Snoqualmie River'
    },
    {
        date: '2026-04-19',
        title: 'Conservation Lands Tour',
        description: 'Visit TNC and land trust properties to understand conservation easements and habitat protection strategies.',
        location: 'Various Puget Sound Locations'
    },
    {
        date: '2026-05-03',
        title: 'Tribal Environmental Leadership',
        description: 'Learn about indigenous land stewardship and natural resource management from tribal representatives.',
        location: 'TBD - Tribal Lands'
    },
    {
        date: '2026-05-17',
        title: 'EPA & Regulatory Framework Workshop',
        description: 'Understand environmental regulations and agency processes with EPA and state environmental department officials.',
        location: 'EPA Office, Seattle'
    },
    {
        date: '2026-06-07',
        title: 'Mountain Lake Ecosystem Study',
        description: 'Conduct field research and learn about alpine ecosystem dynamics from UW ecologists.',
        location: 'Alpine Lakes Wilderness'
    },
    {
        date: '2026-06-21',
        title: 'Wetlands Restoration Field Work',
        description: 'Participate in hands-on wetlands restoration and learn their ecological importance.',
        location: 'Puget Sound Wetlands'
    }
];

let currentDate = new Date();

// Navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Update month display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Build calendar
    const calendarMonth = document.getElementById('calendarMonth');
    calendarMonth.innerHTML = '';
    
    // Day names
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const headerDiv = document.createElement('div');
    headerDiv.className = 'calendar-header';
    dayNames.forEach(day => {
        const dayEl = document.createElement('div');
        dayEl.className = 'day-name';
        dayEl.textContent = day;
        headerDiv.appendChild(dayEl);
    });
    calendarMonth.appendChild(headerDiv);
    
    // Calendar grid
    const gridDiv = document.createElement('div');
    gridDiv.className = 'calendar-grid';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayEl = createDayElement(daysInPrevMonth - i, 'other-month', year, month - 1);
        gridDiv.appendChild(dayEl);
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = events.some(e => e.date === dateStr);
        const isToday = isDateToday(day, month, year);
        
        let className = '';
        if (isToday) className = 'today';
        else if (hasEvent) className = 'has-event';
        
        const dayEl = createDayElement(day, className, year, month, dateStr, hasEvent);
        dayEl.addEventListener('click', () => {
            if (hasEvent) {
                filterEventsByDate(dateStr);
            }
        });
        gridDiv.appendChild(dayEl);
    }
    
    // Next month days
    const totalCells = gridDiv.children.length;
    for (let day = 1; totalCells + day <= 42; day++) {
        const dayEl = createDayElement(day, 'other-month', year, month + 1);
        gridDiv.appendChild(dayEl);
    }
    
    calendarMonth.appendChild(gridDiv);
    
    // Render events list
    renderEventsList(year, month);
}

function createDayElement(day, className = '', year, month, dateStr = '', hasEvent = false) {
    const el = document.createElement('div');
    el.className = `calendar-day ${className}`;
    if (hasEvent) el.style.cursor = 'pointer';
    el.textContent = day;
    return el;
}

function isDateToday(day, month, year) {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
}

function renderEventsList(year, month) {
    const eventsList = document.getElementById('eventsList');
    
    // Get events for this month
    const monthEvents = events.filter(event => {
        const [eYear, eMonth] = event.date.split('-').map(Number);
        return eYear === year && eMonth === month + 1;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    
    eventsList.innerHTML = '';
    
    if (monthEvents.length === 0) {
        const noEvents = document.createElement('div');
        noEvents.className = 'no-events';
        noEvents.textContent = 'No events scheduled for this month. Check back soon!';
        eventsList.appendChild(noEvents);
    } else {
        monthEvents.forEach(event => {
            const eventEl = createEventElement(event);
            eventsList.appendChild(eventEl);
        });
    }
}

function createEventElement(event) {
    const el = document.createElement('div');
    el.className = 'event-item';
    
    const date = new Date(event.date);
    const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
    
    el.innerHTML = `
        <div class="event-date">${dateStr}</div>
        <div class="event-title">${event.title}</div>
        <div class="event-description">${event.description}</div>
        <div class="event-location">📍 ${event.location}</div>
    `;
    
    return el;
}

function filterEventsByDate(dateStr) {
    const eventsList = document.getElementById('eventsList');
    const dateEvents = events.filter(e => e.date === dateStr);
    
    eventsList.innerHTML = '';
    
    if (dateEvents.length === 0) {
        const noEvents = document.createElement('div');
        noEvents.className = 'no-events';
        noEvents.textContent = 'No events on this date.';
        eventsList.appendChild(noEvents);
    } else {
        dateEvents.forEach(event => {
            const eventEl = createEventElement(event);
            eventsList.appendChild(eventEl);
        });
    }
}

// Initialize calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
});

// Add event - this function allows adding new events (for admin use)
function addEvent(dateStr, title, description, location) {
    events.push({
        date: dateStr,
        title: title,
        description: description,
        location: location
    });
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    renderCalendar();
}
