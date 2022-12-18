import { Component } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { CustomerDetails } from './shared/customerDetail';
import { ProductDetails } from './shared/productDetails';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clothe-billing-invoice';
  //for emoji
  emoji = '&#127933;&#129507;&#129510;'
  emoji2='&#128090;&#128131;&#129509;'

  //for date
  dtToday = new Date();

  month = this.dtToday.getMonth() + 1;
  day = this.dtToday.getDate();
 year = this.dtToday.getFullYear();

startDate=this.year.toString()+'-'+this.month.toString()+'-'+this.day.toString();




  submitted:boolean=false;
  billReceipt = new CustomerDetails();

  createPDF(action = 'print') {
    this.submitted=true;
    let docDefinition = {
      content: [
        {
          text: 'Shopping bill receipt',
          fontSize: 16,
          alignment: 'center',
          color: '#025673'
        },
        {
          text: 'Customer Details :',
          style: 'sectionHeader'
        },
        {
          columns: [
            [

              {
                text: this.billReceipt.customerName,
                bold:true
              },
              { text: this.billReceipt.customerPhoneNo },

              { text: this.billReceipt.customerEmail },

            ],
            [
              {
                text: `Date: ${this.startDate}`,
                alignment: 'right',
              },
              {
                text: `Bill Number : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Customer Address :',
          style: 'sectionHeader'
        },
        {
          columns: [
            [

              { text: this.billReceipt.customerAddress },

            ]]
        },


        {

          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product-Name', 'Price', 'Quantity', 'Amount'],
              ...this.billReceipt.productsData.map(product =>
                ([product.productName, product.productPrice, product.productQuantity,
                  (product.productPrice*product.productQuantity).toFixed(2)])),
              [{text: 'Total Amount', colSpan: 3}, {}, {}, this.billReceipt.productsData.reduce((sum, product)=>
              sum + (product.productQuantity * product.productPrice), 0).toFixed(2)]
            ]
          }
        },

        {
            text:' ',
            margin: [0, 0 ,0, 20]
        },
        {
          columns: [
            [{ text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 1 month.',
              'No Warranty/guaranty of the clothes .',
              'This is system generated bill.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };

    if(action==='print'){
      pdfMake.createPdf(docDefinition).print();
    }

  }

  //for add row for multiple products into list
  addProductDetails(){
    this.billReceipt.productsData.push(new ProductDetails());
  }

  onRemove(indexValue){
    this.billReceipt.productsData.splice(indexValue,1);
      }
}
