import type {
  CateringPackageProps,
  EventType,
  FormStepType,
} from "@/types/customer/package-types";

// Define buffet packages
export const buffetPackages: CateringPackageProps[] = [
  {
    id: "buffet-a",
    name: "Set A - Basic Feast",
    description:
      "A simple yet satisfying selection of Filipino favorites for small gatherings.",
    pricePerPax: 350,
    minimumPax: 20,
    recommendedPax: 30,
    maximumPax: 50,
    options: [
      { category: "Soup", count: 1 },
      { category: "Chicken", count: 1 },
      { category: "Pork", count: 1 },
      { category: "Noodle", count: 1 },
    ],
    inclusions: [
      "Basic table setup",
      "Disposable utensils and plates",
      "Service staff (2 personnel)",
      "Food warmers and serving utensils",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "buffet-b",
    name: "Set B - Family Celebration",
    description:
      "A hearty selection of dishes perfect for family celebrations and small parties.",
    pricePerPax: 450,
    minimumPax: 30,
    recommendedPax: 50,
    maximumPax: 80,
    options: [
      { category: "Soup", count: 1 },
      { category: "Salad", count: 1 },
      { category: "Chicken", count: 1 },
      { category: "Pork", count: 1 },
      { category: "Noodle", count: 1 },
    ],
    inclusions: [
      "Enhanced table setup",
      "Disposable utensils and plates",
      "Service staff (3 personnel)",
      "Food warmers and serving utensils",
      "Basic dessert station",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "buffet-c",
    name: "Set C - Fiesta Favorites",
    description:
      "A complete Filipino fiesta experience with a wide variety of traditional dishes.",
    pricePerPax: 550,
    minimumPax: 50,
    recommendedPax: 80,
    maximumPax: 120,
    options: [
      { category: "Soup", count: 1 },
      { category: "Salad", count: 1 },
      { category: "Chicken", count: 1 },
      { category: "Pork", count: 1 },
      { category: "Beef", count: 1 },
      { category: "Noodle", count: 1 },
    ],
    inclusions: [
      "Premium table setup",
      "Quality disposable utensils and plates",
      "Service staff (4 personnel)",
      "Food warmers and serving utensils",
      "Dessert station with 2 options",
      "Welcome drinks",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "buffet-d",
    name: "Set D - Premium Celebration",
    description:
      "An elevated dining experience featuring premium Filipino dishes for special occasions.",
    pricePerPax: 650,
    minimumPax: 50,
    recommendedPax: 100,
    maximumPax: 150,
    options: [
      { category: "Soup", count: 1 },
      { category: "Salad", count: 1 },
      { category: "Chicken", count: 2 },
      { category: "Pork", count: 1 },
      { category: "Beef", count: 1 },
      { category: "Seafood", count: 1 },
      { category: "Noodle", count: 1 },
      { category: "Beverage", count: 1 },
    ],
    inclusions: [
      "Elegant table setup with centerpieces",
      "Quality disposable utensils and plates",
      "Service staff (5 personnel)",
      "Food warmers and serving utensils",
      "Dessert station with 3 options",
      "Welcome drinks and iced tea",
      "Basic coffee station",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "buffet-e",
    name: "Set E - Grand Feast",
    description:
      "A grand Filipino feast featuring a comprehensive selection of dishes for large celebrations.",
    pricePerPax: 750,
    minimumPax: 80,
    recommendedPax: 120,
    maximumPax: 200,
    options: [
      { category: "Soup", count: 2 },
      { category: "Salad", count: 2 },
      { category: "Chicken", count: 2 },
      { category: "Pork", count: 2 },
      { category: "Beef", count: 1 },
      { category: "Seafood", count: 1 },
      { category: "Vegetable", count: 1 },
      { category: "Noodle", count: 1 },
      { category: "Dessert", count: 2 },
      { category: "Beverage", count: 2 },
    ],
    inclusions: [
      "Premium table setup with floral arrangements",
      "Quality disposable utensils and plates",
      "Service staff (7 personnel)",
      "Food warmers and serving utensils",
      "Dessert station with 4 options",
      "Welcome drinks and unlimited iced tea",
      "Coffee and tea station",
      "Fruit station",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "buffet-f",
    name: "Set F - Royal Filipino Banquet",
    description:
      "The ultimate Filipino banquet experience featuring our finest dishes and premium service.",
    pricePerPax: 950,
    minimumPax: 100,
    recommendedPax: 150,
    maximumPax: 300,
    options: [
      { category: "Soup", count: 2 },
      { category: "Salad", count: 2 },
      { category: "Chicken", count: 2 },
      { category: "Pork", count: 2 },
      { category: "Beef", count: 2 },
      { category: "Seafood", count: 2 },
      { category: "Vegetable", count: 2 },
      { category: "Noodle", count: 1 },
      { category: "Dessert", count: 3 },
      { category: "Beverage", count: 3 },
    ],
    inclusions: [
      "Luxury table setup with premium decorations",
      "Fine dining utensils and plates",
      "Service staff (10 personnel)",
      "Food warmers and serving utensils",
      "Premium dessert station with 5 options",
      "Welcome cocktails and unlimited beverages",
      "Premium coffee and tea station",
      "Fruit and cheese station",
      "Live cooking station",
      "Ice cream station",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
];

// Define plated packages as separate data
export const platedPackages: CateringPackageProps[] = [
  {
    id: "plated-a",
    name: "Plated Set A - Basic Feast",
    description:
      "A simple yet satisfying selection of Filipino favorites for small gatherings.",
    pricePerPax: 370, // 350 + (4 * 100) / 20
    minimumPax: 20,
    recommendedPax: 30,
    maximumPax: 50,
    serviceHours: 4,
    serviceCharge: 100,
    options: [
      { category: "Soup", count: 1 },
      { category: "Chicken", count: 1 },
      { category: "Pork", count: 1 },
      { category: "Noodle", count: 1 },
    ],

    inclusions: [
      "Basic table setup",
      "Disposable utensils and plates",
      "Service staff (2 personnel)",
      "Food warmers and serving utensils",
      "4 hours of table service",
      "Professional waitstaff",
      "Table-side service",
      "Course-by-course serving",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "plated-b",
    name: "Plated Set B - Family Celebration",
    description:
      "A hearty selection of dishes perfect for family celebrations and small parties.",
    pricePerPax: 465, // 450 + (4.5 * 100) / 30
    minimumPax: 30,
    recommendedPax: 50,
    maximumPax: 80,
    serviceHours: 4.5,
    serviceCharge: 100,
    options: [
      { category: "Soup", count: 1 },
      { category: "Salad", count: 1 },
      { category: "Chicken", count: 1 },
      { category: "Pork", count: 1 },
      { category: "Noodle", count: 1 },
    ],
    inclusions: [
      "Enhanced table setup",
      "Disposable utensils and plates",
      "Service staff (3 personnel)",
      "Food warmers and serving utensils",
      "Basic dessert station",
      "4.5 hours of table service",
      "Professional waitstaff",
      "Table-side service",
      "Course-by-course serving",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "plated-c",
    name: "Plated Set C - Fiesta Favorites",
    description:
      "A complete Filipino fiesta experience with a wide variety of traditional dishes.",
    pricePerPax: 560, // 550 + (5 * 100) / 50
    minimumPax: 50,
    recommendedPax: 80,
    maximumPax: 120,
    serviceHours: 5,
    serviceCharge: 100,
    options: [
      { category: "Soup", count: 1 },
      { category: "Salad", count: 1 },
      { category: "Chicken", count: 1 },
      { category: "Pork", count: 1 },
      { category: "Beef", count: 1 },
      { category: "Noodle", count: 1 },
    ],
    inclusions: [
      "Premium table setup",
      "Quality disposable utensils and plates",
      "Service staff (4 personnel)",
      "Food warmers and serving utensils",
      "Dessert station with 2 options",
      "Welcome drinks",
      "5 hours of table service",
      "Professional waitstaff",
      "Table-side service",
      "Course-by-course serving",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "plated-d",
    name: "Plated Set D - Premium Celebration",
    description:
      "An elevated dining experience featuring premium Filipino dishes for special occasions.",
    pricePerPax: 661, // 650 + (5.5 * 100) / 50
    minimumPax: 50,
    recommendedPax: 100,
    maximumPax: 150,
    serviceHours: 5.5,
    serviceCharge: 100,
    options: [
      { category: "Soup", count: 1 },
      { category: "Salad", count: 1 },
      { category: "Chicken", count: 2 },
      { category: "Pork", count: 1 },
      { category: "Beef", count: 1 },
      { category: "Seafood", count: 1 },
      { category: "Noodle", count: 1 },
      { category: "Beverage", count: 1 },
    ],
    inclusions: [
      "Elegant table setup with centerpieces",
      "Quality disposable utensils and plates",
      "Service staff (5 personnel)",
      "Food warmers and serving utensils",
      "Dessert station with 3 options",
      "Welcome drinks and iced tea",
      "Basic coffee station",
      "5.5 hours of table service",
      "Professional waitstaff",
      "Table-side service",
      "Course-by-course serving",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "plated-e",
    name: "Plated Set E - Grand Feast",
    description:
      "A grand Filipino feast featuring a comprehensive selection of dishes for large celebrations.",
    pricePerPax: 758, // 750 + (6 * 100) / 80
    minimumPax: 80,
    recommendedPax: 120,
    maximumPax: 200,
    serviceHours: 6,
    serviceCharge: 100,
    options: [
      { category: "Soup", count: 2 },
      { category: "Salad", count: 2 },
      { category: "Chicken", count: 2 },
      { category: "Pork", count: 2 },
      { category: "Beef", count: 1 },
      { category: "Seafood", count: 1 },
      { category: "Vegetable", count: 1 },
      { category: "Noodle", count: 1 },
      { category: "Dessert", count: 2 },
      { category: "Beverage", count: 2 },
    ],
    inclusions: [
      "Premium table setup with floral arrangements",
      "Quality disposable utensils and plates",
      "Service staff (7 personnel)",
      "Food warmers and serving utensils",
      "Dessert station with 4 options",
      "Welcome drinks and unlimited iced tea",
      "Coffee and tea station",
      "Fruit station",
      "6 hours of table service",
      "Professional waitstaff",
      "Table-side service",
      "Course-by-course serving",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    id: "plated-f",
    name: "Plated Set F - Royal Filipino Banquet",
    description:
      "The ultimate Filipino banquet experience featuring our finest dishes and premium service.",
    pricePerPax: 957, // 950 + (6.5 * 100) / 100
    minimumPax: 100,
    recommendedPax: 150,
    maximumPax: 300,
    serviceHours: 6.5,
    serviceCharge: 100,
    options: [
      { category: "Soup", count: 2 },
      { category: "Salad", count: 2 },
      { category: "Chicken", count: 2 },
      { category: "Pork", count: 2 },
      { category: "Beef", count: 2 },
      { category: "Seafood", count: 2 },
      { category: "Vegetable", count: 2 },
      { category: "Noodle", count: 1 },
      { category: "Dessert", count: 3 },
      { category: "Beverage", count: 3 },
    ],
    inclusions: [
      "Luxury table setup with premium decorations",
      "Fine dining utensils and plates",
      "Service staff (10 personnel)",
      "Food warmers and serving utensils",
      "Premium dessert station with 5 options",
      "Welcome cocktails and unlimited beverages",
      "Premium coffee and tea station",
      "Fruit and cheese station",
      "Live cooking station",
      "Ice cream station",
      "6.5 hours of table service",
      "Professional waitstaff",
      "Table-side service",
      "Course-by-course serving",
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
];

// Define event packages
export const eventPackages: Record<EventType, CateringPackageProps[]> = {
  Birthday: [
    {
      id: "birthday-a",
      name: "Birthday Celebration - Basic",
      description:
        "A fun and festive package perfect for birthday celebrations.",
      //this one
      eventType: "Birthday",
      pricePerPax: 450,
      minimumPax: 30,
      recommendedPax: 40,
      maximumPax: 60,
      serviceHours: 4,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 1 },
        { category: "Beverage", count: 1 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Basic birthday setup",
        "Disposable utensils and plates",
        "Service staff (3 personnel)",
        "Food warmers and serving utensils",
        "Birthday cake table setup",
        "Welcome drinks",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "birthday-b",
      name: "Birthday Celebration - Premium",
      description:
        "An enhanced birthday package with more food options and better service.",
      eventType: "Birthday",
      pricePerPax: 550,
      minimumPax: 50,
      recommendedPax: 100,
      maximumPax: 150,
      serviceHours: 5,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Premium birthday setup with balloons",
        "Quality disposable utensils and plates",
        "Service staff (4 personnel)",
        "Food warmers and serving utensils",
        "Birthday cake table with special decoration",
        "Welcome drinks and iced tea",
        "Basic photo area",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "birthday-c",
      name: "Birthday Celebration - Deluxe",
      description:
        "A comprehensive birthday package for a memorable celebration.",
      eventType: "Birthday",
      pricePerPax: 650,
      minimumPax: 80,
      recommendedPax: 120,
      maximumPax: 160,
      serviceHours: 6,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 2 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Deluxe birthday setup with themed decorations",
        "Quality disposable utensils and plates",
        "Service staff (6 personnel)",
        "Food warmers and serving utensils",
        "Elaborate birthday cake table",
        "Welcome drinks and unlimited iced tea",
        "Dessert station",
        "Photo area with props",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "birthday-d",
      name: "Birthday Celebration - Ultimate",
      description:
        "The ultimate birthday package for an unforgettable celebration.",
      eventType: "Birthday",
      pricePerPax: 850,
      minimumPax: 100,
      recommendedPax: 150,
      maximumPax: 300,
      serviceHours: 8,
      options: [
        { category: "Soup", count: 2 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 2 },
        { category: "Pork", count: 2 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Vegetable", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 3 },
        { category: "Beverage", count: 3 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Ultimate birthday setup with premium decorations",
        "Fine dining utensils and plates",
        "Service staff (8 personnel)",
        "Food warmers and serving utensils",
        "Luxury birthday cake table",
        "Welcome cocktails and unlimited beverages",
        "Premium dessert station",
        "Professional photo area",
        "Live cooking station",
        "Ice cream station",
        "Basic entertainment coordination",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
  ],
  Wedding: [
    {
      id: "wedding-a",
      name: "Wedding Reception - Essential",
      description:
        "An essential wedding reception package for intimate celebrations.",
      eventType: "Wedding",
      pricePerPax: 550,
      minimumPax: 50,
      recommendedPax: 150,
      maximumPax: 300,
      serviceHours: 4,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 1 },
        { category: "Beverage", count: 1 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Basic wedding reception setup",
        "Quality disposable utensils and plates",
        "Service staff (4 personnel)",
        "Food warmers and serving utensils",
        "Cake table setup",
        "Welcome drinks",
        "Basic toast setup",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "wedding-b",
      name: "Wedding Reception - Classic",
      description:
        "A classic wedding reception package with enhanced offerings.",
      eventType: "Wedding",
      pricePerPax: 750,
      minimumPax: 80,
      recommendedPax: 120,
      maximumPax: 160,
      serviceHours: 5,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Classic wedding reception setup with basic floral arrangements",
        "Quality disposable utensils and plates",
        "Service staff (6 personnel)",
        "Food warmers and serving utensils",
        "Elegant cake table setup",
        "Welcome drinks and iced tea",
        "Toast setup with sparkling juice",
        "Basic couple's table decoration",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "wedding-c",
      name: "Wedding Reception - Elegant",
      description:
        "An elegant wedding reception package for a beautiful celebration.",
      eventType: "Wedding",
      pricePerPax: 950,
      minimumPax: 100,
      recommendedPax: 150,
      maximumPax: 200,
      serviceHours: 6,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 2 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Vegetable", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 3 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Elegant wedding reception setup with floral arrangements",
        "Fine dining utensils and plates",
        "Service staff (8 personnel)",
        "Food warmers and serving utensils",
        "Premium cake table setup",
        "Welcome cocktails and unlimited beverages",
        "Toast setup with sparkling wine",
        "Elegant couple's table decoration",
        "Dessert station",
        "Coffee and tea station",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "wedding-d",
      name: "Wedding Reception - Luxurious",
      description:
        "A luxurious wedding reception package for an unforgettable celebration.",
      eventType: "Wedding",
      pricePerPax: 1250,
      minimumPax: 150,
      recommendedPax: 220,
      maximumPax: 300,
      serviceHours: 8,
      options: [
        { category: "Soup", count: 2 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 2 },
        { category: "Pork", count: 2 },
        { category: "Beef", count: 2 },
        { category: "Seafood", count: 2 },
        { category: "Vegetable", count: 2 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 4 },
        { category: "Beverage", count: 3 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Luxurious wedding reception setup with premium floral arrangements",
        "Fine dining utensils and plates",
        "Service staff (12 personnel)",
        "Food warmers and serving utensils",
        "Luxury cake table setup",
        "Welcome champagne and unlimited premium beverages",
        "Toast setup with champagne",
        "Luxury couple's table decoration",
        "Premium dessert station",
        "Premium coffee and tea station",
        "Chocolate fountain",
        "Ice cream station",
        "Live cooking station",
        "Basic coordination with other vendors",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
  ],
  Corporate: [
    {
      id: "corporate-a",
      name: "Corporate Event - Basic",
      description:
        "A basic corporate event package suitable for meetings and small gatherings.",
      eventType: "Corporate",
      pricePerPax: 450,
      minimumPax: 30,
      recommendedPax: 45,
      maximumPax: 60,
      serviceHours: 4,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 1 },
        { category: "Beverage", count: 1 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Basic corporate setup",
        "Quality disposable utensils and plates",
        "Service staff (3 personnel)",
        "Food warmers and serving utensils",
        "Water station",
        "Basic coffee and tea station",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "corporate-b",
      name: "Corporate Event - Standard",
      description:
        "A standard corporate event package for professional gatherings.",
      eventType: "Corporate",
      pricePerPax: 550,
      minimumPax: 50,
      recommendedPax: 75,
      maximumPax: 100,
      serviceHours: 5,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Professional corporate setup",
        "Quality disposable utensils and plates",
        "Service staff (4 personnel)",
        "Food warmers and serving utensils",
        "Water station",
        "Coffee and tea station",
        "Light snacks during breaks",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "corporate-c",
      name: "Corporate Event - Executive",
      description:
        "An executive corporate event package for important business functions.",
      eventType: "Corporate",
      pricePerPax: 650,
      minimumPax: 80,
      recommendedPax: 120,
      maximumPax: 160,
      serviceHours: 6,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Executive corporate setup",
        "Fine dining utensils and plates",
        "Service staff (6 personnel)",
        "Food warmers and serving utensils",
        "Water station with lemon",
        "Premium coffee and tea station",
        "Morning and afternoon snacks",
        "Dessert station",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "corporate-d",
      name: "Corporate Event - Premium",
      description:
        "A premium corporate event package for high-profile business functions.",
      eventType: "Corporate",
      pricePerPax: 850,
      minimumPax: 100,
      recommendedPax: 150,
      maximumPax: 200,
      serviceHours: 8,
      options: [
        { category: "Soup", count: 2 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 2 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Vegetable", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 3 },
        { category: "Beverage", count: 3 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Premium corporate setup with branding options",
        "Fine dining utensils and plates",
        "Service staff (8 personnel)",
        "Food warmers and serving utensils",
        "Infused water station",
        "Premium coffee and tea station",
        "Gourmet morning and afternoon snacks",
        "Premium dessert station",
        "Fruit and cheese station",
        "Basic technical support",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
  ],
  Graduation: [
    {
      id: "graduation-a",
      name: "Graduation Celebration - Basic",
      description:
        "A basic graduation celebration package for the new graduate.",
      eventType: "Graduation",
      pricePerPax: 400,
      minimumPax: 30,
      recommendedPax: 45,
      maximumPax: 60,
      serviceHours: 4,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 1 },
        { category: "Beverage", count: 1 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Basic graduation setup",
        "Quality disposable utensils and plates",
        "Service staff (3 personnel)",
        "Food warmers and serving utensils",
        "Graduation cake table setup",
        "Welcome drinks",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "graduation-b",
      name: "Graduation Celebration - Standard",
      description:
        "A standard graduation celebration package for a memorable achievement.",
      eventType: "Graduation",
      pricePerPax: 500,
      minimumPax: 50,
      recommendedPax: 75,
      maximumPax: 100,
      serviceHours: 5,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 1 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Standard graduation setup with basic decorations",
        "Quality disposable utensils and plates",
        "Service staff (4 personnel)",
        "Food warmers and serving utensils",
        "Graduation cake table with special decoration",
        "Welcome drinks and iced tea",
        "Basic photo area",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "graduation-c",
      name: "Graduation Celebration - Deluxe",
      description:
        "A deluxe graduation celebration package for an important milestone.",
      eventType: "Graduation",
      pricePerPax: 600,
      minimumPax: 80,
      recommendedPax: 120,
      maximumPax: 160,
      serviceHours: 6,
      options: [
        { category: "Soup", count: 1 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 1 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 2 },
        { category: "Beverage", count: 2 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Deluxe graduation setup with themed decorations",
        "Quality disposable utensils and plates",
        "Service staff (6 personnel)",
        "Food warmers and serving utensils",
        "Elaborate graduation cake table",
        "Welcome drinks and unlimited iced tea",
        "Dessert station",
        "Photo area with props",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
    {
      id: "graduation-d",
      name: "Graduation Celebration - Premium",
      description:
        "A premium graduation celebration package for an unforgettable achievement.",
      eventType: "Graduation",
      pricePerPax: 750,
      minimumPax: 100,
      recommendedPax: 150,
      maximumPax: 200,
      serviceHours: 8,
      options: [
        { category: "Soup", count: 2 },
        { category: "Salad", count: 2 },
        { category: "Chicken", count: 2 },
        { category: "Pork", count: 1 },
        { category: "Beef", count: 1 },
        { category: "Seafood", count: 1 },
        { category: "Vegetable", count: 1 },
        { category: "Noodle", count: 1 },
        { category: "Dessert", count: 3 },
        { category: "Beverage", count: 3 },
      ],
      inclusions: [
        "Unlimited steamed rice",
        "Premium graduation setup with elegant decorations",
        "Fine dining utensils and plates",
        "Service staff (8 personnel)",
        "Food warmers and serving utensils",
        "Luxury graduation cake table",
        "Welcome cocktails and unlimited beverages",
        "Premium dessert station",
        "Professional photo area",
        "Live cooking station",
        "Basic entertainment coordination",
      ],
      imageUrl: "/placeholder.svg?height=300&width=400",
      rating: 4.5,
      ratingCount: 200,
    },
  ],
};

// Define event types
export const eventTypes: EventType[] = [
  "Birthday",
  "Wedding",
  "Corporate",
  "Graduation",
];

// Custom Package Form Steps
export const formSteps: FormStepType[] = [
  {
    id: "customer-info",
    title: "Customer Information",
    description: "Please provide your contact details",
  },
  {
    id: "event-details",
    title: "Event Details",
    description: "Tell us about your event",
  },
  {
    id: "menu-selection",
    title: "Menu Selection",
    description: "Choose your preferred dishes",
  },
  {
    id: "review",
    title: "Review",
    description: "Review your custom package",
  },
];

// Booking steps
export const bookingSteps: FormStepType[] = [
  {
    id: "customer-info",
    title: "Customer Information",
    description: "Please provide your contact details",
  },
  {
    id: "event-details",
    title: "Event Details",
    description: "Tell us about your event",
  },
  {
    id: "package-selection",
    title: "Package Selection",
    description: "Review your selected package and add any special requests",
  },
  {
    id: "review",
    title: "Review",
    description: "Review your booking details",
  },
];
