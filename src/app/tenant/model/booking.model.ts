import {DisplayPicture} from "../../landlord/model/listing-model";
import {PriceVO} from "../../landlord/model/listing-vo.model";

export interface BookedDatesDTOFromServer {
  startDate: Date;
  endDate: Date;

}

 export interface BookedListing{
location : string;
cover: DisplayPicture;
totalPrice : PriceVO;
date: BookedDatesDTOFromServer;
bookingPublicId: string;
listingPublicId: string;
loding: boolean;

}
