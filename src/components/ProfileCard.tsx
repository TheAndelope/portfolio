import React from 'react';

export const ProfileCard: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 xp-window z-10 profile-card" style={{ width: 'clamp(180px, 15vw, 240px)' }}>
      <div className="xp-title-bar flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img
            src="/images/person.png"
            alt=""
            className="w-4 h-4 object-contain"
            draggable={true}
          />
          <div className="text-white font-bold text-[0.65rem] sm:text-xs leading-none">profile</div>  
        </div>
        <button 
          className="xp-close-button" 
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          ✕
        </button>
      </div>
      <div className="xp-content p-2 sm:p-3 md:p-4">
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 text-center">andy duong</h2>
          
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 flex items-center justify-center flex-shrink-0"
                 style={{
                   boxShadow: 'inset -1px -1px 0px rgba(0,0,0,0.1), inset 1px 1px 0px rgba(255,255,255,0.8)'
                 }}>
              <span className="text-sm margin-1">
                <img src="/images/uw.avif"/>
              </span>
            </div>
            
            <p className="text-[0.65rem] sm:text-xs md:text-sm text-gray-700 font-mono">uwaterloo mathematics</p>
          </div>
        </div>
      </div>
    </div>
  );
};
