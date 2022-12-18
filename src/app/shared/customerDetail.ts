import {ProductDetails} from './productDetails'

export class CustomerDetails{
  customerName: string;
  customerAddress: string;
  customerPhoneNo: number;
  customerEmail: string;

  productsData: ProductDetails[] = [];
  additionalDetails: string;

  constructor(){
    // Initially one empty product row we will show
    this.productsData.push(new ProductDetails());
  }
}
