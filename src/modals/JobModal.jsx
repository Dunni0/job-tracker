"use client";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/modal/modalSlice";
import { createJob, updateJob, deleteJob } from "@/store/job";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const EMPTY_FORM = {
  company: "",
  role: "",
  location: "",
  status: "wishlist",
  url: "",
  notes: "",
};

export default function JobModal() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { isOpen, mode, job } = useSelector((state) => state.modal);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mode === "edit" && job) {
      setForm({
        company: job.company || "",
        role: job.role || "",
        location: job.location || "",
        status: job.status || "wishlist",
        url: job.url || "",
        notes: job.notes || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [mode, job]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer); // cleanup if component unmounts or error changes
    }
  }, [error]);

  if (!mounted || !isOpen) return null;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    try {
      if (mode === "add") {
        await createJob(form);
        toast.success("job added!");
      }

      if (mode === "edit") {
        await updateJob(job._id, form);
        toast.success("job updated!");
      }

      if (mode === "delete") {
        await deleteJob(job._id);
        toast.success("job deleted!");
      }

      queryClient.invalidateQueries(["jobs"]);
      dispatch(closeModal());
    } catch (err) {
      console.error("Action failed:", err);
      const message =
        mode === "add"
          ? "failed to create job."
          : mode === "edit"
            ? "failed to update job."
            : "failed to delete job.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await handleConfirm();
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "0.75rem",
          width: "400px",
          maxWidth: "500px",
          padding: "1rem",
        }}
      >
        {mode === "signout" ? (
          <div className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <AiOutlineLogout size={18} className="text-gray-500" />
              </div>
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-1">
                  sign out?
                </h2>
                <p className="text-sm text-gray-500">
                  are you sure you want to sign out of your account?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => dispatch(closeModal())}
                disabled={loading}
                className={`px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                cancel
              </button>
              <button
                onClick={async () => {
                  setLoading(true);
                  await signOut({ callbackUrl: "/login" });
                }}
                disabled={loading}
                className={`px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                  loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                )}
                {loading ? "signing out..." : "yes, sign out"}
              </button>
            </div>
          </div>
        ) : mode === "delete" ? (
          <div className="p-6">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "0.5rem",
                marginBottom: "0.2rem",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0">
                  <FiTrash2 size={20} style={{ color: "#EF4444" }} />
                </div>
                <h2 className="text-base font-medium text-gray-900 mb-1">
                  delete this job?
                </h2>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6B7280",
                  marginBottom: "0.75rem",
                }}
              >
                are you sure you want to permanently delete{" "}
                <span className="font-medium text-gray-700">{job?.role}</span>{" "}
                at{" "}
                <span className="font-medium text-gray-700">
                  {job?.company}
                </span>
                ? this action cannot be undone.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => {
                  dispatch(closeModal());
                  setError("");
                }}
                disabled={loading}
                className={`px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
                  loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  backgroundColor: "#EF4444",
                  color: "white",
                  borderRadius: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "background-color 0.2s",
                }}
              >
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                    />
                  </svg>
                )}
                {loading ? "deleting..." : "yes, delete"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "0.4rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {mode === "add" ? "add a job" : "edit job"}
              </h2>
              <button
                onClick={() => dispatch(closeModal())}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <AiOutlineClose size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. Paystack"
                    required
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">role</label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="e.g. Frontend Engineer"
                    required
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-500">status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                  >
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">job url</label>
                <input
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="anything worth remembering about this role..."
                  rows={3}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-100 pt-3">
                <button
                  type="button"
                  onClick={() => dispatch(closeModal())}
                  disabled={loading}
                  className={`px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors ${
                    loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                    loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a12 12 0 00-12 12h4z"
                      />
                    </svg>
                  )}
                  {loading
                    ? "saving..."
                    : mode === "add"
                      ? "save job"
                      : "update job"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
