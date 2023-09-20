import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent {
  element!: IProduct;
  isChange: boolean = false;
  
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: IProduct,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  ){
    
  }

  ngOnInit(): void{
    if (this.data.product_id != null){
      this.isChange = true
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
