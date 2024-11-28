import {BathsVO, BedroomsVO, BedsVO, DescriptionVO, GuestVO, PriceVO, TitleVO} from "./listing-vo.model";
import {CategoryName} from "../../layout/navbar/category/category.model";
import {NewListingPicture} from "./picture.model";

export interface NewListingInfo {
  guests: GuestVO,
  bedrooms: BedroomsVO,
  baths: BathsVO,
  beds: BedsVO,
}


export interface Description {
  title: TitleVO,
  description: DescriptionVO,
}

export interface NewListing {
  category:CategoryName,
  location:string,
  infos:NewListingInfo,
  pictures: Array<NewListingPicture>;
  description: Description,
  price: PriceVO

}

export  interface CreatedListing {
  publicId:string
}

export interface DisplayPicture {
  file?: string;
  fileContenType: string;
  isCover?: boolean;
}

export interface CardListing {
  price: PriceVO;
  location: string;
  cover: DisplayPicture;
  bookingCategory: CategoryName;
  publicId: string;
  loading: boolean;
}





