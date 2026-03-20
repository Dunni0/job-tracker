"use client";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/modal/modalSlice";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";

const COLUMN_STYLES = {
  wishlist: {
    label: "Wishlist",
    accent: "bg-purple-400",
    count: "bg-purple-50 text-purple-700",
  },
  applied: {
    label: "Applied",
    accent: "bg-blue-400",
    count: "bg-blue-50 text-blue-700",
  },
  interview: {
    label: "Interview",
    accent: "bg-amber-400",
    count: "bg-amber-50 text-amber-700",
  },
  offer: {
    label: "Offer",
    accent: "bg-green-400",
    count: "bg-green-50 text-green-700",
  },
  rejected: {
    label: "Rejected",
    accent: "bg-red-400",
    count: "bg-red-50 text-red-700",
  },
};

export default function Column({ status, jobs }) {
  const dispatch = useDispatch();
  const style = COLUMN_STYLES[status];

  return (
    <div className="flex flex-col gap-2 min-w-[220px] p-2 border border-gray-200 rounded-xl bg-white flex-shrink-0">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${style.accent}`} />
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            {style.label}
          </span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${style.count}`}>
          {jobs.length}
        </span>
      </div>

      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col gap-2 min-h-[200px] p-2 rounded-xl transition-colors ${
              snapshot.isDraggingOver
                ? "bg-gray-100"
                : "bg-gray-50"
            }`}
          >
            {jobs.map((job, index) => (
              <Draggable key={job._id} draggableId={job._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-shadow ${
                      snapshot.isDragging ? "shadow-lg rotate-1" : ""
                    }`}
                  >
                    <JobCard
                      job={job}
                      onEdit={(job) =>
                        dispatch(openModal({ mode: "edit", job }))
                      }
                      onDelete={(job) =>
                        dispatch(openModal({ mode: "delete", job }))
                      }
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            {jobs.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs text-gray-300"> you can drag and drop jobs here </p>
              </div>
            )}
          </div>
        )}
      </Droppable>

      <button
        onClick={() =>
          dispatch(openModal({ mode: "add", job: null }))
        }
        className="text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors py-1.5 rounded-lg text-center"
      >
        + add
      </button>
    </div>
  );
}