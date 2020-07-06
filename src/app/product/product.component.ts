import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  isNotFound: boolean;
  showElement: boolean;
  alert: Alert = { message: '', type: '' };

  constructor(private productService: ProductService) { }

  list = [];
  ngOnInit(): void {
    this.list = this.productService.list;
    this.productService.productUpdate.subscribe(() => {
      this.list = this.productService.list;

    })
  }


  changeList(name: string, type: string, description: string) {
    this.isNotFound = false;

    if (name && type) {
      this.list.forEach(item => {

        if (item.name === name) {
          this.isNotFound = true;
          return;
        }
      });


      if (!this.isNotFound) {
        this.productService.addItem(name, type, description);
        this.alert.message = 'Product successfully added!';
        this.alert.type = 'success';
        this.displayAlert('Product successfully added!', 'success');
      } else {
        this.displayAlert('Product already been added, change the name or add new product', 'danger');
      }
    }

  }

  handleAlert() {
    this.showElement = false;
  }

  displayAlert(message: string, type: string) {
    this.showElement = true;
    this.alert.message = message;
    this.alert.type = type;
    setTimeout(() => {
      this.showElement = false;
    }, 4000)
  }
  deleteItem(name: string) {
    this.productService.removeItem(name);
    this.displayAlert('Successfully deleted!', 'warning');
  }
}
