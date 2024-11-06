import "./style.css";
import React, { useState } from "react";

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

const RoomRegister: React.FC<{
  room: Room;
  onChange: (updatedRoom: Room) => void;
  onDelete: () => void;
  onCopy: () => void;
}> = ({ room, onChange, onDelete, onCopy }) => {

  // 상태 관리
  const [roomNameError, setRoomNameError] = useState<string>("");
  const [roomDetailError, setDescriptionError] = useState<string>("");
  const [roomImageError, setRoomImageError] = useState<string>("");
  const [roomImagePreviews, setRoomImagePreviews] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;

    // 객실명과 객실 상세 정보의 글자 수 제한 및 경고 메시지 표시
    if (name === "roomName") {
      if (value.length > 45) {
        setRoomNameError("객실명은 최대 45자만 입력 가능합니다.");
      } else {
        setRoomNameError("");
        onChange({ ...room, [name]: value });
      }
    } else if (name === "details") {
      if (value.length > 1500) {
        setDescriptionError("객실 상세 정보는 최대 1500자 까지만 입력 가능합니다.");
      } else {
        setDescriptionError("");
        onChange({ ...room, [name]: value });
      }
    } else if (name === "price" || name === "maxGuests") {
      const numericValue = Math.max(
        0,
        Math.min(parseInt(value) || 0, name === "price" ? 50000000 : 10)
      );
      onChange({ ...room, [name]: numericValue });
    } else {
      onChange({ ...room, [name]: value });
    }
  };

  const handleRoomMainImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...room, selectedRoomImage: file });
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);

      if (selectedFiles.length < 3) {
        setRoomImageError("최소 3장의 객실 사진을 선택해야 합니다.");
        return;
      } else {
        setRoomImageError("");
      }

      onChange({ ...room, roomImages: selectedFiles });

      const previews = selectedFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      Promise.all(previews).then((results) => {
        setRoomImagePreviews(results);
      });
    }
  };

  const handleSelectRoomImage = (image: File) => {
    onChange({ ...room, selectedRoomImage: image });
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = room.roomImages.filter((_, i) => i !== index);
    onChange({ ...room, roomImages: updatedImages });
    setRoomImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div>
        <label>
          객실명:
          <input
            type="text"
            name="roomName"
            value={room.roomName}
            onChange={handleChange}
            required
          />
        </label>
        {roomNameError && <p style={{ color: "red" }}>{roomNameError}</p>}
      </div>
      <div>
        <label>
          가격:
          <input
            type="number"
            name="price"
            value={room.price}
            onChange={handleChange}
            required
            min="0"
            max="50000000"
          />
        </label>
      </div>
      <div>
        <label>
          입실 시간:
          <input
            type="time"
            name="checkInTime"
            value={room.checkInTime}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          퇴실 시간:
          <input
            type="time"
            name="checkOutTime"
            value={room.checkOutTime}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          객실 상세 정보:
          <textarea
            name="details"
            value={room.details}
            onChange={handleChange}
            required
          />
        </label>
        {roomDetailError && (
          <p style={{ color: "red" }}>{roomDetailError}</p>
        )}
      </div>
      <div>
        <label>
          최대 숙박 가능 인원:
          <input
            type="number"
            name="maxGuests"
            value={room.maxGuests}
            onChange={handleChange}
            required
            min="0"
            max="10"
          />
        </label>
      </div>
      <div>
        <label>
          객실 대표 이미지:
          <input type="file" onChange={handleRoomMainImageChange} />
        </label>
        {room.selectedRoomImage && (
          <img
            src={URL.createObjectURL(room.selectedRoomImage)}
            alt="객실 대표 이미지"
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </div>
      <div>
        <label>
          객실 사진 업로드:
          <input type="file" onChange={handleFileChange} multiple />
        </label>
        {roomImageError && (
          <p style={{ color: "red" }}>{roomImageError}</p>
        )}
        <div className="image-wrapper">
          {roomImagePreviews.map((preview, index) => (
            <div key={index}>
              <img
                src={preview}
                alt={`Room Preview ${index}`}
                style={{ width: "100px", height: "100px" }}
              />
              <button
                type="button"
                onClick={() => handleSelectRoomImage(room.roomImages[index])}
              >
                대표 이미지로 선택
              </button>
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={onDelete}>
        삭제
      </button>
      <button type="button" onClick={onCopy}>
        복사하여 추가
      </button>
    </div>
  );
};

export default RoomRegister;
