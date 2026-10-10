import { useMemo, useState } from 'react'
import {
  Activity, AlertCircle, Bell, CheckCircle2, ChevronDown, Clock3, FilePlus2,
  LayoutDashboard, LifeBuoy, Menu, Search, Settings, ShieldCheck, SlidersHorizontal,
  Ticket, Users, X, Zap, ArrowUpRight, Monitor, Wifi, LockKeyhole, Laptop, Printer,
  CircleHelp, ClipboardList
} from 'lucide-react'

const initialTickets = [
  { id: 'INC-1048', title: 'Unable to connect to office VPN', type: 'Incident', category: 'Network', priority: 'High', status: 'In Progress', requester: 'Aarav Sharma', assignee: 'IT Support', date: 'Oct 10, 2026', icon: Wifi },
  { id: 'REQ-1047', title: 'Request access to project repository', type: 'Service Request', category: 'Access', priority: 'Medium', status: 'Open', requester: 'Priya Patel', assignee: 'Unassigned', date: 'Oct 10, 2026', icon: LockKeyhole },
  { id: 'INC-1046', title: 'Laptop running slowly after update', type: 'Incident', category: 'Hardware', priority: 'Medium', status: 'Pending', requester: 'Rohan Deshmukh', assignee: 'Desktop Support', date: 'Oct 09, 2026', icon: Laptop },
  { id: 'REQ-1045', title: 'Install design software', type: 'Service Request', category: 'Software', priority: 'Low', status: 'Resolved', requester: 'Ananya Joshi', assignee: 'IT Support', date: 'Oct 09, 2026', icon: Monitor },
  { id: 'INC-1044', title: 'Printer unavailable on third floor', type: 'Incident', category: 'Hardware', priority: 'Low', status: 'Resolved', requester: 'Vikram Shah', assignee: 'Desktop Support', date: 'Oct 08, 2026', icon: Printer },
]
const navItems = [
  { label: 'Overview', icon: LayoutDashboard }, { label: 'All Tickets', icon: Ticket },
  { label: 'Incidents', icon: AlertCircle }, { label: 'Service Requests', icon: ClipboardList },
  { label: 'Users & Teams', icon: Users },
]
const statusClass = s => s.toLowerCase().replaceAll(' ', '-')
const priorityClass = s => s.toLowerCase()

export default function App() {
  const [tickets, setTickets] = useState(initialTickets)
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All statuses')
  const [typeFilter, setTypeFilter] = useState('All types')
  const [showCreate, setShowCreate] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const [notice, setNotice] = useState('')
  const [form, setForm] = useState({ title: '', type: 'Incident', category: 'Network', priority: 'Medium', description: '' })

  const visibleTickets = useMemo(() => tickets.filter(t => {
    const matchesQuery = `${t.id} ${t.title} ${t.requester} ${t.category}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === 'All statuses' || t.status === statusFilter
    const matchesType = typeFilter === 'All types' || t.type === typeFilter
    const matchesNav = activeNav === 'Incidents' ? t.type === 'Incident' : activeNav === 'Service Requests' ? t.type === 'Service Request' : true
    return matchesQuery && matchesStatus && matchesType && matchesNav
  }), [tickets, query, statusFilter, typeFilter, activeNav])

  const counts = {
    total: tickets.length,
    active: tickets.filter(t => ['Open', 'In Progress', 'Pending'].includes(t.status)).length,
    incidents: tickets.filter(t => t.type === 'Incident' && t.status !== 'Resolved').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  }

  function flash(message) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3500)
  }
  function createTicket(event) {
    event.preventDefault()
    const next = 1049 + tickets.length - initialTickets.length
    const id = `${form.type === 'Incident' ? 'INC' : 'REQ'}-${next}`
    setTickets(prev => [{
      ...form, id, status: 'Open', requester: 'You', assignee: 'Unassigned',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      icon: form.type === 'Incident' ? AlertCircle : ClipboardList,
    }, ...prev])
    setShowCreate(false)
    setForm({ title: '', type: 'Incident', category: 'Network', priority: 'Medium', description: '' })
    flash(`${id} created successfully`)
  }
  function updateStatus(id, status) {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status } : t))
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><LifeBuoy size={22} /></div><div><strong>ServiceDesk</strong><span>IT SERVICE MANAGEMENT</span></div><button className="icon-btn close-nav" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18} /></button></div>
      <div className="workspace-label">WORKSPACE</div>
      <nav className="main-nav">{navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setMobileNav(false) }}><Icon size={18} /><span>{label}</span>{label === 'All Tickets' && <span className="nav-count">{tickets.length}</span>}</button>)}</nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><CircleHelp size={18} /></div><strong>Need a hand?</strong><p>Visit the help center for quick answers and support.</p><button onClick={() => flash('Help center is a demo placeholder.')}>Open help center <ArrowUpRight size={14} /></button></div>
        <button className="nav-item settings-item" onClick={() => flash('Settings are not connected in this demo.')}><Settings size={18} /><span>Settings</span></button>
        <div className="profile"><div className="avatar">SB</div><div className="profile-text"><strong>Service Admin</strong><span>Administrator</span></div><ChevronDown size={16} className="muted" /></div>
      </div>
    </aside>
    {mobileNav && <button className="scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <main className="main-area">
      <header className="topbar"><div className="topbar-left"><button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumb">Workspace <span>/</span> <strong>{activeNav}</strong></div></div>
        <div className="topbar-actions"><div className="system-status"><span className="online-dot" /> All systems operational</div><button className="icon-btn notification-btn" aria-label="Notifications" onClick={() => flash('You are all caught up.')}><Bell size={18} /><i /></button><div className="top-avatar">SB</div></div>
      </header>
      <div className="content">
        <section className="welcome-row"><div><div className="eyebrow"><Zap size={14} /> SERVICE OPERATIONS</div><h1>{activeNav === 'Overview' ? 'Good afternoon, Admin' : activeNav}</h1><p className="subtitle">{activeNav === 'Overview' ? 'Here’s what’s happening across your IT service desk today.' : `Search, review, and manage ${activeNav.toLowerCase()}.`}</p></div><button className="primary-btn" onClick={() => setShowCreate(true)}><FilePlus2 size={17} /> Create ticket</button></section>
        <section className="metrics-grid">
          <MetricCard label="Total tickets" value={counts.total.toString().padStart(2, '0')} note="Across all categories" icon={Ticket} tone="blue" />
          <MetricCard label="Active tickets" value={counts.active.toString().padStart(2, '0')} note="Require attention" icon={Activity} tone="orange" />
          <MetricCard label="Open incidents" value={counts.incidents.toString().padStart(2, '0')} note="Service interruptions" icon={AlertCircle} tone="purple" />
          <MetricCard label="Resolved tickets" value={counts.resolved.toString().padStart(2, '0')} note="Successfully completed" icon={CheckCircle2} tone="green" />
        </section>
        <section className="insight-grid">
          <div className="panel sla-panel"><div className="panel-heading"><div><h2>Service health</h2><p>Current service desk performance</p></div><span className="live-pill"><span /> LIVE</span></div>
            <div className="health-content"><div className="health-ring"><div><strong>96.8%</strong><span>SLA compliance</span></div></div><div className="health-stats">
              <div><span className="health-bullet green-bullet" /><div><strong>Within SLA</strong><span>Healthy response times</span></div><b>96.8%</b></div>
              <div><span className="health-bullet orange-bullet" /><div><strong>At risk</strong><span>Approaching deadline</span></div><b>2.1%</b></div>
              <div><span className="health-bullet red-bullet" /><div><strong>Breached</strong><span>Needs immediate review</span></div><b>1.1%</b></div>
            </div></div>
          </div>
          <div className="panel quick-panel"><div className="panel-heading"><div><h2>Quick actions</h2><p>Common tasks, one click away</p></div></div><div className="quick-actions">
            <button onClick={() => { setForm(f => ({ ...f, type: 'Incident' })); setShowCreate(true) }}><span className="quick-icon coral"><AlertCircle size={18} /></span><span><strong>Report an incident</strong><small>Something isn't working</small></span><ArrowUpRight size={16} /></button>
            <button onClick={() => { setForm(f => ({ ...f, type: 'Service Request' })); setShowCreate(true) }}><span className="quick-icon indigo"><ClipboardList size={18} /></span><span><strong>Request a service</strong><small>Access, software, hardware</small></span><ArrowUpRight size={16} /></button>
            <button onClick={() => flash('Knowledge base is a demo placeholder.')}><span className="quick-icon teal"><ShieldCheck size={18} /></span><span><strong>Browse knowledge base</strong><small>Find self-service answers</small></span><ArrowUpRight size={16} /></button>
          </div></div>
        </section>
        <section className="panel tickets-panel"><div className="tickets-heading"><div><h2>{activeNav === 'Overview' ? 'Recent tickets' : activeNav}</h2><p>Track and manage service desk activity</p></div><button className="text-btn" onClick={() => setActiveNav('All Tickets')}>View all tickets <ArrowUpRight size={15} /></button></div>
          <div className="filters"><div className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tickets, requesters..." aria-label="Search tickets" /></div>
            <div className="filter-select"><SlidersHorizontal size={15} /><select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} aria-label="Filter by type"><option>All types</option><option>Incident</option><option>Service Request</option></select></div>
            <select className="status-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All statuses</option><option>Open</option><option>In Progress</option><option>Pending</option><option>Resolved</option></select>
          </div>
          <div className="table-wrap"><table><thead><tr><th>TICKET</th><th>REQUESTER</th><th>PRIORITY</th><th>STATUS</th><th>CREATED</th><th /></tr></thead><tbody>
            {visibleTickets.length ? visibleTickets.map(t => <tr key={t.id}><td><div className="ticket-cell"><span className="ticket-icon"><t.icon size={17} /></span><div><strong>{t.title}</strong><small>{t.id} <span>·</span> {t.category}</small></div></div></td><td><div className="requester"><span className="mini-avatar">{t.requester.split(' ').map(x => x[0]).join('').slice(0, 2)}</span>{t.requester}</div></td><td><span className={`priority ${priorityClass(t.priority)}`}><i />{t.priority}</span></td><td><select className={`status-badge ${statusClass(t.status)}`} value={t.status} onChange={e => updateStatus(t.id, e.target.value)} aria-label={`Update ${t.id} status`}><option>Open</option><option>In Progress</option><option>Pending</option><option>Resolved</option></select></td><td className="date-cell">{t.date}</td><td><button className="row-more" title={`Ticket ${t.id}`} onClick={() => flash(`${t.id}: ${t.title} — assigned to ${t.assignee}.`)}>···</button></td></tr>) : <tr><td colSpan="6" className="empty-state">No tickets match these filters.</td></tr>}
          </tbody></table></div>
          <div className="table-footer"><span>Showing <strong>{visibleTickets.length}</strong> of <strong>{tickets.length}</strong> tickets</span><span className="footer-note"><Clock3 size={14} /> Updated just now</span></div>
        </section>
        <footer>© 2026 ServiceDesk <span>·</span> IT Service Management <span className="footer-right">Demo data · Local session only</span></footer>
      </div>
    </main>
    {notice && <div className="toast" role="status"><CheckCircle2 size={18} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notification"><X size={15} /></button></div>}
    {showCreate && <div className="modal-backdrop" onClick={() => setShowCreate(false)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="create-title" onClick={e => e.stopPropagation()}>
      <div className="modal-header"><div><span className="eyebrow">SERVICE DESK</span><h2 id="create-title">Create a ticket</h2><p>Tell us what you need help with.</p></div><button className="icon-btn" onClick={() => setShowCreate(false)} aria-label="Close dialog"><X size={19} /></button></div>
      <form onSubmit={createTicket}><label>Ticket title<input required maxLength="100" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Cannot access email" /></label>
        <div className="form-two"><label>Ticket type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Incident</option><option>Service Request</option></select></label><label>Category<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}><option>Network</option><option>Hardware</option><option>Software</option><option>Access</option><option>Email</option><option>Other</option></select></label></div>
        <label>Priority<select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></label>
        <label>Description<textarea rows="4" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Add relevant details..." /></label>
        <div className="modal-actions"><button type="button" className="secondary-btn" onClick={() => setShowCreate(false)}>Cancel</button><button className="primary-btn" type="submit"><FilePlus2 size={16} /> Submit ticket</button></div>
      </form>
    </section></div>}
  </div>
}

function MetricCard({ label, value, note, icon: Icon, tone }) {
  return <article className="metric-card"><div className={`metric-icon ${tone}`}><Icon size={19} /></div><span className="metric-label">{label}</span><div className="metric-value">{value}</div><div className="metric-note"><span className="note-dot" />{note}</div></article>
}



<div className="profile-section">
  <div className="profile-avatar">U</div>

  <div className="profile-info">
    <h4>Admin User</h4>
    <p>Administrator</p>
  </div>

  <button
    className="profile-logout"
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }}
  >
    Logout
  </button>
</div>