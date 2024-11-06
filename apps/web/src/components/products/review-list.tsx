import { TProduct } from "../../queries/products";

import Rating from "./rating";

interface ReviewListProps {
  reviews: TProduct['reviews'];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <>
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-200 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Rating rating={review.rating} />
              <span className="ml-2 font-medium">{review.reviewerName}</span>
            </div>
            <span className="text-gray-500 text-sm">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
        </div>
      ))}
    </>
  );
}
