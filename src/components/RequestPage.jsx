import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";

// Updated status tabs - removed "in_progress" from UI
const statusTabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" }, // This now includes both "pending" and "in_progress"
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
      if (activeTab === "pending") {
        // Show both "pending" and "in_progress" under the "Pending" tab
        filtered = filtered.filter(
          (r) => r.status === "pending" || r.status === "in_progress"
        );
      } else {
        filtered = filtered.filter((r) => r.status === activeTab);
      }
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

  const { agent } = useAuth();
  const setOpenForm = useOutletContext();

  // Helper function to get display status
  const getDisplayStatus = (status) => {
    if (status === "in_progress") {
      return "pending"; // Show "in_progress" as "pending" in UI
    }
    return status;
  };

  // Helper function to get status class
  const getStatusClass = (status) => {
    const displayStatus = getDisplayStatus(status);

    return displayStatus === "completed"
      ? "bg-green-100 text-green-800"
      : displayStatus === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
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
                <div className="w-[75%]">
                  <h4 className="font-semibold">{req.fullName}</h4>
                </div>
                <span
                  className={`px-3 py-1 w-[20%] md:w-[10%] h-6 text-xs font-semibold rounded-full capitalize ${getStatusClass(
                    req.status
                  )}`}
                >
                  {getDisplayStatus(req.status)}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-700">
                <strong>Property Type:</strong> {req.propertyType}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Location:</strong> {req.location}
              </p>

              {expanded[req.id] && (
                <p className="mt-2 text-sm text-gray-600 mr-10">
                  <strong>Details:</strong> {req.additionalDetails}
                </p>
              )}

              <div className="mt-3 ml-4 flex flex-wrap gap-2">
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
                <div className="flex gap-2 mt-3">
                  {req.status === "completed" ? (
                    <></>
                  ) : (
                    <button
                      onClick={() =>
                        agent?.status !== "active"
                          ? toast.error(
                              `Account ${agent?.status} ${
                                agent?.status === "inactive"
                                  ? "(Pending Verification)"
                                  : ""
                              }`
                            )
                          : setOpenForm(true)
                      }
                      className="bg-[#00a256] md:w-56 mt-2 text-center text-white md:px-4 p-2 rounded-lg text-sm md:text-[1em] flex items-center gap-2 justify-center"
                    >
                      <FontAwesomeIcon icon={faPlus} /> I have
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
