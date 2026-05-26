export interface Product {
  _id: string;
  itemName: string;
  itemDescription: string;
  itemPrice: number;
  itemImage: string;
  category: string;
  isBestseller: boolean;
  stock: number;
}

export interface Review {
  _id: string;
  reviewerName: string;
  reviewText: string;
  rating: number;
  date: string;
}

export interface CustomizationOption {
  _id: string;
  serviceName: string;
  description: string;
  estimatedPrice: number;
  leadTime: string;
  isAvailable: boolean;
  exampleImage: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    _id: '1',
    itemName: 'Pure Silver Diya Set',
    itemDescription: 'Handcrafted pure silver diyas with intricate traditional patterns, perfect for festivals and gifting.',
    itemPrice: 2499,
    itemImage: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
    category: 'Diyas & Stands',
    isBestseller: true,
    stock: 15,
  },
  {
    _id: '2',
    itemName: 'Silver Ganesh Showpiece',
    itemDescription: 'Elegant pure silver Ganesh idol, meticulously crafted for your home decor or as a gift.',
    itemPrice: 5999,
    itemImage: 'https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=600&q=80',
    category: 'Showpieces',
    isBestseller: true,
    stock: 8,
  },
  {
    _id: '3',
    itemName: 'Silver Mandir Chowki',
    itemDescription: 'Pure silver chowki with lotus motifs, ideal for temple settings and auspicious occasions.',
    itemPrice: 7499,
    itemImage: 'https://images.unsplash.com/photo-1602526433888-5e0f7ab9b8e4?w=600&q=80',
    category: 'Chowkis',
    isBestseller: false,
    stock: 5,
  },
  {
    _id: '4',
    itemName: 'Silver Photo Frame',
    itemDescription: 'Exquisite silver-plated photo frame with filigree work, a timeless keepsake for cherished memories.',
    itemPrice: 1899,
    itemImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'Frames',
    isBestseller: true,
    stock: 20,
  },
  {
    _id: '5',
    itemName: 'Silver Wall Clock',
    itemDescription: 'Premium pure silver wall clock with Roman numerals. A statement piece for elegant homes.',
    itemPrice: 9999,
    itemImage: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80',
    category: 'Clocks',
    isBestseller: true,
    stock: 6,
  },
  {
    _id: '6',
    itemName: 'Silver Candle Stand Pair',
    itemDescription: 'Pair of pure silver candle stands with ornate hand-engraved patterns.',
    itemPrice: 3299,
    itemImage: 'https://images.unsplash.com/photo-1514897575457-c4db467cf78e?w=600&q=80',
    category: 'Showpieces',
    isBestseller: false,
    stock: 12,
  },
  {
    _id: '7',
    itemName: 'Silver Business Card Holder',
    itemDescription: 'Sleek sterling silver card holder, ideal corporate gifting for executives.',
    itemPrice: 1299,
    itemImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80',
    category: 'Corporate',
    isBestseller: false,
    stock: 30,
  },
  {
    _id: '8',
    itemName: 'Silver Pooja Thali Set',
    itemDescription: 'Complete pure silver pooja thali set with diya, bell, and incense holder.',
    itemPrice: 12999,
    itemImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    category: 'Diyas & Stands',
    isBestseller: true,
    stock: 4,
  },
];

// MOCK_REVIEWS array ko replace karo data.ts mein — puri array yeh hai:

export const MOCK_REVIEWS: Review[] = [
  {
    _id: 'r1',
    reviewerName: 'Priya Sharma',
    reviewText: 'The silver diya set was absolutely stunning. The craftsmanship is impeccable and it arrived beautifully packaged. Perfect for gifting! My in-laws were overjoyed.',
    rating: 5,
    date: '2026-02-14',
  },
  {
    _id: 'r2',
    reviewerName: 'Rahul Mehta',
    reviewText: 'Ordered a customized silver frame for our anniversary. The team at Neev Gifting was so helpful throughout the process. The final product exceeded our expectations.',
    rating: 5,
    date: '2026-01-28',
  },
  {
    _id: 'r3',
    reviewerName: 'Ananya Bose',
    reviewText: 'Got the Ganesh showpiece for Diwali gifting. It is pure silver and the weight and quality speak for themselves. Highly recommend Neev Gifting for premium gifting needs.',
    rating: 5,
    date: '2025-11-05',
  },
  {
    _id: 'r4',
    reviewerName: 'Deepika Nair',
    reviewText: 'Ordered a wedding gift hamper and everyone at the wedding loved it! The packaging was luxurious and the silver items were of exceptional quality. Will order again.',
    rating: 5,
    date: '2026-03-01',
  },
  {
    _id: 'r5',
    reviewerName: 'Amit Patel',
    reviewText: 'Bought a silver chowki for Navratri. The finish and design are beautiful. Delivery was fast and the product was well protected. Very satisfied with the purchase.',
    rating: 5,
    date: '2025-10-12',
  },
  {
    _id: 'r6',
    reviewerName: 'Sunita Joshi',
    reviewText: 'Neev Gifting has become my go-to for all festive gifting. The German silver collection is especially stunning. Each piece feels like a work of art.',
    rating: 5,
    date: '2026-01-10',
  },
  {
    _id: 'r7',
    reviewerName: 'Vikram Singh',
    reviewText: 'Got corporate gift sets for our team of 50. The quality was consistent across all pieces and the customization with our logo was done perfectly. Excellent service!',
    rating: 5,
    date: '2025-12-20',
  },
  {
    _id: 'r8',
    reviewerName: 'Kavita Reddy',
    reviewText: 'The silver photoframe I ordered is absolutely gorgeous. The engraving was done beautifully. It made for the most meaningful birthday gift for my parents.',
    rating: 5,
    date: '2026-02-05',
  },
  {
    _id: 'r9',
    reviewerName: 'Rohan Kapoor',
    reviewText: 'Ordered a pure silver God idol as a housewarming gift. The recipient was overjoyed. The idol is heavy, well-crafted and looks divine. 100% worth every rupee.',
    rating: 5,
    date: '2025-09-18',
  },
  {
    _id: 'r10',
    reviewerName: 'Meera Iyer',
    reviewText: 'I have been shopping from Neev Gifting for 2 years now. Every single product has been top quality. Their customer service is prompt and always helpful.',
    rating: 5,
    date: '2026-03-10',
  },
  {
    _id: 'r11',
    reviewerName: 'Sanjay Kulkarni',
    reviewText: 'The dry fruit box in German silver was a hit at the office party. Everyone wanted to know where I got it from! Absolutely premium gifting experience.',
    rating: 5,
    date: '2025-12-28',
  },
  {
    _id: 'r12',
    reviewerName: 'Pooja Agarwal',
    reviewText: 'Bought silver return favours for my daughter\'s wedding. All 200 guests were impressed by the quality. Neev Gifting handled our bulk order flawlessly.',
    rating: 5,
    date: '2026-02-20',
  },
  {
    _id: 'r13',
    reviewerName: 'Nikhil Desai',
    reviewText: 'The candle holders I ordered are stunning — perfect for home decor. The silver finish is premium and catches the light beautifully. Highly recommended!',
    rating: 5,
    date: '2025-11-30',
  },
  {
    _id: 'r14',
    reviewerName: 'Asha Menon',
    reviewText: 'Gifted a silver urli to my sister for her anniversary. She absolutely loves it. The size and quality were exactly as described. Fast delivery too!',
    rating: 5,
    date: '2026-01-15',
  },
  {
    _id: 'r15',
    reviewerName: 'Ravi Tiwari',
    reviewText: 'Best gifting brand I have come across. The attention to detail in every product is remarkable. The gift box presentation is so premium — it makes the unboxing special.',
    rating: 5,
    date: '2026-03-05',
  },
];

export const MOCK_CUSTOMIZATION: CustomizationOption[] = [
  {
    _id: 'c1',
    serviceName: 'Silver Engraving',
    description: 'Personalize any silver item with custom names, dates, or messages using precision engraving.',
    estimatedPrice: 499,
    leadTime: '3-5 business days',
    isAvailable: true,
    exampleImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
  },
  {
    _id: 'c2',
    serviceName: 'Corporate Gift Hampers',
    description: 'Curated silver gift hampers for corporate events with your company logo and branding.',
    estimatedPrice: 4999,
    leadTime: '7-10 business days',
    isAvailable: true,
    exampleImage: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=600&q=80',
  },
  {
    _id: 'c3',
    serviceName: 'Wedding Gift Sets',
    description: 'Bespoke silver gift collections for weddings, crafted to celebrate love and new beginnings.',
    estimatedPrice: 9999,
    leadTime: '10-14 business days',
    isAvailable: true,
    exampleImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  },
  {
    _id: 'c4',
    serviceName: 'Custom Silver Idols',
    description: 'Commission bespoke silver idols and religious artifacts made to your specifications.',
    estimatedPrice: 15000,
    leadTime: '21-30 business days',
    isAvailable: true,
    exampleImage: 'https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=600&q=80',
  },
  {
    _id: 'c5',
    serviceName: 'Photo Etching on Silver',
    description: 'Transfer your cherished photos onto pure silver plates using laser etching technology.',
    estimatedPrice: 2499,
    leadTime: '5-7 business days',
    isAvailable: false,
    exampleImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    _id: 'c6',
    serviceName: 'Bulk Order Customization',
    description: 'Minimum 50 units. Custom silver gifts for corporate bulk orders with exclusive pricing.',
    estimatedPrice: 999,
    leadTime: '14-21 business days',
    isAvailable: true,
    exampleImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80',
  },
];
