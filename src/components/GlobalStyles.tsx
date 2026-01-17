import React from 'react';

export const GlobalStyles: React.FC = () => {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(3deg); }
        50% { transform: translateY(-20px) rotate(3deg); }
      }
      @keyframes float2 {
        0%, 100% { transform: translateY(0px) rotate(6deg); }
        50% { transform: translateY(-25px) rotate(6deg); }
      }
      @keyframes float3 {
        0%, 100% { transform: translateY(0px) rotate(-2deg); }
        50% { transform: translateY(-15px) rotate(-2deg); }
      }
      .grid-bg {
        background-image: 
          linear-gradient(#e3e0c8 2px, transparent 1px),
          linear-gradient(90deg, #e3e0c8 2px, transparent 1px);
        background-size: 30px 30px;
      }
      .xp-window {
        background: linear-gradient(180deg, #0054E3 0%, #0054E3 30px, #ECE9D8 30px);
        border: 3px solid;
        border-color: #0831D9 #0831D9 #001EA9 #001EA9;
        box-shadow: 
          inset 1px 1px 0px rgba(255, 255, 255, 0.3),
          2px 2px 8px rgba(0, 0, 0, 0.3);
      }
      .xp-window.dragging {
        transition: none !important;
        animation: none !important;
      }
      .xp-title-bar {
        background: linear-gradient(180deg, #0997FF 0%, #0053EE 50%, #0050EE 51%, #003DD7 100%);
        border-bottom: 1px solid #0831D9;
        padding: 4px 6px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .xp-close-button {
        width: 21px;
        height: 21px;
        background: linear-gradient(180deg, #FF6347 0%, #DC143C 100%);
        border: 1px solid #8B0000;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-weight: bold;
        color: white;
        font-size: 14px;
        line-height: 1;
        box-shadow: inset 1px 1px 0px rgba(255, 255, 255, 0.4);
      }
      .xp-close-button:hover {
        background: linear-gradient(180deg, #FF7F66 0%, #E6554A 100%);
      }
      .xp-close-button:active {
        box-shadow: inset 0px 0px 2px rgba(0, 0, 0, 0.5);
      }
      .xp-content {
        background: #ECE9D8;
        border-top: 1px solid #FFFFFF;
      }
    `}</style>
  );
};
