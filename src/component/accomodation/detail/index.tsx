import React from 'react';
import { useParams } from 'react-router-dom';

const Detail: React.FC = () => {
  const { name } = useParams<{ name: string }>(); 

  return (
    <div>
      index
    </div>
  );
};

export default Detail;

