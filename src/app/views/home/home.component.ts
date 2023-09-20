import { ProductService } from './../../services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTable, MatTableModule} from '@angular/material/table';
import { IProduct } from 'src/app/models/product';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ProductService]
})

export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  dataTable!:MatTable<any>
  displayedColumns: string[] = ['product_id', 'name', 'sale_value', 'pucharse_value', 'quantity', 'description', 'actions'];
  dataSource:IProduct[] = [];

  constructor(
    public dialog: MatDialog,
    public productService: ProductService
    ) {
      this.productService.getElements().subscribe((data: IProduct[]) => {
        this.dataSource = data;
      })
  }

  ngOnInit(): void {
    
  }

  openDialog(product?: IProduct): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: !product ? {
        product_id: null,
        name: '',
        sale_value: 0,
        pucharse_value: 0,
        quantity: 0,
        description: ''
      } : {
        product_id: product.product_id,
        name: product.name,
        sale_value: product.sale_value,
        pucharse_value: product.pucharse_value,
        quantity: product.quantity,
        description: product.description
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        if(this.dataSource.map(p => p.product_id).includes(result.product_id)){
          this.productService.putElements(result)
          .subscribe((data: IProduct) => {
            const index = this.dataSource.findIndex(p => p.product_id === data.product_id)
            this.dataSource[index] = data;
            this.dataTable.renderRows();
          });
        } else {
          this.productService.postElements(result)
            .subscribe((data: IProduct) => {
              this.dataSource.push(data);
              this.dataTable.renderRows();
            });
        }
      }
    })
  }

  deleteProduct(productId: string): void{
    this.productService.deleteElements(productId)
      .subscribe(() => {
        this.dataSource = this.dataSource.filter(p => p.product_id !== productId);
      })
  }
}


