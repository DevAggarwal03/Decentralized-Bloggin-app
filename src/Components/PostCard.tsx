import { useEffect, useState } from 'react';

const PostCard = ({ length = 0, index = 0, accAddresses = [], titles = [], descriptions = [], postedDates = [] }: any) => {
  const [date, setDate] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentIndex = length - index - 1;
  const DESCRIPTION_LENGTH = 150; // Characters to show initially
  
  const toDate = () => {
    if (postedDates[currentIndex]) {
      const date = new Date(postedDates[currentIndex] * 1000);
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(date.getTime() + istOffset);
      setDate(istDate.toISOString().replace('T', ' ').slice(0, 19));
    }
  }

  useEffect(() => {
    toDate();
  }, [currentIndex, postedDates]);

  if (currentIndex < 0 || currentIndex >= length) {
    return null;
  }

  const description = descriptions[currentIndex] || 'No description available';
  const shouldTruncate = description.length > DESCRIPTION_LENGTH;
  
  const displayedDescription = isExpanded 
    ? description 
    : shouldTruncate 
      ? `${description.slice(0, DESCRIPTION_LENGTH)}...` 
      : description;

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-800 max-w-[1000px] rounded-lg shadow-lg overflow-hidden hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 border border-gray-700">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-900/50 rounded-full px-4 py-1 text-sm text-blue-400 font-mono truncate max-w-xs hover:bg-gray-900 transition-colors duration-200">
            {accAddresses[currentIndex] || 'Address not available'}
          </div>
          <span className="ml-auto text-sm text-gray-400">
            {date || 'Date not available'}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-100 mb-3 hover:text-blue-400 transition-colors duration-200">
          {titles[currentIndex] || 'No title'}
        </h2>
        
        <p className="text-gray-300 leading-relaxed mb-4">
          {displayedDescription}
        </p>
        
        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            {shouldTruncate && (
              <button 
                onClick={handleReadMore}
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 flex items-center group"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;