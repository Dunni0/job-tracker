"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getAllJobs } from "@/store/job";
import TopBar from "@/components/TopBar";
import Board from "@/components/Board";
import JobModal from "@/modals/JobModal";
import JobCard from "@/components/JobCard";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modal/modalSlice";
import BoardSkeleton from "@/components/BoardSkeleton";
import MobileSkeleton from "@/components/MobileSkeleton";
import { useRouter } from "next/navigation";

const STATUSES = ["wishlist", "applied", "interview", "offer", "rejected"];
const STATUS_LABELS = {
  wishlist: "Wishlist",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("wishlist");
  const [localJobs, setLocalJobs] = useState([]);

  const {
    data: jobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getAllJobs,
    enabled: !!session,
  });

  const jobsString = JSON.stringify(jobs);

  useEffect(() => {
  if (status === "unauthenticated") {
    router.push("/login");
  }
}, [status, router]);

  useEffect(() => {
    setLocalJobs(jobs);
  }, [jobsString]);

  // called by Board when a card is dragged
  function handleJobMove(id, newStatus) {
    setLocalJobs((prev) =>
      prev.map((job) => (job._id === id ? { ...job, status: newStatus } : job)),
    );
  }

  const stats = {
    total: localJobs.length,
    interview: localJobs.filter((j) => j.status === "interview").length,
    offer: localJobs.filter((j) => j.status === "offer").length,
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-6 py-3 h-[52px] animate-pulse" />
        <main className="hidden md:flex flex-1 overflow-hidden">
          <BoardSkeleton />
        </main>
        <main className="flex md:hidden flex-1 flex-col overflow-hidden">
          <MobileSkeleton />
        </main>
      </div>
    );
  }
  const activeJobs = localJobs.filter((j) => j.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <TopBar stats={stats} status={isLoading} />

      {isLoading ? (
        <>
          {/* desktop skeleton */}
          <main className="hidden md:flex flex-1 overflow-hidden">
            <BoardSkeleton />
          </main>
          {/* mobile skeleton */}
          <main className="flex md:hidden flex-1 flex-col overflow-hidden">
            <MobileSkeleton />
          </main>
        </>
      ) : isError ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-red-400">
            something went wrong. please refresh.
          </p>
        </div>
      ) : (
        <>
          {/* desktop board */}
          <main className="hidden md:flex flex-1 overflow-hidden">
            <Board jobs={localJobs} onJobMove={handleJobMove} />
          </main>

          {/* mobile tab layout */}
          <main className="flex md:hidden flex-1 flex-col overflow-hidden">
            {/* mobile stats */}
            <div className="grid grid-cols-3 gap-2 px-4 pt-4">
              <div className="bg-white border border-gray-100 rounded-xl p-3 text-center">
                <p className="text-lg font-medium text-gray-900">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-400">total</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                <p className="text-lg font-medium text-amber-800">
                  {stats.interview}
                </p>
                <p className="text-xs text-amber-500">interviews</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                <p className="text-lg font-medium text-green-800">
                  {stats.offer}
                </p>
                <p className="text-xs text-green-500">offers</p>
              </div>
            </div>

            {/* tabs */}
            <div className="flex gap-2 px-4 pt-4 overflow-x-auto pb-1">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveTab(s)}
                  className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap border transition-colors ${
                    activeTab === s
                      ? "bg-gray-900 text-white border-transparent"
                      : "bg-white text-gray-500 border-gray-200"
                  }`}
                >
                  {STATUS_LABELS[s]} (
                  {localJobs.filter((j) => j.status === s).length})
                </button>
              ))}
            </div>

            {/* job list */}
            <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24 flex flex-col gap-2">
              {activeJobs.length === 0 ? (
                <div className="flex-1 flex items-center justify-center py-16">
                  <p className="text-sm text-gray-300">no jobs here yet</p>
                </div>
              ) : (
                activeJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onEdit={(job) => dispatch(openModal({ mode: "edit", job }))}
                    onDelete={(job) =>
                      dispatch(openModal({ mode: "delete", job }))
                    }
                  />
                ))
              )}
            </div>

            {/* floating add button */}
            <button
              onClick={() => dispatch(openModal({ mode: "add", job: null }))}
              className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 text-white rounded-full text-xl flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors z-40"
            >
              +
            </button>
          </main>
        </>
      )}

      <JobModal />
    </div>
  );
}
