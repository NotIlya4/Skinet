import { Injectable } from '@angular/core';
import {IProductsFiltering} from "./products-filtering";
import {HttpClient, HttpParams} from "@angular/common/http";
import {IProductsInfo} from "../../models/products-info";
import { Pagination } from "../../models/pagination";
import {IProduct} from "../../models/product";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = environment.productsUri;

  constructor(private httpClient: HttpClient) {
  }

  getProducts(pagination: Pagination, filtering: IProductsFiltering, sortings: string[]): Observable<IProductsInfo>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append('offset', pagination.getOffset());
    httpParams = httpParams.append('limit', pagination.getLimit());

    if (sortings) {
      sortings.forEach((sorting) => {
        httpParams = httpParams.append('sortings', sorting);
      });
    }

    if (filtering.productTypeName){
      httpParams = httpParams.append('productTypeName', filtering.productTypeName);
    }

    if (filtering.brandName){
      httpParams = httpParams.append('brandName', filtering.brandName);
    }

    if (filtering.searching){
      httpParams = httpParams.append('searching', filtering.searching);
    }

    return this.httpClient.get<IProductsInfo>(`${this.baseUrl}products`, {params: httpParams})
  }

  getProduct(id: string): Observable<IProduct>{
    return this.httpClient.get<IProduct>(`${this.baseUrl}products/id/${id}`);
  }
}