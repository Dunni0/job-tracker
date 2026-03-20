function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-3 flex flex-col gap-2 animate-pulse">
      <div className="h-2.5 bg-gray-100 rounded w-1/3" />
      <div className="h-3 bg-gray-200 rounded w-3/4" />
      <div className="h-2.5 bg-gray-100 rounded w-1/2" />
      <div className="flex items-center justify-between pt-1 border-t border-gray-50 mt-1">
        <div className="h-2 bg-gray-100 rounded w-10" />
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-gray-100 rounded-md" />
          <div className="w-6 h-6 bg-gray-100 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function ColumnSkeleton({ cards = 2 }) {
  return (
    <div className="flex flex-col gap-2 min-w-[220px] p-2 border border-gray-200 rounded-xl bg-white flex-shrink-0">
      <div className="flex items-center justify-between px-1 mb-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-200" />
          <div className="h-2.5 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-4 w-5 bg-gray-100 rounded-full" />
      </div>
      <div className="flex flex-col gap-2 min-h-[200px] p-2 rounded-xl bg-gray-50">
        {Array.from({ length: cards }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function BoardSkeleton() {
  return (
    <div className="flex gap-4 p-6 overflow-x-auto min-h-full">
      <ColumnSkeleton cards={2} />
      <ColumnSkeleton cards={3} />
      <ColumnSkeleton cards={1} />
      <ColumnSkeleton cards={2} />
      <ColumnSkeleton cards={1} />
    </div>
  );
}