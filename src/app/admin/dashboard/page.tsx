// src/app/admin/dashboard/page.tsx

import './dashboard.css';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card visitors">
          <h3>Visitors</h3>
          <p>1,200</p>
        </div>
        <div className="stat-card views">
          <h3>Page Views</h3>
          <p>4,830</p>
        </div>
        <div className="stat-card posts">
          <h3>Total Posts</h3>
          <p>312</p>
        </div>
        <div className="stat-card messages">
          <h3>Messages</h3>
          <p>45</p>
        </div>
      </div>

      <div className="recent-activities">
        <h2>🕒 Recent Activities</h2>
        <ul>
          <li>📰 New post published: "Sri Lanka wins!"</li>
          <li>💬 Comment added on: "Budget 2025"</li>
          <li>📥 Message received from contact form</li>
          <li>📝 Post updated: "Election Results Live"</li>
        </ul>
      </div>
    </div>
  );
}
