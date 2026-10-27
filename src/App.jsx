import React, { useState } from ‘react’;
import {
Search,
Heart,
MapPin,
CalendarDays,
Ticket,
Compass,
UserRound,
Settings,
Plus,
Menu,
X
} from ‘lucide-react’;

const events = [
{
id: 1,
title: ‘Live Music Night’,
artist: ‘The Midnight’,
city: ‘Toronto’,
date: ‘Nov 14, 2026’,
category: ‘Music’,
price: 85,
image: ‘https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800’
},
{
id: 2,
title: ‘World Tour Live’,
artist: ‘Global Stars’,
city: ‘Paris’,
date: ‘Nov 21, 2026’,
category: ‘Music’,
price: 120,
image: ‘https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800’
},
{
id: 3,
title: ‘Championship Match’,
artist: ‘City Stadium’,
city: ‘London’,
date: ‘Dec 5, 2026’,
category: ‘Sports’,
price: 65,
image: ‘https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800’
},
{
id: 4,
title: ‘Comedy After Dark’,
artist: ‘Live Comedy’,
city: ‘New York’,
date: ‘Dec 12, 2026’,
category: ‘Comedy’,
price: 45,
image: ‘https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800’
},
{
id: 5,
title: ‘Electronic Festival’,
artist: ‘Electric Nights’,
city: ‘São Paulo’,
date: ‘Dec 19, 2026’,
category: ‘Music’,
price: 95,
image: ‘https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800’
},
{
id: 6,
title: ‘Theatre Experience’,
artist: ‘On Stage’,
city: ‘Montreal’,
date: ‘Jan 9, 2027’,
category: ‘Theatre’,
price: 55,
image: ‘https://images.unsplash.com/photo-1503095396549-807759245b35?w=800’
}
];

const categories = [‘All Events’, ‘Music’, ‘Sports’, ‘Comedy’, ‘Theatre’];

export default function App() {
const [page, setPage] = useState(‘Discover’);
const [search, setSearch] = useState(’’);
const [city, setCity] = useState(‘All Cities’);
const [category, setCategory] = useState(‘All Events’);
const [watchlist, setWatchlist] = useState([]);
const [menuOpen, setMenuOpen] = useState(false);
const [eventName, setEventName] = useState(’’);
const [eventCity, setEventCity] = useState(’’);
const [eventDate, setEventDate] = useState(’’);
const [message, setMessage] = useState(’’);

const filteredEvents = events.filter((event) => {
const matchesSearch =
${event.title} ${event.artist} ${event.city}
.toLowerCase()
.includes(search.toLowerCase());

const matchesCity = city === 'All Cities' || event.city === city;
const matchesCategory =
  category === 'All Events' || event.category === category;
const matchesWatchlist =
  page !== 'Watchlist' || watchlist.includes(event.id);
return matchesSearch && matchesCity && matchesCategory && matchesWatchlist;

});

const toggleWatchlist = (id) => {
setWatchlist((current) =>
current.includes(id)
? current.filter((item) => item !== id)
: […current, id]
);
};

const navigation = [
{ label: ‘Discover’, icon: Compass },
{ label: ‘Watchlist’, icon: Heart },
{ label: ‘Create Event’, icon: Plus },
{ label: ‘Manage Events’, icon: Ticket },
{ label: ‘Profile’, icon: UserRound },
{ label: ‘Location’, icon: MapPin },
{ label: ‘Settings’, icon: Settings }
];

function renderContent() {
if (page === ‘Create Event’) {
return (
Create an event
Share your event with your audience.
<form onSubmit={(e) => {
e.preventDefault();
setMessage(‘Your event details have been saved in this demo.’);
}}>
Event name
<input required value={eventName} onChange={e => setEventName(e.target.value)} placeholder=“Enter event name” />
City
<input required value={eventCity} onChange={e => setEventCity(e.target.value)} placeholder=“Enter city” />
Event date
<input required type=“date” value={eventDate} onChange={e => setEventDate(e.target.value)} />
Save event
{message && {message}}
);
}

if (['Profile', 'Location', 'Settings', 'Manage Events'].includes(page)) {
  return (
    <section className="form-panel">
      <h2>{page}</h2>
      {page === 'Profile' && <p>Manage your display name and profile details.</p>}
      {page === 'Location' && (
        <label>Preferred city
          <select value={city} onChange={e => setCity(e.target.value)}>
            {['All Cities', ...new Set(events.map(event => event.city))].map(item =>
              <option key={item}>{item}</option>
            )}
          </select>
        </label>
      )}
      {page === 'Manage Events' && <p>Your created events will appear here. Event publishing is not connected yet.</p>}
      {page === 'Settings' && (
        <>
          <label className="setting-row">Email notifications <input type="checkbox" defaultChecked /></label>
          <label className="setting-row">Event reminders <input type="checkbox" defaultChecked /></label>
          <label className="setting-row">Product updates <input type="checkbox" /></label>
        </>
      )}
    </section>
  );
}
return (
  <>
    <div className="hero">
      <div className="hero-content">
        <span className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</span>
        <h2>Find your next<br /><span>unforgettable</span> event.</h2>
        <p>Discover live music, sports, theatre and experiences near you.</p>
        <div className="hero-search">
          <Search size={19} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, artists or venues..." />
        </div>
      </div>
    </div>
    <div className="filter-row">
      {categories.map(item => (
        <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>
      ))}
    </div>
    <div className="section-heading">
      <div>
        <h2>{page === 'Watchlist' ? 'Your watchlist' : 'Discover events'}</h2>
        <p>{filteredEvents.length} events to explore</p>
      </div>
      <label className="city-picker"><MapPin size={16} />
        <select value={city} onChange={e => setCity(e.target.value)}>
          {['All Cities', ...new Set(events.map(event => event.city))].map(item =>
            <option key={item}>{item}</option>
          )}
        </select>
      </label>
    </div>
    <div className="event-grid">
      {filteredEvents.map(event => (
        <article className="event-card" key={event.id}>
          <div className="event-image">
            <img src={event.image} alt="" />
            <span className="event-category">{event.category}</span>
            <button className="heart-button" aria-label="Toggle watchlist" onClick={() => toggleWatchlist(event.id)}>
              <Heart size={19} fill={watchlist.includes(event.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="event-details">
            <span className="event-date"><CalendarDays size={14} /> {event.date}</span>
            <h3>{event.title}</h3>
            <p className="artist-name">{event.artist}</p>
            <p className="event-city"><MapPin size={14} /> {event.city}</p>
            <div className="card-bottom">
              <span>From <strong>${event.price}</strong></span>
              <button onClick={() => setMessage(`${event.title}: ticket purchasing is not connected yet.`)}>View event ↗</button>
            </div>
          </div>
        </article>
      ))}
    </div>
    {filteredEvents.length === 0 && <p className="empty-state">No events found. Try another search or category.</p>}
    {message && <div className="toast"><span>{message}</span><button onClick={() => setMessage('')}><X size={16}/></button></div>}
  </>
);

}

return (
<aside className={menuOpen ? ‘sidebar open’ : ‘sidebar’}>
eeventspace
WORKSPACE
{navigation.map(({ label, icon: Icon }) => (
<button key={label} className={page === label ? ‘nav-item selected’ : ‘nav-item’} onClick={() => { setPage(label); setMenuOpen(false); setMessage(’’); }}>
{label}
{label === ‘Watchlist’ && watchlist.length > 0 && {watchlist.length}}
))}
EEventspace UserPersonal workspace
  <main className="main-area">
    <header className="topbar">
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={22}/></button>
      <div className="breadcrumb">Workspace <span>/</span> <strong>{page}</strong></div>
      <div className="topbar-right"><span className="status-dot"></span><span>Demo workspace</span><span className="avatar small">E</span></div>
    </header>
    <div className="page-content">
      <div className="welcome-row">
        <div><p className="greeting">WELCOME TO EVENTSPACE</p><h1>{page === 'Discover' ? 'Discover something amazing' : page}</h1></div>
      </div>
      {renderContent()}
    </div>
    <footer>Eventspace <span>•</span> Discover experiences worth remembering</footer>
  </main>
</div>

);
}
