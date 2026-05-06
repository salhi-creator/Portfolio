import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import api from "../api/axios";
/**
 * DASHBOARD CONFIGURATION
 * Shares the same styling as your portfolio
 * Edit these values to customize your dashboard
 */

/**
 * MAIN DASHBOARD COMPONENT
 */
export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, canceled
  const [sortBy, setSortBy] = useState("deadline"); // deadline, budget, name
  const [selectedRequest, setSelectedRequest] = useState([]); // For modal popup

  /**
   * FILTER & SORT LOGIC
   * Apply search, status filter, and sorting to requests
   */

  let [userRequests, setUserRequests] = useState([
    {
      chat_id: "--",
      fullName: "--",
      deadline: "--",
      createdAt: "--",
      service: "--",
      status: "--",
      details: "--",
      budget: "--",
    },
  ]);
  useEffect(() => {
    async function getData() {
      try {
        let result = await api.get("/giveMeData");
        console.log("result ", result);
        if (result.data) {
          console.log(result.data);
          setUserRequests(result.data);
          userRequests.filter((req) => req.chat_id !== "--");
        }
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  let filteredRequests = null;
  filteredRequests =
    userRequests
      ?.filter((request) => {
        // Search filter
        const matchesSearch =
          request.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.details.toLowerCase().includes(searchTerm.toLowerCase());

        // Status filter
        const matchesStatus =
          filterStatus === "all" || request.status === filterStatus;

        return matchesSearch && matchesStatus;
      })
      ?.sort((a, b) => {
        // Sorting logic
        if (sortBy === "budget") {
          let A = parseInt(a.toString().replace("$", ""));
          let B = parseInt(b.toString().replace("$", ""));
          return B - A;
        } else if (sortBy === "name") {
          return a.fullName.localeCompare(b.fullName);
        } else {
          // deadline (default)
          return new Date(a.deadline) - new Date(b.deadline);
        }
      }) || [];

  return (
    // ok
    <div className="min-h-screen bg-black text-white">
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="font-bold text-xl">Dashboard</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#" className="hover:text-gray-400 transition">
                Overview
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Requests
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Analytics
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                Settings
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded transition"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
              <a
                href="#"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Overview
              </a>
              <a
                href="#"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Requests
              </a>
              <a
                href="#"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Analytics
              </a>
              <a
                href="#"
                className="block p-2 hover:bg-white/10 rounded transition"
              >
                Settings
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* PAGE HEADER */}
          <div className="mb-12 animate-fade-in-down">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              User Requests
            </h1>
            <p className="text-gray-400 text-lg">
              Manage and track all incoming service requests
            </p>
          </div>

          {/* STATS CARDS */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Total Requests */}
            <div
              className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-105"
              style={{ animation: "fade-in-up 0.6s ease-out 0.1s backwards" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Total Requests</p>
                  <p className="text-3xl font-bold">{userRequests?.length}</p>
                </div>
                <div className="text-4xl opacity-20">📋</div>
              </div>
            </div>

            {/* Active Requests */}
            <div
              className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-105"
              style={{ animation: "fade-in-up 0.6s ease-out 0.2s backwards" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Active Requests</p>
                  <p className="text-3xl font-bold text-green-400">
                    {userRequests?.filter((r) => r.status === "active").length}
                  </p>
                </div>
                <div className="text-4xl opacity-20">✓</div>
              </div>
            </div>

            {/* Canceled Requests */}
            <div
              className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-105"
              style={{ animation: "fade-in-up 0.6s ease-out 0.3s backwards" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Canceled</p>
                  <p className="text-3xl font-bold text-red-400">
                    {
                      userRequests?.filter((r) => r.status === "canceled")
                        .length
                    }
                  </p>
                </div>
                <div className="text-4xl opacity-20">✕</div>
              </div>
            </div>
          </div>

          {/* FILTERS & SEARCH */}
          <div
            className="grid md:grid-cols-3 gap-4 mb-8 animate-fade-in-up"
            style={{ animation: "fade-in-up 0.6s ease-out 0.4s backwards" }}
          >
            {/* Search Input */}
            <div className="relative col-span-full md:col-span-2">
              <Search
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name, service, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-white/10 focus:outline-none transition text-white placeholder-gray-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-white/10 focus:outline-none transition text-white appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="canceled">Canceled Only</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative md:col-start-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-white/30 focus:bg-white/10 focus:outline-none transition text-white appearance-none cursor-pointer"
              >
                <option value="deadline">Sort by Deadline</option>
                <option value="budget">Sort by Budget</option>
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-3 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          {/* REQUESTS TABLE - RESPONSIVE */}
          <div
            className="overflow-x-auto border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm"
            style={{ animation: "fade-in-up 0.6s ease-out 0.5s backwards" }}
          >
            {/* Desktop Table View */}
            <table className="hidden lg:table w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Details
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Requested
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Deadline
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests?.map((request, index) => (
                  <tr
                    key={request?.chat_id}
                    onClick={() =>
                      request.chat_id !== "--"
                        ? setSelectedRequest(request)
                        : setSelectedRequest(null)
                    }
                    className="border-b border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                    style={{
                      animation: `fade-in-row 0.5s ease-out ${index * 0.05}s backwards`,
                    }}
                  >
                    {/* ID */}
                    <td className="px-6 py-4 text-sm text-gray-400">
                      #{request?.chat_id || "-"}
                    </td>

                    {/* Full Name */}
                    <td className="px-6 py-4 text-sm font-semibold text-white group-hover:text-gray-300">
                      {request?.fullName || "-"}
                    </td>

                    {/* Details */}
                    <td className="px-6 py-4 text-sm text-gray-400 max-w-xs truncate group-hover:text-gray-300">
                      {request?.details || "-"}
                    </td>

                    {/* Service Name */}
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs font-medium">
                        {request?.service || "-"}
                      </span>
                    </td>

                    {/* Budget */}
                    <td className="px-6 py-4 text-sm font-semibold text-green-400">
                      ${request?.budget}
                    </td>

                    {/* Request Date */}
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {request?.createdAt && request?.createdAt !== "--"
                        ? new Date(request?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "-"}
                    </td>

                    {/* Deadline */}
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {request?.deadline && request?.deadline !== "--"
                        ? new Date(request?.deadline).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "-"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        {request.status === "active" ? (
                          <>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-green-400 font-semibold">
                              Active
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-red-400 font-semibold">
                              Canceled
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile & Tablet Card View */}
            <div className="lg:hidden p-4 space-y-4">
              {filteredRequests?.map((request, index) => (
                <div
                  key={request?.chat_id || "-"}
                  onClick={() => setSelectedRequest(request)}
                  className="border border-white/10 rounded-lg p-4 bg-black/40 hover:bg-white/5 transition-all transform hover:scale-102 group cursor-pointer"
                  style={{
                    animation: `fade-in-up 0.5s ease-out ${index * 0.05}s backwards`,
                  }}
                >
                  {/* Header with Name and Status */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white group-hover:text-gray-300 transition">
                        {request?.fullName || "-"}
                      </h3>
                      <p className="text-xs text-gray-500">
                        ID: #{request?.chat_id || "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {request?.status === "active" ? (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400 font-semibold">
                            Active
                          </span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-xs text-red-400 font-semibold">
                            Canceled
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {request?.details || "-"}
                  </p>

                  {/* Service Badge */}
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs font-medium">
                      {request?.service || "-"}
                    </span>
                  </div>

                  {/* Details Row */}
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Budget</p>
                      <p className="font-semibold text-green-400">
                        ${request?.budget}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Requested</p>
                      <p className="font-semibold text-white">
                        {request?.createdAt && request?.createdAt !== "--"
                          ? new Date(request?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Deadline</p>
                      <p className="font-semibold text-white">
                        {request?.deadline && request?.deadline !== "--"
                          ? new Date(request?.deadline).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NO RESULTS MESSAGE */}
          {filteredRequests?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No requests found matching your filters.
              </p>
            </div>
          )}

          {/* RESULTS SUMMARY */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing{" "}
            <span className="text-white font-semibold">
              {filteredRequests?.length || "-"}
            </span>{" "}
            of{" "}
            <span className="text-white font-semibold">
              {userRequests?.length || "-"}
            </span>{" "}
            requests
          </div>
        </div>
      </div>

      {/* REQUEST DETAILS MODAL */}
      {selectedRequest && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedRequest(null)}
        >
          {/* Modal Container */}
          <div
            className="bg-black border border-white/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-lg transition z-10"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {selectedRequest.fullName}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Request ID: #{selectedRequest.chat_id}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3">
                  {selectedRequest.status === "active" ? (
                    <>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-400 font-semibold">
                        Active Request
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-red-400 font-semibold">
                        Canceled
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="border-t border-white/10 pt-8">
                {/* Full Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 text-gray-300">
                    Project Details
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-wrap break-words">
                    {selectedRequest.details}
                  </p>
                </div>

                {/* Service Info */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-3 text-gray-300">
                    Service
                  </h3>
                  <div className="inline-block px-4 py-2 bg-blue-900/40 border border-blue-700/50 text-blue-300 rounded-lg font-semibold">
                    {selectedRequest.service}
                  </div>
                </div>

                {/* Budget & Timeline Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* Request Date Card */}
                  <div className="border border-white/10 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition">
                    <p className="text-gray-400 text-sm mb-2">Requested On</p>
                    <p className="text-3xl font-bold text-purple-400">
                      {new Date(selectedRequest.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>

                  {/* Budget Card */}
                  <div className="border border-white/10 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition">
                    <p className="text-gray-400 text-sm mb-2">Budget</p>
                    <p className="text-3xl font-bold text-green-400">
                      ${selectedRequest?.budget}
                    </p>
                  </div>

                  {/* Deadline Card */}
                  <div className="border border-white/10 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition md:col-span-2">
                    <p className="text-gray-400 text-sm mb-2">Deadline</p>
                    <p className="text-3xl font-bold text-blue-400">
                      {new Date(selectedRequest.deadline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {Math.ceil(
                        (new Date(selectedRequest?.deadline) - new Date()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days remaining
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="flex-1 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105"
                  >
                    Accept Request
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="flex-1 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="flex-1 px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-row {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Modal animations */
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        /* Smooth transitions */
        * {
          transition-property: background-color, border-color, color;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 200ms;
        }
      `}</style>
    </div>
  );
}
