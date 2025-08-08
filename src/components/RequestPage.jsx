import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const statusTabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const RequestsPage = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({}); // track expanded cards

  useEffect(() => {
    fetch("https://backend.realestway.com/api/user-requests", {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
        setLoading(false);
      });
  }, [token]);

  // Filter by tab and search
  useEffect(() => {
    let filtered = [...requests];
    if (activeTab !== "all") {
      filtered = filtered.filter((r) => r.status === activeTab);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.fullName?.toLowerCase().includes(term) ||
          r.phone?.includes(term) ||
          r.location?.toLowerCase().includes(term)
      );
    }
    setFilteredRequests(filtered);
  }, [requests, activeTab, searchTerm]);

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Change status to ${status}?`)) return;
    try {
      await fetch(
        `https://realestway-backend.up.railway.app/api/user-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req))
      );
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await fetch(
        `https://realestway-backend.up.railway.app/api/user-requests/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequests((prev) => prev.filter((req) => req.id !== id));
      toast.success("Request deleted");
    } catch {
      toast.error("Failed to delete request");
    }
  };

  if (loading) return <p className="text-center py-10">Loading requests...</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Sticky filter bar */}
      <div className="sticky top-0 bg-white z-10 pb-2">
        <h1 className="text-2xl font-bold text-[#100073] mb-3">
          User Requests
        </h1>

        {/* Status Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-[#100073] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, phone, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 w-full border rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Requests List */}
      <div className="mt-4 space-y-4">
        {filteredRequests.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No requests match this filter.
          </p>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="border rounded-lg shadow-sm bg-white p-4"
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-semibold">{req.fullName}</h4>
                  <p className="text-sm text-gray-500">{req.phone}</p>
                  <p className="text-sm text-gray-500">{req.email}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full capitalize
                    ${
                      req.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : req.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.status === "in_progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                >
                  {req.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-700">
                <strong>Property Type:</strong> {req.propertyType}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {req.location}
              </p>

              {expanded[req.id] && (
                <p className="mt-2 text-sm text-gray-600">
                  <strong>Details:</strong> {req.additionalDetails}
                </p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setExpanded((prev) => ({
                      ...prev,
                      [req.id]: !prev[req.id],
                    }))
                  }
                  className="text-xs bg-gray-50 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded"
                >
                  {expanded[req.id] ? "Hide Details" : "View Details"}
                </button>
                <button
                  onClick={() => updateStatus(req.id, "in_progress")}
                  className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1 rounded"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(req.id, "completed")}
                  className="text-xs bg-green-50 text-green-600 hover:bg-green-100 px-3 py-1 rounded"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(req.id, "cancelled")}
                  className="text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteRequest(req.id)}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
