// interface: filter request body dto //
import AccommodationType from "src/types/accommodation/accommodation-type.ts.interface";
import Category from "src/types/accommodation/category.interface";
import ReviewGrade from "src/types/accommodation/review-grade.interface";

// 필터 검색 눌렀을 때 요청할 request dto //
export default interface FilterRequestDto {
  priceRange: { minPrice: number; maxPrice: number };
  reviewGrade: ReviewGrade[] | null;
  //reviewGrade: number[] 이렇게 해도 될지 모르겠음
  accomodationType: AccommodationType[] | null;
  category: Category[] | null;
}
