export default function Loading() {
  return (
    <div className="w-full py-8 space-y-8 animate-pulse">
      {/* Title pulse */}
      <div className="h-10 w-64 bg-white/10 rounded-xl"></div>
      
      {/* Grid of skeleton cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl overflow-hidden border border-white/5 p-4 space-y-4"
          >
            {/* Card Image skeleton */}
            <div className="aspect-square w-full bg-white/5 rounded-xl"></div>
            
            {/* Title & subtitle skeleton */}
            <div className="space-y-2">
              <div className="h-6 w-3/4 bg-white/10 rounded-lg"></div>
              <div className="h-4 w-1/2 bg-white/5 rounded-md"></div>
            </div>
            
            {/* Badge skeleton */}
            <div className="h-8 w-24 bg-white/5 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
