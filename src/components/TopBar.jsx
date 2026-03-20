"use client";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modal/modalSlice";
import { useSession } from "next-auth/react";

export default function TopBar({ stats, status }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const firstName = session?.user?.name || "there";

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-xs font-medium text-purple-800 flex-shrink-0">
            {session?.user?.name?.charAt(0).toUpperCase() || "?"}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 leading-none mb-0.5">
              job tracker
            </p>
            <p className="text-xs text-gray-400">
              hey, {firstName} 👋🏾
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 ml-4">
          <div className="bg-gray-50 rounded-lg px-3 py-1.5">
            <span className="text-xs text-gray-400">total </span>
            <span className="text-xs font-medium text-gray-900">
              {stats.total}
            </span>
          </div>
          <div className="bg-amber-50 rounded-lg px-3 py-1.5">
            <span className="text-xs text-amber-600">interviews </span>
            <span className="text-xs font-medium text-amber-800">
              {stats.interview}
            </span>
          </div>
          <div className="bg-green-50 rounded-lg px-3 py-1.5">
            <span className="text-xs text-green-600">offers </span>
            <span className="text-xs font-medium text-green-800">
              {stats.offer}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(openModal({ mode: "add", job: null }))}
          disabled={status}
          className="bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
        >
          + add job
        </button>
        <button
          onClick={() => dispatch(openModal({ mode: "signout", job: null }))}
          className="text-xs text-gray-400 border border-gray-200 px-3 py-2 rounded-lg hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
        >
          sign out
        </button>
      </div>

    </div>
  );
}