import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

interface ListProps {
  accommodations: {
    id: number;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    facilities: string[];
    imageUrl: string;
    location: string;
    type: string;
  }[];
}

const List: React.FC<ListProps> = ({ accommodations }) => {
  const navigate = useNavigate();

  const handleDetailClick = (name: string) => {
    navigate(`/accommodationList/detail/${encodeURIComponent(name)}`);
  };

  return (
    <div className="accommodation-cards">
      {accommodations.map((accommodation) => (
        <div key={accommodation.id} className="accommodation-card">
          <div className="image-wrapper">
            <img src={accommodation.imageUrl} alt={accommodation.name} className="accommodation-image" />
          </div>
          <div className="accommodation-info">
            <h3>{accommodation.name}</h3>
            <p>{accommodation.location}</p>
            <p>₩{accommodation.price.toLocaleString()} /박</p>
            <p>Rating: {accommodation.rating}</p>
            <p>리뷰: {accommodation.reviewCount}개</p>
            <p>Facilities: {accommodation.facilities.join(', ')}</p>
            <button className="details-btn" onClick={() => handleDetailClick(accommodation.name)}>
              상세보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
