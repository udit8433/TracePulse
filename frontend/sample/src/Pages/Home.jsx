
import React, { useEffect, useState, useCallback } from "react";
import "./Home.css";
import api from "../api.js";
import Navbar from "../Components/navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import { deleteMonitor } from "../api.js";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import toast from "react-hot-toast";
import { getMonitorHistory } from "../api.js";






function Home() {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [user,setUser]=useState(null);
    const [apis, setApis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [searchTerm,setSearchTerm]=useState("");
    const [expandedApi, setExpandedApi] = useState(null);

const [historyData, setHistoryData] = useState({});
const [historyLoading, setHistoryLoading] = useState(false);




const filteredApis = apis.filter((api) =>
    api.name?.toLowerCase().includes(searchTerm.trim().toLowerCase())
);
    // Fetch all monitored APIs
const fetchApis = useCallback(async () => {
    try {
        setError("");

        const response = await api.get("/api/all");

        setApis(
            Array.isArray(response.data)
                ? response.data
                : response.data.apis || []
        );

    } catch (err) {
        setError(
            err.response?.data?.message || "Failed to load monitors"
        );
    } finally {
        setFetching(false);
    }
}, []);

const fetchProfile = async () => {
    try {
        const res = await api.get("/user/profile");
        setUser(res.data);

    } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("ERROR:", error.response?.data || error.message);
    }
};

useEffect(() => {
    fetchProfile();
}, []);


useEffect(() => {
    fetchApis();
    
    const interval = setInterval(() => {
        fetchApis();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
}, [fetchApis]);



const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
        "Are you sure you want to delete this monitor?");

      if (!confirmDelete) return;
    try {
   
    
        await deleteMonitor(id);

        setApis((prev) =>
            prev.filter((api) => api._id !== id)
        );

        toast.success("Monitor deleted successfully");

    } catch (error) {
        toast.error("Failed to delete monitor");
    }
};



const toggleHistory = async (apiId) => {

    // Collapse if already expanded
    if (expandedApi === apiId) {
        setExpandedApi(null);
        return;
    }

    setExpandedApi(apiId);

    // Don't fetch again if history is already available
    if (historyData[apiId]) return;

    try {
        setHistoryLoading(true);

        const response = await getMonitorHistory(apiId);

        setHistoryData((prev) => ({
            ...prev,
            [apiId]: response.history || []
        }));

    } catch (error) {
        console.log("History fetch error:", error);
        toast.error("Unable to load response history");
    } finally {
        setHistoryLoading(false);
    }
};





    // Add a new API
  const handleAddApi = async (e) => {
    e.preventDefault();

    if (!name.trim() || !url.trim()) {
        setError("Please enter both API name and URL");
        return;
    }

    try {
        setLoading(true);
        setError("");
        setSuccess("");

        const response = await api.post("/api/add", {
            name: name.trim(),
            url: url.trim()
        });

        setName("");
        setUrl("");

        setSuccess("API added successfully!");

        await fetchApis();

    } catch (err) {
        setError(
            err.response?.data?.message || "Something went wrong"
        );
    } finally {
        setLoading(false);
    }
};

    // Calculate dashboard statistics
    const totalApis = apis.length;

    const upApis = apis.filter(
        api => api.status === "UP"
    ).length;

    const downApis = apis.filter(
        api => api.status === "DOWN"
    ).length;

    const unknownApis = apis.filter(
        api => api.status === "UNKNOWN"
    ).length;

    const averageResponse = apis.length
        ? Math.round(
            apis.reduce(
                (total, api) => total + (api.responseTime || 0),
                0
            ) / apis.length
        )
        : 0;

    const formatDate = (date) => {
        if (!date) return "Not available";

        return new Date(date).toLocaleString();
    };

    const formatInterval = (interval) => {
          
        if (!interval) return "Not configured";

        if (interval < 60000) {
            return `${interval / 1000} seconds`;
        }

        return `${interval / 30000} minute(s)`;
    };

    return (<>
      

    
        
        <div className="dashboard">
           
          

            {/* Main Content */}
            <main className="main-content">

                <header className="topbar">
                    <div>
  <h1 className="text-white text-[55px] relative bottom-[22px]"> Welcome, {user?.name || "User"} 👋</h1>
                        
                        <p >
                            Monitor your APIs and track their performance.
                        </p>
                    </div>

                    <button
                        className="refresh-btn"
                        onClick={fetchApis}
                        disabled={fetching}
                    >
                        ↻ {fetching ? "Refreshing..." : "Refresh"}
                    </button>
                </header>

                {/* Statistics */}
                <section className="stats-grid">

                    <div className="stat-card">
                        <div className="stat-top">
                            <span>Total Monitors</span>
                            <span className="stat-icon blue">▦</span>
                        </div>
                        <h2>{totalApis}</h2>
                        <p>Registered APIs</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span>Online</span>
                            <span className="stat-icon green">✓</span>
                        </div>
                        <h2 className="green-text">{upApis}</h2>
                        <p>Working correctly</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span>Down</span>
                            <span className="stat-icon red">!</span>
                        </div>
                        <h2 className="red-text">{downApis}</h2>
                        <p>Need attention</p>
                    </div>

                    <div className="stat-card">
                        <div className="stat-top">
                            <span>Unknown</span>
                            <span className="stat-icon yellow">?</span>
                        </div>
                        <h2>{unknownApis}</h2>
                        <p>Not checked yet</p>
                    </div>

                </section>

                {/* Performance */}
                <section className="performance-card">
                    <div>
                        <span className="performance-label">
                            Average Response Time
                        </span>
                        <h2>{averageResponse} <small>ms</small></h2>
                        <p>Across all registered monitors</p>
                    </div>

                    <div className="performance-symbol">◷</div>
                </section>

                {/* Add Monitor Form */}
                <section className="add-section">

                    <div className="section-heading">
                        <div>
                            <h2>Add New Monitor</h2>
                            <p>Enter the API details you want to monitor.</p>
                        </div>
                        <span className="add-icon">+</span>
                    </div>

                    <form onSubmit={handleAddApi} className="add-form">

                        <div className="form-group">
                            <label>API Name</label>
                            <input
                                type="text"
                                placeholder="e.g. User Authentication API"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>API Endpoint URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/api/users"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="add-btn"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "+ Add Monitor"}
                        </button>

                    </form>

                    {error && (
                        <div className="message error-message">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="message success-message">
                            {success}
                        </div>
                    )}

                </section>

                {/* All Monitors */}
                <section className="monitor-section">

                    <div className="section-heading">
                        <div>
                            <h2>All Monitors</h2>
                            <p>View the current health of your APIs.</p>
                        </div>

                        <span className="monitor-count">
                            {totalApis} Monitors
                        </span>
                    </div>

                    <div className="monitor-search relative bottom-[7px]">
    <span className="search-icon">⌕</span>
    <input
        type="text"
        placeholder="Search monitors by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
</div>

                    {fetching ? (
                        <div className="empty-state">
                            Loading monitors...
                        </div>
                    ) : apis.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">⌁</div>
                            <h3>No monitors yet</h3>
                            <p>Add your first API to start monitoring.</p>
                        </div>
                    ) : (

                        <div className="monitor-list">

                           {filteredApis.map((api) => (

                                <article
                                    className="monitor-card"
                                    key={api._id}
                                >

                                    <div className="monitor-main">

                                        <div className={`monitor-indicator ${
                                            api.status === "UP"
                                                ? "indicator-up"
                                                : api.status === "DOWN"
                                                ? "indicator-down"
                                                : "indicator-unknown"
                                        }`}></div>

                                        <div className="monitor-details">
                                            <h3>{api.name}</h3>
                                            <a
                                                href={api.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="monitor-url"
                                            >
                                                {api.url}
                                            </a>
                                        </div>

                                        <span className={`status-badge ${
                                            api.status === "UP"
                                                ? "status-up"
                                                : api.status === "DOWN"
                                                ? "status-down"
                                                : "status-unknown"
                                        }`}>
                                            {api.status || "UNKNOWN"}
                                        </span>

                                            <button
        className="delete-btn"
        onClick={() => handleDelete(api._id)}
    >
        <i className="fa-solid fa-trash"></i>
        Delete
    </button>

                                    </div>

                                    <div className="monitor-metrics">

                                        <div className="metric">
                                            <span>Response Time</span>
                                            <strong>
                                                {api.responseTime ?? 0} ms
                                            </strong>
                                        </div>

                                        <div className="metric">
                                            <span>Status Code</span>
                                            <strong>
                                                {api.statusCode || "N/A"}
                                            </strong>
                                        </div>

                                        <div className="metric">
                                            <span>Monitoring Interval</span>
                                            <strong>
                                                {formatInterval(api.interval)}
                                            </strong>
                                        </div>

                                        <div className="metric">
                                            <span>Monitoring</span>
                                            <strong className={
                                                api.isActive
                                                    ? "green-text"
                                                    : "red-text"
                                            }>
                                                {api.isActive ? "Active" : "Paused"}
                                            </strong>
                                        </div>

                                        <div className="metric">
                                            <span>Created At</span>
                                            <strong>
                                                {formatDate(api.createdAt)}
                                            </strong>
                                        </div>

                                        <div className="metric">
                                            <span>Last Updated</span>
                                            <strong>
                                                {formatDate(api.updatedAt)}
                                            </strong>
                                        </div>

                                        <div className="metric">
                                            <span>Monitor ID</span>
                                            <strong className="id-text">
                                                {api._id}
                                            </strong>
                                        </div>

                                    </div>


                                    {/* Response Time History */}

<div className="history-section">

    <button
        className="history-toggle"
        onClick={() => toggleHistory(api._id)}
        type="button"
    >
        <span>
            <i className="fa-solid fa-chart-line"></i>
            Response Time History
        </span>

        <i className={`fa-solid ${
            expandedApi === api._id
                ? "fa-chevron-up"
                : "fa-chevron-down"
        }`}></i>
    </button>


    {expandedApi === api._id && (

        <div className="history-chart-container">

            <h3>API Performance History</h3>

            <p>Historical response time measurements</p>

            {historyLoading ? (

                <div className="empty-state">
                    Loading history...
                </div>

            ) : historyData[api._id]?.length > 0 ? (

                <ResponsiveContainer width="100%" height={260}>
                
                    <LineChart
                        data={historyData[api._id].map((item) => ({
                            ...item,
                            time: new Date(
                                item.checkedAt
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })
                        }))}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#334155"
                        />

                        <XAxis
                            dataKey="time"
                            stroke="#94a3b8"
                            tick={{ fontSize: 12 }}
                        />

                        <YAxis
                            stroke="#94a3b8"
                            tick={{ fontSize: 12 }}
                            label={{
                                value: "Response (ms)",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#94a3b8"
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#111827",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#fff"
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="responseTime"
                            stroke="#22d3ee"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#22d3ee" }}
                            activeDot={{ r: 6 }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            ) : (

                <div className="empty-state">
                    No response history available yet.
                </div>

            )}

        </div>

    )}

</div>

                                </article>

                            ))}

                        </div>
                    )}

                </section>

                <footer className="footer">
                    PulseMonitor · API Health & Performance Dashboard
                </footer>

            </main>
     </div>
        
    
 </>)}

export default Home;
