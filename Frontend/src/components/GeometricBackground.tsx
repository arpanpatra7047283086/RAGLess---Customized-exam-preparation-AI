export const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main background color */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f3f0] to-[#ede9e4]" />
      
      {/* SVG Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1200 800"
      >
        {/* Horizontal grid lines */}
        <g stroke="#d0cccc" strokeWidth="1">
          <line x1="0" y1="100" x2="1200" y2="100" />
          <line x1="0" y1="200" x2="1200" y2="200" />
          <line x1="0" y1="300" x2="1200" y2="300" />
          <line x1="0" y1="400" x2="1200" y2="400" />
          <line x1="0" y1="500" x2="1200" y2="500" />
          <line x1="0" y1="600" x2="1200" y2="600" />
          <line x1="0" y1="700" x2="1200" y2="700" />
        </g>

        {/* Vertical grid lines */}
        <g stroke="#d0cccc" strokeWidth="1">
          <line x1="100" y1="0" x2="100" y2="800" />
          <line x1="200" y1="0" x2="200" y2="800" />
          <line x1="300" y1="0" x2="300" y2="800" />
          <line x1="400" y1="0" x2="400" y2="800" />
          <line x1="500" y1="0" x2="500" y2="800" />
          <line x1="600" y1="0" x2="600" y2="800" />
          <line x1="700" y1="0" x2="700" y2="800" />
          <line x1="800" y1="0" x2="800" y2="800" />
          <line x1="900" y1="0" x2="900" y2="800" />
          <line x1="1000" y1="0" x2="1000" y2="800" />
          <line x1="1100" y1="0" x2="1100" y2="800" />
        </g>

        {/* Network connection lines - creating a technical feel */}
        <g stroke="#d0cccc" strokeWidth="0.8" opacity="0.6">
          {/* Top left network */}
          <path d="M 150 150 Q 300 100, 400 180" fill="none" />
          <path d="M 400 180 L 550 150" fill="none" />
          
          {/* Center network */}
          <path d="M 400 350 Q 500 320, 600 380" fill="none" />
          <path d="M 600 380 Q 700 350, 800 400" fill="none" />
          <path d="M 800 400 L 900 380" fill="none" />
          
          {/* Right side network */}
          <path d="M 900 250 Q 1000 220, 1050 300" fill="none" />
          <path d="M 1050 300 L 1100 350" fill="none" />
          
          {/* Bottom connections */}
          <path d="M 200 600 Q 400 580, 600 650" fill="none" />
          <path d="M 600 650 Q 800 620, 1000 700" fill="none" />
        </g>

        {/* Network nodes - darker circles at intersection points */}
        <g fill="none" stroke="#8b8683" strokeWidth="1.5" opacity="0.8">
          <circle cx="150" cy="150" r="3" />
          <circle cx="400" cy="180" r="3" />
          <circle cx="550" cy="150" r="3" />
          <circle cx="400" cy="350" r="3" />
          <circle cx="600" cy="380" r="3" />
          <circle cx="800" cy="400" r="3" />
          <circle cx="900" cy="380" r="3" />
          <circle cx="1050" cy="300" r="3" />
          <circle cx="1100" cy="350" r="3" />
          <circle cx="200" cy="600" r="3" />
          <circle cx="600" cy="650" r="3" />
          <circle cx="1000" cy="700" r="3" />
        </g>
      </svg>

      {/* Additional geometric elements - subtle rectangles like in Koyeb design */}
      <div className="absolute top-1/4 left-[10%] w-12 h-12 border border-gray-400 opacity-20 rounded-sm" />
      <div className="absolute top-1/3 right-[15%] w-16 h-16 border border-gray-400 opacity-15 rounded-sm" />
      <div className="absolute bottom-1/3 left-[8%] w-14 h-14 border border-gray-400 opacity-20 rounded-sm" />
      <div className="absolute bottom-1/4 right-[10%] w-20 h-20 border border-gray-400 opacity-15 rounded-sm" />
    </div>
  );
};
