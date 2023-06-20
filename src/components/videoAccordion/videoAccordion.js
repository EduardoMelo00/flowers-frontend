import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './videoAccordion.css';

const Accordion = ({ title, videos }) => {
  const [isOpen, setIsOpen] = useState(false);


  
  return (
    <div className={`accordion ${isOpen && "open"}`}>
      <div className="accordion-title" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </div>
      <div className="accordion-content">
        
        {videos.map(video => (
          <div key={video.id}>
            
            <Link to={`/video/${video.id}`}>{video.name}</Link>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;

