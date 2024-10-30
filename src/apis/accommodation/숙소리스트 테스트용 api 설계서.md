<h1 style='background-color: rgba(55, 55, 55, 0.4); text-align: center'>front-end 가상 API 설계(명세)서</h1>

백엔드가 준비 안된 상황에서 front-end에서 구현한 API가 잘 작동하는지 테스트 하기 위함 

- Domain : <http://localhost:3000>  

***
  
<h2 style='background-color: rgba(55, 55, 55, 0.2); text-align: center'>Accommodation 모듈</h2>
  
숙소 조회(메인-> 숙소리스트), 숙소 디테일 조회(숙소 리스트 -> 숙소 디테일 리스트)API가 포함되어 있습니다.  
Accommodation 모듈은 인증 없이 요청할 수 있다.  
  
- url : /api/v1/accommodations

***

#### - 숙소 조회 (메인 -> 숙소 리스트) 
  
##### 설명

1. 클라이언트는 홈 화면에서 '검색창(지역, 숙박 일자, 인원)'을 통해 숙소 조회 리스트로 들어올 수 있다. 
    -URL에 지역, 숙박일자, 인원 정보를 포함하여 요청한다.
    -응답 받는 내용에는 아래가 있다.

    호텔 타입
    호텔 등급 (테이블에 없음)

    호텔 이름
    카테고리 7개
    호텔 주소
    입실 가능 일자
    퇴실 일자
    호텔 대표 사진

    호텔 가격 => 최소값만 가져오도록 가고 필요
    호텔 등급 평균
    리뷰 리스트 => 개수로 변환 필요




2. 클라이언트는 홈 화면에서 '국내 인기 여행지' 옵션을 눌러 숙소 조회 리스트로 들어올 수 있다.
    URL에 지역, 숙박일자, 인원 정보를 포함하여 요청한다.
        -URL에 지역, 숙박일자, 인원 정보를 포함하여 요청한다.

3. 클라이언트는 홈 화면에서 '여행 추천 숙소' 옵션을 눌러 숙소 조회 리스트로 들어올 수 있다.
    -URL에 지역, 숙박일자, 인원 정보를 포함하여 요청한다.


- method : **GET**  
- end point : **/accommodationList**  

##### Request

###### Request Body

none

###### Example

```bash
curl -v -X GET "http://localhost:4000/api/v1/accommodations" \
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| accommodations[] | String | 숙소 리스트 | O |


###### accommodations
| name | type | description | required |
|---|:---:|:---:|:---:|
| accommodationType | String | 숙소 타입(호텔, 펜션, 리조트) | O |
| accommodationGradeSum | number | 숙소 평점 합 | O |
| accommodation_name | String | 숙소 이름 | O |
| category_pet | boolean | 카테고리 펫 동반 | O |
| category_non_smoking_area | boolean | 카테고리 흡연 객실 | O |
| category_indoor_spa | boolean | 카테고리 실내 스파 | O |
| category_dinner_party | boolean | 카테고리 바베큐 파티 | O |
| category_wifi | boolean | 카테고리 와이파이 | O |
| category_car_park | boolean | 카테고리 주차장 | O |
| category_pool | String | 카테고리 수영장 | O |
| accommodation_address | String | 호텔 주소 | O |
| room_in_day | DATE | 입실 가능 날짜 | O |
| room_out_day | DATE | 퇴실 날짜 | O |
| accommodation_main_image | string | 숙소 대표 이미지 | O |
| room_price | number | 숙소의 객실 최소 가격(객실 가격을 가져와서 최소 값만 추려서 사용) | O |
| review_content | number | 리뷰 개수(리뷰 작성 내용을 가져와서 개수로 변환) | O |


###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
}
```

**응답 실패 (데이터 유효성 검사 실패)**
```bash
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
  "code": "VF",
  "message": "Validation failed."
}
```

**응답 실패 (로그인 정보 불일치)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "SF",
  "message": "Sign in failed."
}
```

**응답 실패 (토큰 생성 실패)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "TCF",
  "message": "Token creation failed."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***

#### - 숙소 상세 리스트 보기
  
##### 설명

클라이언트가 검색된 숙소리스트에서 특정 숙소를 선택하게 되면 보여질 화면.
원하는 숙소를 클릭하여 들어온 화면에 필요한 응답 받을 데이터는 아래와 같다. 
호텔 사진,
호텔 이름 
카테고리 7개
호텔 주소

<객실 리스트>
-객실 사진
-객실 타입
-입실 시간
-퇴실 시간
-최대 수용 인원
-객실 가격

-숙소 소개
-숙소 이용 정보

<리뷰>
-게스트 명
-작성일자
-작성 내용

- method : **GET**  
- URL : **/api/v1/accommodations/detail**  

##### Request

###### Header

| name | description | required |
|---|:---:|:---:|
| Authorization | Bearer 토큰 인증 헤더 | O |

###### Example

```bash
curl -X GET "http://localhost:3000/api/v1/accommodations/detail" 
```

##### Response

###### Header

| name | description | required |
|---|:---:|:---:|
| Content-Type | 반환되는 Response Body의 Content type (application/json) | O |

###### Response Body

| name | type | description | required |
|---|:---:|:---:|:---:|
| code | String | 결과 코드 | O |
| message | String | 결과 코드에 대한 설명 | O |
| detail | Detail[] | 숙소 상세 리스트 | O |
  
**Detail**  
| name | type | description | required |
|---|:---:|:---:|:---:|






| room_price | number | 숙소의 객실 최소 가격(객실 가격을 가져와서 최소 값만 추려서 사용) | O |
| review_content | number | 리뷰 개수(리뷰 작성 내용을 가져와서 개수로 변환) | O |




**Detail**  
| name | type | description | required |
|---|:---:|:---:|:---:|
| accommodation_main_image | string | 숙소 대표 이미지 | O |
| accommodationType | String | 숙소 타입(호텔, 펜션, 리조트) | O |
| accommodation_name | String | 숙소 이름 | O |
| accommodationGradeSum | number | 숙소 평점 합 | O |
| room_price | number | 숙소의 객실 최소 가격(객실 가격을 가져와서 최소 값만 추려서 사용) | O |
| category_pet | boolean | 카테고리 펫 동반 | O |
| category_non_smoking_area | boolean | 카테고리 흡연 객실 | O |
| category_indoor_spa | boolean | 카테고리 실내 스파 | O |
| category_dinner_party | boolean | 카테고리 바베큐 파티 | O |
| category_wifi | boolean | 카테고리 와이파이 | O |
| category_car_park | boolean | 카테고리 주차장 | O |
| category_pool | String | 카테고리 수영장 | O |
| accommodation_address | String | 호텔 주소 | O |
| room_name | String | 객실 이름 | O |
| room_image | String | 객실 사진 | O |
| room_check_in | String | 체크인  | O |
| room_check_out | String | 체크아웃 | O |
| room_total_guest | number | 최대 수용 인원 | O |
| room_price | number | 객실 가격 | O |
| title | String | 이용시설에 대한 정보 제목 | O |
| context | String | 이용시설에 대한 정보 내용 | O |
| guest_name | String | 리뷰 작성자 이름 | O |
| review_content | String | 리뷰 작성 내용 | O |
| review_grade | number | 평점 | O |

###### Example

**응답 성공**
```bash
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
  "code": "SU",
  "message": "Success.",
  "nurses": [
    {
      "nurseId": "qwer1234",
      "name": "홍길동",
      "telNumber": "01011112222"
    },
    ...
  ]
}
```

**응답 : 실패 (인증 실패)**
```bash
HTTP/1.1 401 Unauthorized
Content-Type: application/json;charset=UTF-8

{
  "code": "AF",
  "message": "Authentication fail."
}
```

**응답 실패 (데이터베이스 에러)**
```bash
HTTP/1.1 500 Internal Server Error
Content-Type: application/json;charset=UTF-8

{
  "code": "DBE",
  "message": "Database error."
}
```

***