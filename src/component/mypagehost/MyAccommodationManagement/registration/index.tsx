import './style.css';
import React, { useState } from 'react';

interface Accommodation {
  name: string;
  description: string;
  price: number;
  location: string;
  images: File[];
  selectedImage?: File;
  type?: string;
  facilities: string[];
  rooms: Room[];
}

interface Room {
  roomName: string;
  price: number;
  checkInTime: string;
  checkOutTime: string;
  details: string;
  maxGuests: number;
  roomImages: File[];
  selectedRoomImage?: File;
}

const accommodationTypes = ['호텔', '리조트', '펜션'];
const facilitiesOptions = [
  '금연객실', 
  '주차장', 
  '와이파이', 
  '바베큐 가능', 
  '펫 동반 가능', 
  '야외 수영장', 
  '실내 온수풀'
];

const RoomRegister: React.FC<{ room: Room; onChange: (updatedRoom: Room) => void; onDelete: () => void; onCopy: () => void }> = ({ room, onChange, onDelete, onCopy }) => {
  const [roomImageError, setRoomImageError] = useState<string>('');
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...room, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);

      if (selectedFiles.length < 3) {
        setRoomImageError('최소 3장의 객실 사진을 선택해야 합니다.');
        return;
      } else {
        setRoomImageError('');
      }

      onChange({ ...room, roomImages: selectedFiles });

      const previews = selectedFiles.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>(resolve => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then(results => {
        setRoomImagePreviews(results);
      });
    }
  };

  const handleSelectRoomImage = (image: File) => {
    onChange({ ...room, selectedRoomImage: image });
  };

  return (
    <>
      <div>
        <h3>객실 등록</h3>
        <div>
          <label>
            객실명:
            <input type="text" name="roomName" value={room.roomName} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            가격:
            <input type="number" name="price" value={room.price} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            입실 시간:
            <input type="time" name="checkInTime" value={room.checkInTime} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            퇴실 시간:
            <input type="time" name="checkOutTime" value={room.checkOutTime} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            객실 상세 정보:
            <textarea name="details" value={room.details} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            최대 숙박 가능 인원:
            <input type="number" name="maxGuests" value={room.maxGuests} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            객실 사진 업로드:
            <input type="file" onChange={handleFileChange} multiple />
          </label>
          {roomImageError && <p style={{ color: 'red' }}>{roomImageError}</p>}
          <div>
            {roomImagePreviews.map((preview, index) => (
              <div key={index}>
                <img src={preview} alt={`Room Preview ${index}`} style={{ width: '100px', height: '100px' }} />
                <button type="button" onClick={() => handleSelectRoomImage(room.roomImages[index])}>
                  대표 이미지로 선택
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={onDelete}>삭제</button> {/* 삭제 버튼 추가 */}
        <button type="button" onClick={onCopy}>복사하여 추가</button> {/* 복사 버튼 추가 */}
      </div>
    </>
  );
};

const HostAccommodationRegister: React.FC = () => {
  const [accommodation, setAccommodation] = useState<Accommodation>({
    name: '',
    description: '',
    price: 0,
    location: '',
    images: [],
    facilities: [],
    rooms: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAccommodation(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);

      if (selectedFiles.length < 3) {
        setImageError('최소 3장의 이미지를 선택해야 합니다.');
        return;
      } else {
        setImageError('');
      }

      setAccommodation(prev => ({ ...prev, images: selectedFiles }));

      const previews = selectedFiles.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>(resolve => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then(results => {
        setImagePreviews(results);
      });
    }
  };

  const handleSelectImage = (image: File) => {
    setAccommodation(prev => ({ ...prev, selectedImage: image }));
  };

  const handleTypeChange = (type: string) => {
    setAccommodation(prev => ({ ...prev, type }));
  };

  const handleFacilityToggle = (facility: string) => {
    setAccommodation(prev => {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities };
    });
  };

  const handleRoomChange = (index: number, updatedRoom: Room) => {
    const updatedRooms = [...accommodation.rooms];
    updatedRooms[index] = updatedRoom;
    setAccommodation(prev => ({ ...prev, rooms: updatedRooms }));
  };

  const handleAddRoom = () => {
    const newRoom: Room = {
      roomName: '',
      price: 0,
      checkInTime: '',
      checkOutTime: '',
      details: '',
      maxGuests: 0,
      roomImages: [],
    };
    setAccommodation(prev => ({ ...prev, rooms: [...prev.rooms, newRoom] }));
  };

  const handleDeleteRoom = (index: number) => {
    const updatedRooms = accommodation.rooms.filter((_, i) => i !== index);
    setAccommodation(prev => ({ ...prev, rooms: updatedRooms }));
  };

  const handleCopyRoom = (index: number) => {
    const roomToCopy = accommodation.rooms[index];
    const copiedRoom: Room = {
      ...roomToCopy,
      roomName: `${roomToCopy.roomName} (복사본)` // 복사본 이름 변경
    };
    setAccommodation(prev => ({ ...prev, rooms: [...prev.rooms, copiedRoom] }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', accommodation.name);
    formData.append('description', accommodation.description);
    formData.append('price', accommodation.price.toString());
    formData.append('location', accommodation.location);
    accommodation.images.forEach(image => {
      formData.append('images', image);
    });
  
    if (accommodation.selectedImage) {
      formData.append('selectedImage', accommodation.selectedImage);
    }
  
    formData.append('type', accommodation.type || '');
    accommodation.facilities.forEach(facility => {
      formData.append('facilities', facility);
    });
  
    accommodation.rooms.forEach(room => {
      formData.append('rooms[]', JSON.stringify(room));
      room.roomImages.forEach(roomImage => {
        formData.append('roomImages[]', roomImage);
      });
      if (room.selectedRoomImage) {
        formData.append('selectedRoomImage', room.selectedRoomImage);
      }
    });
  
    const response = await fetch('YOUR_API_URL', {
      method: 'POST',
      body: formData,
    });
  
    if (response.ok) {
      // 성공 처리 후 페이지 이동
      alert('숙소 등록 성공!');
      window.location.href = 'http://localhost:3000/mypagehost'; // 이동할 주소
    } else {
      // 실패 처리
      alert('숙소 등록 실패!');
    }
  };
  


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>숙소 등록</h2>
        <div>
          <label>
            숙소명:
            <input type="text" name="name" value={accommodation.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            설명:
            <textarea name="description" value={accommodation.description} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            가격:
            <input type="number" name="price" value={accommodation.price} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            위치:
            <input type="text" name="location" value={accommodation.location} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            숙소 이미지 업로드:
            <input type="file" onChange={handleFileChange} multiple />
          </label>
          {imageError && <p style={{ color: 'red' }}>{imageError}</p>}
          <div>
            {imagePreviews.map((preview, index) => (
              <div key={index}>
                <img src={preview} alt={`Accommodation Preview ${index}`} style={{ width: '100px', height: '100px' }} />
                <button type="button" onClick={() => handleSelectImage(accommodation.images[index])}>
                  대표 이미지로 선택
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>숙소 종류:</label>
          {accommodationTypes.map(type => (
            <div key={type}>
              <label>
                <input type="radio" name="type" checked={accommodation.type === type} onChange={() => handleTypeChange(type)} />
                {type}
              </label>
            </div>
          ))}
        </div>
        <div>
          <label>시설:</label>
          {facilitiesOptions.map(facility => (
            <div key={facility}>
              <label>
                <input
                  type="checkbox"
                  checked={accommodation.facilities.includes(facility)}
                  onChange={() => handleFacilityToggle(facility)}
                />
                {facility}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3>객실 등록</h3>
          <button type="button" onClick={handleAddRoom}>객실 추가</button>
          {accommodation.rooms.map((room, index) => (
            <RoomRegister
              key={index}
              room={room}
              onChange={updatedRoom => handleRoomChange(index, updatedRoom)}
              onDelete={() => handleDeleteRoom(index)}
              onCopy={() => handleCopyRoom(index)} // 복사 기능 추가
            />
          ))}
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};

export default HostAccommodationRegister;
