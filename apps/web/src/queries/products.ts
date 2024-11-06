import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts(
    $page: Int!
    $perPage: Int!
    $category: String
    $sortBy: String
    $order: String
    $search: String
  ) {
    products(
      page: $page
      perPage: $perPage
      category: $category
      sortBy: $sortBy
      order: $order
      search: $search
    ) {
      data {
        id
        title
        images
        thumbnail
        discountPercentage
        reviews {
          rating
        }
        rating
        price
      }
    }
  }
`;

const GET_PRODUCT_DETAILS = gql`
  query GetProductDetails($productId: Int!) {
    product(id: $productId) {
      id
      images
      thumbnail
      title
      rating
      brand
      category
      description
      price
      stock
      sku
      tags
      discountPercentage
      reviews {
        comment
        reviewerName
        rating
        date
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      slug
    }
  }
`;

export type TCategory = {
  name: string;
  slug: string;
}

export type TProduct = {
  id: number;
  images: string[];
  thumbnail: string;
  title: string;
  rating: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  tags: string[];
  discountPercentage: number;
  reviews: {
    comment: string;
    reviewerName: string;
    rating: number;
    date: string;
  }[];
};

export { GET_PRODUCTS, GET_PRODUCT_DETAILS };
