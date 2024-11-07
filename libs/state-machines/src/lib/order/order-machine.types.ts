export enum OrderStatus {
  Pending = 'Pending',
  Review = 'Review',
  StartPreparation = 'Start Preparation',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
  Canceled = 'Canceled',
}

export enum OrderEvents {
  startPreparation = 'startPreparation',
  cancel = 'cancel',
  ship = 'ship',
  deliver = 'deliver',
  approveReview = 'approveReview',
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
