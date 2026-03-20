"use client";
import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useMutation } from "@tanstack/react-query";
import { updateJob } from "@/store/job";
import Column from "./Column";

const STATUSES = ["wishlist", "applied", "interview", "offer", "rejected"];

export default function Board({ jobs, onJobMove }) {
  const [localJobs, setLocalJobs] = useState(jobs);

  // keep localJobs in sync when jobs prop changes (add/edit/delete)
  useEffect(() => {
    setLocalJobs(jobs);
  }, [jobs]);

  const { mutate: moveJob } = useMutation({
    mutationFn: ({ id, data }) => updateJob(id, data),
    onError: () => {
      // on error roll back to server state
      setLocalJobs(jobs);
    },
  });

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (destination.droppableId !== source.droppableId) {
      const newStatus = destination.droppableId;

      // update local state immediately — no flicker
      setLocalJobs((prev) =>
        prev.map((job) =>
          job._id === draggableId
            ? { ...job, status: destination.droppableId }
            : job,
        ),
      );
      // tell parent immediately so stats update
      onJobMove?.(draggableId, newStatus);

      // fire API in background
      moveJob({
        id: draggableId,
        data: { status: destination.droppableId },
      });
    }
  }

  const jobsByStatus = STATUSES.reduce((acc, status) => {
    acc[status] = localJobs.filter((job) => job.status === status);
    return acc;
  }, {});

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 p-6 overflow-x-auto min-h-full">
        {STATUSES.map((status) => (
          <Column key={status} status={status} jobs={jobsByStatus[status]} />
        ))}
      </div>
    </DragDropContext>
  );
}
