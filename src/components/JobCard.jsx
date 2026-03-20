import { FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";

const STATUS_TAGS = {
  wishlist: { label: "Wishlist", style: "bg-purple-50 text-purple-800" },
  applied: { label: "Applied", style: "bg-blue-50 text-blue-800" },
  interview: { label: "Interview", style: "bg-amber-50 text-amber-800" },
  offer: { label: "Offer", style: "bg-green-50 text-green-800" },
  rejected: { label: "Rejected", style: "bg-red-50 text-red-800" },
};

export default function JobCard({ job, onEdit, onDelete }) {
  const tag = STATUS_TAGS[job.status];

  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
      
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{job.company}</p>
          <p className="text-sm font-medium text-gray-900 leading-snug">
            {job.role}
          </p>
        </div>
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5 flex-shrink-0"
          >
            <FiExternalLink size={14} />
          </a>
        )}
      </div>

      {job.location && (
        <p className="text-xs text-gray-400">{job.location}</p>
      )}

      {job.notes && (
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {job.notes}
        </p>
      )}

      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <span className="text-xs text-gray-400">{date}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(job)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <FiEdit2 size={13} />
          </button>
          <button
            onClick={() => onDelete(job)}
            className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>

    </div>
  );
}