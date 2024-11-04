import { Field, ObjectType, Int, Float, registerEnumType } from '@nestjs/graphql';

export enum AvailabilityStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
}

registerEnumType(AvailabilityStatus, {
  name: 'AvailabilityStatus',
});


@ObjectType()
export class Dimensions {
  @Field(() => Float)
  width: number;

  @Field(() => Float)
  height: number;

  @Field(() => Float)
  depth: number;
}

@ObjectType()
export class Meta {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  barcode: string;

  @Field()
  qrCode: string;
}

@ObjectType()
export class Review {
  @Field(() => Float)
  rating: number;

  @Field()
  comment: string;

  @Field()
  date: Date;

  @Field()
  reviewerName: string;

  @Field()
  reviewerEmail: string;
}


@ObjectType()
export class Products {
  @Field(() => [Product])
  data: Product[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  skip: number;

  @Field(() => Int)
  limit: number;
}

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  category: string;

  @Field(() => Float)
  price: number;

  @Field(() => Float)
  discountPercentage: number;

  @Field(() => Float)
  rating: number;

  @Field(() => Int)
  stock: number;

  @Field(() => [String])
  tags: string[];

  @Field({ nullable: true })
  brand?: string;

  @Field()
  sku: string;

  @Field(() => Float)
  weight: number;

  @Field(() => Dimensions)
  dimensions: Dimensions;

  @Field()
  warrantyInformation: string;

  @Field()
  shippingInformation: string;

  @Field(() => AvailabilityStatus)
  availabilityStatus: AvailabilityStatus;

  @Field(() => [Review])
  reviews: Review[];

  @Field()
  returnPolicy: string;

  @Field(() => Int)
  minimumOrderQuantity: number;

  @Field(() => Meta)
  meta: Meta;

  @Field(() => [String])
  images: string[];

  @Field()
  thumbnail: string;
}

@ObjectType()
export class Category {
  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  url: string;
}
