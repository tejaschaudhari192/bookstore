
const BookShimmer = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {[...Array(5)].map((_, index) => ( 
        <div key={index} className="w-48 h-72 bg-gray-200 rounded-md overflow-hidden relative mb-4">
          <div className="w-full h-4/6 bg-gray-300 mb-2"></div>
          <div className="h-4 bg-gray-300 mx-2 mb-1 rounded"></div>
          <div className="h-3 bg-gray-300 mx-2 mb-1 rounded"></div>
          <div className="w-1/2 h-3 bg-gray-300 mx-2 rounded"></div>
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default BookShimmer;