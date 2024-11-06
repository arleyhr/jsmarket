import OrderList from '../components/orders/orders-user-list';

export type Order = {
  id: number;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  status: string;
  total: number;
  shippingAddress: string | null;
  billingAddress: string | null;
  items: {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    name: string;
  }[];
  statusHistory: {
    id: number;
    status: string;
    previousStatus: string | null;
    timestamp: Date;
    comment: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};

export const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'review': 'bg-orange-100 text-orange-800',
  'start-preparation': 'bg-yellow-100 text-yellow-800',
  'shipped': 'bg-purple-100 text-purple-800',
  'delivered': 'bg-green-100 text-green-800',
  'canceled': 'bg-red-100 text-red-800',
};


export const orders: Order[] = [
  {
    id: 1,
    user: {
      id: 1,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe'
    },
    status: 'pending',
    total: 299.99,
    shippingAddress: '123 Main St, City, Country',
    billingAddress: '123 Main St, City, Country',
    items: [
      {
        id: 1,
        productId: 1,
        quantity: 2,
        price: 149.99,
        name: 'Premium Headphones'
      },
      {
        id: 2,
        productId: 4,
        quantity: 1,
        price: 59.99,
        name: 'Wireless Mouse'
      },
      {
        id: 3,
        productId: 5,
        quantity: 1,
        price: 89.99,
        name: 'Mechanical Keyboard'
      }
    ],
    statusHistory: [
      {
        id: 1,
        status: 'pending',
        previousStatus: null,
        timestamp: new Date('2024-01-15T10:30:00Z'),
        comment: 'Order received'
      }
    ],
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: 2,
    user: {
      id: 2,
      email: 'jane.smith@example.com',
      firstName: 'Jane',
      lastName: 'Smith'
    },
    status: 'preparation',
    total: 499.99,
    shippingAddress: '456 Oak Ave, City, Country',
    billingAddress: '456 Oak Ave, City, Country',
    items: [
      {
        id: 2,
        productId: 2,
        quantity: 1,
        price: 499.99,
        name: 'Smart Watch'
      },
      {
        id: 4,
        productId: 6,
        quantity: 2,
        price: 29.99,
        name: 'USB-C Cable'
      },
      {
        id: 5,
        productId: 7,
        quantity: 1,
        price: 199.99,
        name: 'Wireless Earbuds'
      },
      {
        id: 6,
        productId: 8,
        quantity: 1,
        price: 79.99,
        name: 'Power Bank'
      }
    ],
    statusHistory: [
      {
        id: 2,
        status: 'pending',
        previousStatus: null,
        timestamp: new Date('2024-01-14T09:00:00Z'),
        comment: 'Order received'
      },
      {
        id: 3,
        status: 'preparation',
        previousStatus: 'pending',
        timestamp: new Date('2024-01-14T10:30:00Z'),
        comment: 'Order in preparation'
      }
    ],
    createdAt: new Date('2024-01-14T09:00:00Z'),
    updatedAt: new Date('2024-01-14T10:30:00Z')
  },
  {
    id: 3,
    user: {
      id: 3,
      email: 'robert.wilson@example.com',
      firstName: 'Robert',
      lastName: 'Wilson'
    },
    status: 'delivered',
    total: 799.99,
    shippingAddress: '789 Pine Rd, City, Country',
    billingAddress: '789 Pine Rd, City, Country',
    items: [
      {
        id: 3,
        productId: 3,
        quantity: 1,
        price: 799.99,
        name: 'Gaming Console'
      },
      {
        id: 7,
        productId: 9,
        quantity: 2,
        price: 69.99,
        name: 'Gaming Controller'
      },
      {
        id: 8,
        productId: 10,
        quantity: 3,
        price: 59.99,
        name: 'Video Game'
      },
      {
        id: 9,
        productId: 11,
        quantity: 1,
        price: 129.99,
        name: 'Gaming Headset'
      }
    ],
    statusHistory: [
      {
        id: 4,
        status: 'pending',
        previousStatus: null,
        timestamp: new Date('2024-01-13T14:00:00Z'),
        comment: 'Order received'
      },
      {
        id: 5,
        status: 'preparation',
        previousStatus: 'pending',
        timestamp: new Date('2024-01-13T15:30:00Z'),
        comment: 'Order in preparation'
      },
      {
        id: 6,
        status: 'shipped',
        previousStatus: 'preparation',
        timestamp: new Date('2024-01-13T17:00:00Z'),
        comment: 'Order shipped'
      },
      {
        id: 7,
        status: 'delivered',
        previousStatus: 'shipped',
        timestamp: new Date('2024-01-14T10:00:00Z'),
        comment: 'Order delivered'
      }
    ],
    createdAt: new Date('2024-01-13T14:00:00Z'),
    updatedAt: new Date('2024-01-14T10:00:00Z')
  }
];

export const orderStatusLogs = [
  ...orders.flatMap(order =>
    order.statusHistory.map(history => ({
      orderId: order.id,
      customerName: `${order.user.firstName} ${order.user.lastName}`,
      status: history.status,
      previousStatus: history.previousStatus,
      timestamp: history.timestamp,
      comment: history.comment
    }))
  ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
]

export default function OrdersPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <OrderList orders={orders} />
    </div>
  );
}
