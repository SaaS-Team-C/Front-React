import "./style.css";
import React, { ChangeEvent, useState } from "react";
import RoomRegister from "../roomRegistrationform";
import { postAccommodationRequest } from "src/apis/accommodation";
import { PostAccommodationRequestDto } from "src/apis/accommodation/dto/request/post-accommodation.request.dto";
import { accommodationMainFileUploadRequest } from "src/apis";
import Rooms from "src/types/accommodation/rooms.interface";
import UseInformations from "src/types/accommodation/use-informaion.interface";
import { ACCOMMODATION_LIST_PATH, HOST_ACCESS_TOKEN } from "src/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { ResponseDto } from "src/apis/guestmypage";

interface Accommodation {
  name: string;
  description: string;
  location: string;
  images: File[];
  selectedImage?: File;
  type: string;
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

const accommodationTypes = ["호텔", "리조트", "펜션"];
const facilitiesOptions = [
  "금연객실",
  "주차장",
  "와이파이",
  "바베큐 가능",
  "펫 동반 가능",
  "야외 수영장",
  "실내 온수풀",
];

const defaultProfileImageUrl = 'https://blog.kakaocdn.net/dn/4CElL/btrQw18lZMc/Q0oOxqQNdL6kZp0iSKLbV1/img.png';

const HostAccommodationRegisterForm: React.FC = () => {
  const [accommodation, setAccommodation] = useState<Accommodation>({
    name: "",
    description: "",
    location: "",
    images: [],
    selectedImage: undefined,
    type: "",
    facilities: [],
    rooms: [],
  });



  // state: 상태 관리 //
  const [nameError, setNameError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [roomErrors, setRoomErrors] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cookies, setCookies] = useCookies();
  // state: 숙소 정보 입력 상태 //
  const [accommodationName, setAccommodationName] = useState<string>('');
  const [accommodationMainImageFile, setAccommodaitonMainImageFile] = useState<File | null>(null);
  const [accommodationType, setAccommodationType] = useState<string>('')
  const [accommodationIntroduce, setAccommodationIntroduce] = useState<string>('');
  const [accommodationImages, setAccommodaitonImages] = useState<string[]>([]);
  const [accommodationAddress, setAccommodationAddress] = useState<string>('');
  const [roomList, setRoomList] = useState<Rooms[]>([])
  const [roomImages, setRoomImages] = useState<string[]>([]);
  const [useInformations, setUseInfomaitons] = useState<UseInformations[]>([]);
 
  const [categoryArea, setCategoryArea] = useState<string>('');
  const [categoryPet, setCategoryPet] = useState<boolean>(false);
  const [categoryNonSmokingArea, setCategoryNonSmoking] = useState<boolean>(false);
  const [categoryIndoorSpa, setCategoryIndoorSpa] = useState<boolean>(false);
  const [categoryDinnerParty, setCategoryDinnerParty] = useState<boolean>(false);
  const [categoryWifi, setCategoryWifi] = useState<boolean>(false);
  const [categoryCarPark, setCategoryCarPark] = useState<boolean>(false);
  const [categoryPool, setCategoryPool] = useState<boolean>(false);
  
  // event handler: 입력값 변경 이벤트 처리 함수 //
  const onAccommodationChangeEventHandler = (event:ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAccommodationAddress(value);
  }
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    // setAccommodation((prev) => ({ ...prev, [name]: value }));
    setAccommodationName(value);
    
    // setAccommodaitonImages((prevList)=> [...prevList, value])
    // setAccommodationAddress(value);
    // setAccommodationIntroduce(value);
    
    
    // 숙소명과 설명의 글자 수 제한 및 경고 메시지 표시
    if (value === "accommodationName") {
      if (value.length >= 45) {
        setNameError("숙소명은 최대 45자 까지만 입력 가능합니다.");
      } else {
        setNameError("");
      }
      // setAccommodation((prev) => ({ ...prev, [name]: value }));
    } else if (value === "description") {
      if (value.length >= 1500) {
        setDescriptionError("숙소 설명은 최대 1500자 까지만 입력 가능합니다.");
        return;
      } else {
        setDescriptionError("");
      } 
      setAccommodation((prev) => ({ ...prev, [value]: value }));
    } else if (value === "price" || value === "maxGuests") {
      const numericValue = Math.max(
        0,
        Math.min(parseInt(value) || 0, value === "price" ? 50000000 : 10)
      );
      // setAccommodation((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      // setAccommodation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAccommodaitonMainImageFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);

      if (selectedFiles.length < 3) {
        setImageError("최소 3장의 이미지를 선택해야 합니다.");
        return;
      } else {
        setImageError("");
      }

      setAccommodaitonImages((prev) => ({ ...prev, images: selectedFiles }));

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
        setImagePreviews(results);
      });
    }
  };

  const handleSelectImage = (image: File) => {
    setAccommodation((prev) => ({ ...prev, selectedImage: image }));
  };

  const handleTypeChange = (type: string) => {
    setAccommodation((prev) => ({ ...prev, type }));
  };

  const handleFacilityToggle = (facility: string) => {
    setAccommodation((prev) => {
      const facilities = prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility];
      return { ...prev, facilities };
    });
  };

  const handleRoomChange = (index: number, updatedRoom: Room) => {
    const updatedRooms = [...accommodation.rooms];
    updatedRooms[index] = updatedRoom;
    setAccommodation((prev) => ({ ...prev, rooms: updatedRooms }));
  };

  const handleAddRoom = () => {
    const newRoom: Room = {
      roomName: "",
      price: 0,
      checkInTime: "",
      checkOutTime: "",
      details: "",
      maxGuests: 0,
      roomImages: [],
    };
    setAccommodation((prev) => ({
      ...prev,
      rooms: [...prev.rooms, newRoom],
    }));
  };

  const handleDeleteRoom = (index: number) => {
    const updatedRooms = accommodation.rooms.filter((_, i) => i !== index);
    setAccommodation((prev) => ({ ...prev, rooms: updatedRooms }));
  };
  // 룸타입 복사
  const handleCopyRoom = (index: number) => {
    const roomToCopy = accommodation.rooms[index];
    const copiedRoom: Room = {
      ...roomToCopy,
      roomName: `${roomToCopy.roomName} (복사본)`,
    };
    setAccommodation((prev) => ({
      ...prev,
      rooms: [...prev.rooms, copiedRoom],
    }));
  };
  

  // function: 관리자 권한을 확인하는 함수 (예시로 localStorage를 사용)
  const checkAdmin = () => {
    const userRole = localStorage.getItem("userRole"); // 예를 들어 'admin'이라는 값이 저장되어 있다고 가정
    setIsAdmin(userRole === "admin");
  };

  // effect: 관리자인지 권한 확인 //
  React.useEffect(() => {
    checkAdmin(); // 컴포넌트가 렌더링될 때 관리자 권한을 확인
  }, []);

  // function: 네비게이트 함수 처리 //
  const navigator = useNavigate();

  // function: post Accommodation Resposne 처리 함수 //
  const postAccommodationResposne = (responseBody: ResponseDto | null) => {
    const message =
      !responseBody ? '서버에 문제가 있습니다. ':
        responseBody.code === 'AF' ? '잘못된 접근입니다. ':
        responseBody.code === 'VF' ? '모두 입력해주세요. ':
        responseBody.code === 'DAN' ? '중복된 숙소 이름입니다. ':
        responseBody.code === 'NI' ? '존재하지 않는 계정 입니다. ':
        responseBody.code === 'NP' ? '승인받지 않은 계정 입니다. ':
        responseBody.code === 'DBE' ? '서버에 문제가 있습니다. ':'';
      const isSuccessed = responseBody !== null && responseBody.code === 'SU';
      if (!isSuccessed){
        alert(message);
        return;
      }

      navigator('/mypagehost/accommodations');
  }

  // event handler: 등록 버튼 클릭 이벤트 처리 함수 //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 입력 필드 확인
    if (
      !accommodation.name ||
      !accommodation.description ||
      !accommodation.location ||
      !accommodation.selectedImage ||
      accommodation.images.length < 3
    ) {
      alert("모든 필드를 완전히 입력해야 합니다.");
      return;
    }

    const validateRoomFields = (room: Room) => {
      return (
        room.roomName &&
        room.price > 0 &&
        room.checkInTime &&
        room.checkOutTime &&
        room.details &&
        room.maxGuests > 0 &&
        room.roomImages.length >= 3 &&
        room.selectedRoomImage
      );
    };

    // 각 Room 객체의 필수 필드 확인
    const roomsValid = accommodation.rooms.every(validateRoomFields);
    if (!roomsValid) {
      setRoomErrors("모든 객실 필드를 완전히 입력해 주세요.");
      return;
    }

    const confirmSubmit = window.confirm("숙소 등록을 신청하시겠습니까?");
    if (confirmSubmit) {
      const formData = new FormData();
      formData.append("name", accommodation.name);
      formData.append("description", accommodation.description);
      formData.append("location", accommodation.location);
      accommodation.images.forEach((image) => {
        formData.append("images", image);
      });

      if (accommodation.selectedImage) {
        formData.append("selectedImage", accommodation.selectedImage);
      }

      formData.append("type", accommodation.type || "");
      accommodation.facilities.forEach((facility) => {
        formData.append("facilities", facility);
      });

      accommodation.rooms.forEach((room) => {
        formData.append("rooms[]", JSON.stringify(room));
        room.roomImages.forEach((roomImage) => {
          formData.append("roomImages[]", roomImage);
        });
        if (room.selectedRoomImage) {
          formData.append("selectedRoomImage", room.selectedRoomImage);
        }
      });

      

      // dto, api 만들면 다시 활성화 할 예정
      // 서버에 요청을 보내는 부분
      //   fetch("/your-api-endpoint", {
      //     method: "POST",
      //     body: formData,
      //   })
      //     .then((response) => {
      //       if (response.ok) {
      //         alert("숙소 등록 신청에 성공하였습니다.");
      //         window.location.href = "http://localhost:3000/mypagehost/accommodations";
      //       } else {
      //         alert("등록에 실패하였습니다. 다시 시도해주세요.");
      //       }
      //     })
      //     .catch((error) => {
      //       console.error("Error during submission:", error);
      //       alert("오류가 발생했습니다. 다시 시도해주세요.");
      //     });
      // }
      let url: string | null = null;
        if (accommodationMainImageFile) {
            const formData = new FormData();
            formData.append('file', accommodationMainImageFile);
            url = await accommodationMainFileUploadRequest(formData);
        };

        url = url ? url:defaultProfileImageUrl;

      const requestBody: PostAccommodationRequestDto = {

        accommodationName: accommodation.name,
        accommodationMainImage: url,
        accommodationType: accommodation.type,
        accommodationIntroduce,
        accommodationImages: accommodationImages,
        accommodationAddress,
        categoryArea,
        categoryNonSmokingArea,
        categoryIndoorSpa,
        categoryDinnerParty,
        categoryPet,
        categoryWifi,
        categoryCarPark,
        categoryPool,
        useInformations: useInformations,
        rooms:roomList,
        roomImages: roomImages
      }
      const hostAccessToken = cookies[HOST_ACCESS_TOKEN]
      if (!hostAccessToken) return navigator('/main');

      postAccommodationRequest(requestBody, hostAccessToken).then(postAccommodationResposne);

      
    }
  };

  return (
    <div id="registration-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>숙소 등록</h2>

        {/* 숙소명 입력 필드 */}
        <div>
          <label>
            숙소명:
            <input
              type="text"
              name="name"
              value={accommodationName}
              onChange={handleChange}
              required
              maxLength={45} // HTML 레벨에서도 제한
            />
          </label>
          {nameError && <p style={{ color: "red" }}>{nameError}</p>}
        </div>

        {/* 설명 입력 필드 */}
        <div>
          <label>
            설명:
            <textarea
              name="description"
              value={accommodationIntroduce}
              onChange={handleChange}
              required
              maxLength={1500} // HTML 레벨에서도 제한
            />
          </label>
          {descriptionError && (
            <p style={{ color: "red" }}>{descriptionError}</p>
          )}
        </div>

        {/* 위치 입력 필드 */}
        <div>
          <label>
            위치:
            <input
              type="text"
              name="location"
              value={accommodationAddress}
              onChange={onAccommodationChangeEventHandler}
              required
            />
            <button className="address-search-button" type="button">
              위치 검색
            </button>
          </label>
        </div>

        {/* 숙소 대표 이미지 업로드 */}
        <div>
          <label>
            숙소 대표 이미지:
            <input
              type="file"
              onChange={handleMainImageChange}
              accept="image/*"
            />
          </label>
          {accommodation.selectedImage && (
            <img
              src={URL.createObjectURL(accommodation.selectedImage)}
              alt="숙소 대표 이미지"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>

        {/* 숙소 이미지 업로드 */}
        <div>
          <label>
            숙소 이미지 업로드:
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
          </label>
          {imageError && <p style={{ color: "red" }}>{imageError}</p>}
          <div className="image-wrapper">
            {imagePreviews.map((preview, index) => (
              <div key={index}>
                <img
                  src={preview}
                  alt={`Accommodation Preview ${index}`}
                  style={{ width: "100px", height: "100px" }}
                />
                <button
                  type="button"
                  onClick={() => handleSelectImage(accommodation.images[index])}
                >
                  대표 이미지로 변경
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const updatedImages = accommodation.images.filter(
                      (_, i) => i !== index
                    );
                    setAccommodation((prev) => ({
                      ...prev,
                      images: updatedImages,
                    }));
                    setImagePreviews((prevPreviews) =>
                      prevPreviews.filter((_, i) => i !== index)
                    );
                  }}
                  className="delete-image-button"
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 숙소 종류 선택 */}
        <div>
          <label>숙소 종류:</label>
          {accommodationTypes.map((type) => (
            <div key={type}>
              <label>
                <input
                  type="radio"
                  name="type"
                  checked={accommodation.type === type}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            </div>
          ))}
        </div>

        {/* 시설 선택 */}
        <div>
          <label>시설:</label>
          {facilitiesOptions.map((facility) => (
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

        {/* 객실 등록 */}
        <div>
          <h2>객실 등록</h2>
          <button type="button" onClick={handleAddRoom}>
            객실 추가
          </button>
          {accommodation.rooms.map((room, index) => (
            <RoomRegister
              key={index}
              room={room}
              onChange={(updatedRoom) => handleRoomChange(index, updatedRoom)}
              onDelete={() => handleDeleteRoom(index)}
              onCopy={() => handleCopyRoom(index)} // 복사 기능 추가
            />
          ))}
          {roomErrors && <p style={{ color: "red" }}>{roomErrors}</p>}
        </div>

        <button type="submit" onClick={handleSubmit}>
          등록하기
        </button>
      </form>

      {/* 관리자만 볼 수 있는 승인/거절 버튼 */}
      {isAdmin && (
        <div>
          <button className="approval-button" type="button">
            승인
          </button>
          <button className="rejection-button" type="button">
            거절
          </button>
        </div>
      )}
    </div>
  );
};

export default HostAccommodationRegisterForm;
