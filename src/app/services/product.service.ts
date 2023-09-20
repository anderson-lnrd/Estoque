import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    apiUrl = 'http://localhost:8800/product'
    constructor(private http: HttpClient){ }

    getElements(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.apiUrl)
    }

    postElements(product: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(this.apiUrl, product)
    }

    putElements(product: IProduct): Observable<IProduct> {
        return this.http.put<IProduct>(`${this.apiUrl}/:${product.product_id}`, product)
    }

    deleteElements(id: string): Observable<any> {
        return this.http.delete<IProduct>(`${this.apiUrl}/:${id}`)
    }
}
