export default function MobileSkeleton() {
    return (
        <>
         <div className="grid grid-cols-3 gap-2 px-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 animate-pulse rounded-xl p-3 h-16"
                />
              ))}
            </div>
            <div className="flex gap-2 px-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 animate-pulse rounded-full h-7 w-20"
                />
              ))}
            </div>
            <div className="px-4 pt-3 flex flex-col gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 animate-pulse rounded-xl h-20"
                />
              ))}
            </div>
        </>
    )
}