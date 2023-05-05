declare module '*.gql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;
  export = Schema;
}

declare module 'vue3-tabs-component' {
  import { Component } from 'vue';
  const Tabs: Component;
  const Tab: Component;

  export { Tabs, Tab };
}

type HttpsCallableHelper = <T, U>(data: T) => U;

// Helper interfaces generics to reduce typings code
interface DataWrapper<T> {
  data: T;
}

interface StrapiDataWrapper<T> {
  id?: string;
  attributes?: T;
}

// API Request

type CategoriesRequest = DataWrapper<CategoriesRequestData>;
type InvoicesRequest = DataWrapper<InvoicesRequestData>;
type ProductRequest = DataWrapper<ProductRequestData>;
type LoginRequest = DataWrapper<LoginRequestData>;
type RegisterRequest = DataWrapper<RegisterRequestData>;
type CreateInvoiceRequest = DataWrapper<CreateInvoiceRequestData>;

// API Request Data
interface CategoriesRequestData {
  categories: Categories;
}

interface InvoicesRequestData {
  invoices: Invoices;
}

interface ProductRequestData {
  products: Products;
}

interface LoginRequestData {
  login: UserData;
}

interface RegisterRequestData {
  register: UserData;
}

interface CreateInvoiceRequestData {
  createInvoice: CreateInvoice;
}

// API Content
interface UserData {
  jwt: string;
  user: User;
}

type Categories = DataWrapper<CategoriesData[]>;
type SubCategories = DataWrapper<SubCategoriesData[]>;
type Invoices = DataWrapper<InvoicesData[]>;
type Invoice = DataWrapper<InvoicesData>;
type Products = DataWrapper<ProductsData[]>;
type ProductsList = DataWrapper<ProductsData[]>;
type CreateInvoice = DataWrapper<InvoicesData>;

// API Data
type CategoriesData = StrapiDataWrapper<CategoryAttributes>;
type SubCategoriesData = StrapiDataWrapper<SubCategoryAttributes>;
type InvoicesData = StrapiDataWrapper<InvoiceAtributes>;
type ProductsData = StrapiDataWrapper<ProductAttributes>;

// Data attributes
interface CategoryAttributes {
  name: string;
  subcategories: SubCategories[];
}

interface SubCategoryAttributes {
  name: string;
  products: Products[];
}

interface ProductAttributes {
  name: string;
  description: string;
  images: any;
  size: string;
  materials: string;
  price: number;
  subcategory: SubCategoryAttributes;
}

interface InvoiceAtributes {
  paid: boolean;
  amount: number;
  products: ProductBuyed[];
  payment_id: string;
  order_id: string;
  user_id: string;
  shippingAddress: AddressDetail;
  fullName: string;
  cardType: string;
  cardKind: string;
  cardLast: string;
  payment_method: string;
  payment_info: InvoicePaymentInfo[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Mappeds
interface CategoriesMapped {
  id: string;
  name: string;
  subcategories: SubCategoriesMapped[];
}

interface SubCategoriesMapped {
  id?: string;
  name: string;
  products: ProductsMapped[];
}

interface ProductsMapped extends ProductAttributes {
  id: string;
}

interface InvoicesMapped extends InvoiceAtributes {
  id: string;
}

// Others ...
interface InvoicePaymentInfo {
  name: string;
  email: string;
  amount: string;
  lastname: string;
  confirmation: string;
  payment_date: string;
}

interface BCVSource {
  name: string;
  quote: string;
  last_retrieved: string;
}

interface BcvUsdResponse {
  name: string;
  pair: string;
  sources: {
    BCV: BCVSource;
  };
}

// Rest...

interface Category {
  id: string;
  name: string;
}

interface Image {
  id?: string;
  name: string;
  formats: Formats;
  alternativeText: string;
  url: string;
  caption?: string;
}

interface Formats {
  medium: ImageMetadata;
  small: ImageMetadata;
  thumbnail: ImageMetadata;
}

interface ImageMetadata {
  ext: string;
  url: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path?: string | null;
  size: number;
  width: number;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface InvoiceTableDetail extends InvoiceAtributes {
  id: string;
  id_invoice_user: number;
  date: string;
  status: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  customerId: string | null;
  first_name: string | null;
  last_name: string | null;
  shipping_address: AddressDetail | null;
  billing_address: AddressDetail | null;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

interface ProductBuyed {
  id: string;
  quantity: number;
  id_product: number;
  name_product: string;
}

interface AddressDetail {
  home: string;
  city: string;
  phone: string;
  address: string;
  country: string;
  zipCode: string;
}
