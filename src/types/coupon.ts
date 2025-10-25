import type { Pagination } from "./common";

export interface Coupon {
  id?: string;
  code: string;                 
  description?: string;    
  discountType: "percentage" | "fixed"; 
  value: number;                
  usageCount?: number;          
  maxUsage?: number;       
  validFrom?: string | Date;    
  validTo?: string | Date;      
  minOrderValue?: number;       
  status?: "active" | "inactive" | "expired";        
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CouponResDto {
  data: Coupon[];
  pagination: Pagination;
}

export type GetAllCouponParams = {
  page?: number;
  pageSize?: number;
  search?: string;               
  sortField?: string;
  sortOrder?: "asc" | "desc";
  status?: "active" | "inactive" | "expired";
};
