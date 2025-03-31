import type {
  CateringPackageProps,
  CateringPackagesProps,
  EventType,
  FormStepType,
} from "@/types/package-types";

export const cateringPackages: CateringPackagesProps[] = [
  {
    name: "Set A - Basic Feast",
    description:
      "A simple yet satisfying selection of Filipino favorites for small gatherings.",
    available: true,
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
      { typeOfCustomer: "Both", includes: "Basic table setup" },
      { typeOfCustomer: "Both", includes: "Disposable utensils and plates" },
      { typeOfCustomer: "Both", includes: "Service staff (2 personnel)" },
      { typeOfCustomer: "Both", includes: "Food warmers and serving utensils" },
      { typeOfCustomer: "Plated", includes: "4 hours of table service" },
      { typeOfCustomer: "Plated", includes: "Professional waitstaff" },
      { typeOfCustomer: "Plated", includes: "Table-side service" },
      { typeOfCustomer: "Plated", includes: "Course-by-course serving" },
    ],
    imageUrl:
      "https://foodtray2go.com/wp-content/uploads/2022/09/image6-1024x764.jpg",
    rating: 4.5,
    ratingCount: 200,
    packageType: "BuffetPlated",
    eventType: undefined,
    serviceHours: 4,
    serviceCharge: 100,
    reviews: [],
  },
  {
    name: "Set B - Family Celebration",
    description:
      "A hearty selection of dishes perfect for family celebrations and small parties.",
    available: true,
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
      { typeOfCustomer: "Both", includes: "Enhanced table setup" },
      { typeOfCustomer: "Both", includes: "Disposable utensils and plates" },
      { typeOfCustomer: "Both", includes: "Service staff (3 personnel)" },
      { typeOfCustomer: "Both", includes: "Food warmers and serving utensils" },
      { typeOfCustomer: "Both", includes: "Basic dessert station" },
      { typeOfCustomer: "Plated", includes: "4.5 hours of table service" },
      { typeOfCustomer: "Plated", includes: "Professional waitstaff" },
      { typeOfCustomer: "Plated", includes: "Table-side service" },
      { typeOfCustomer: "Plated", includes: "Course-by-course serving" },
    ],
    imageUrl:
      "https://thesmartlocal.ph/wp-content/uploads/2020/04/kaintayo.jpg",
    rating: 4.5,
    ratingCount: 200,
    packageType: "BuffetPlated",
    eventType: undefined,
    serviceHours: 4.5,
    serviceCharge: 100,
    reviews: [],
  },
  {
    name: "Set C - Fiesta Favorites",
    description:
      "A complete Filipino fiesta experience with a wide variety of traditional dishes.",
    available: true,
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
      { typeOfCustomer: "Both", includes: "Premium table setup" },
      {
        typeOfCustomer: "Both",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Both", includes: "Service staff (4 personnel)" },
      { typeOfCustomer: "Both", includes: "Food warmers and serving utensils" },
      { typeOfCustomer: "Both", includes: "Dessert station with 2 options" },
      { typeOfCustomer: "Both", includes: "Welcome drinks" },
      { typeOfCustomer: "Plated", includes: "5 hours of table service" },
      { typeOfCustomer: "Plated", includes: "Professional waitstaff" },
      { typeOfCustomer: "Plated", includes: "Table-side service" },
      { typeOfCustomer: "Plated", includes: "Course-by-course serving" },
    ],
    imageUrl:
      "https://philippinetourismusa.com/wp-content/uploads/2019/09/pinoy-heritage-kamayan-IMG_6193.jpg",
    rating: 4.5,
    ratingCount: 200,
    packageType: "BuffetPlated",
    eventType: undefined,

    serviceHours: 5,
    serviceCharge: 100,
    reviews: [],
  },
  {
    name: "Set D - Premium Celebration",
    description:
      "An elevated dining experience featuring premium Filipino dishes for special occasions.",
    available: true,
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
      {
        typeOfCustomer: "Both",
        includes: "Elegant table setup with centerpieces",
      },
      {
        typeOfCustomer: "Both",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Both", includes: "Service staff (5 personnel)" },
      { typeOfCustomer: "Both", includes: "Food warmers and serving utensils" },
      { typeOfCustomer: "Both", includes: "Dessert station with 3 options" },
      { typeOfCustomer: "Both", includes: "Welcome drinks and iced tea" },
      { typeOfCustomer: "Both", includes: "Basic coffee station" },
      { typeOfCustomer: "Plated", includes: "5.5 hours of table service" },
      { typeOfCustomer: "Plated", includes: "Professional waitstaff" },
      { typeOfCustomer: "Plated", includes: "Table-side service" },
      { typeOfCustomer: "Plated", includes: "Course-by-course serving" },
    ],
    imageUrl:
      "https://juancarlo.ph/wp-content/uploads/2023/03/Private-Catering-Packages.jpg",
    rating: 4.5,
    ratingCount: 200,
    packageType: "BuffetPlated",
    eventType: undefined,
    serviceHours: 5.5,
    serviceCharge: 100,
  },
  {
    name: "Set E - Grand Feast",
    description:
      "A grand Filipino feast featuring a comprehensive selection of dishes for large celebrations.",
    available: true,
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
      {
        typeOfCustomer: "Both",
        includes: "Premium table setup with floral arrangements",
      },
      {
        typeOfCustomer: "Both",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Both", includes: "Service staff (7 personnel)" },
      { typeOfCustomer: "Both", includes: "Food warmers and serving utensils" },
      { typeOfCustomer: "Both", includes: "Dessert station with 4 options" },
      {
        typeOfCustomer: "Both",
        includes: "Welcome drinks and unlimited iced tea",
      },
      { typeOfCustomer: "Both", includes: "Coffee and tea station" },
      { typeOfCustomer: "Both", includes: "Fruit station" },

      { typeOfCustomer: "Both", includes: "6 hours of table service" },
      { typeOfCustomer: "Both", includes: "Professional waitstaff" },
      { typeOfCustomer: "Both", includes: "Table-side service" },
      { typeOfCustomer: "Both", includes: "Course-by-course serving" },
    ],
    imageUrl:
      "https://riverineplace.com/wp-content/uploads/2024/09/A-hotels-buffet-style-type-of-catering-service.jpg",
    rating: 4.5,
    ratingCount: 200,
    packageType: "BuffetPlated",
    eventType: undefined,

    serviceHours: 6,
    serviceCharge: 100,
    reviews: [],
  },
  {
    name: "Set F - Royal Filipino Banquet",
    description:
      "The ultimate Filipino banquet experience featuring our finest dishes and premium service.",
    available: true,
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
      {
        typeOfCustomer: "Both",
        includes: "Luxury table setup with premium decorations",
      },
      { typeOfCustomer: "Both", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Both", includes: "Service staff (10 personnel)" },
      { typeOfCustomer: "Both", includes: "Food warmers and serving utensils" },
      {
        typeOfCustomer: "Both",
        includes: "Premium dessert station with 5 options",
      },
      {
        typeOfCustomer: "Both",
        includes: "Welcome cocktails and unlimited beverages",
      },
      { typeOfCustomer: "Both", includes: "Premium coffee and tea station" },
      { typeOfCustomer: "Both", includes: "Fruit and cheese station" },
      { typeOfCustomer: "Both", includes: "Live cooking station" },
      { typeOfCustomer: "Both", includes: "Ice cream station" },
      { typeOfCustomer: "Plated", includes: "6.5 hours of table service" },
      { typeOfCustomer: "Plated", includes: "Table-side service" },
      { typeOfCustomer: "Plated", includes: "Course-by-course serving" },
    ],
    imageUrl: "https://maviscatering.com/img/bg-img/3.jpg",
    rating: 4.5,
    ratingCount: 200,
    packageType: "BuffetPlated",
    eventType: undefined,

    serviceHours: 6.5,
    serviceCharge: 100,
    reviews: [],
  },
  //Birthday
  {
    name: "Birthday Celebration - Basic",
    description: "A fun and festive package perfect for birthday celebrations.",
    available: true,
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      { typeOfCustomer: "Buffet", includes: "Basic birthday setup" },
      { typeOfCustomer: "Buffet", includes: "Disposable utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (3 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Birthday cake table setup" },
      { typeOfCustomer: "Buffet", includes: "Welcome drinks" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
    packageType: "Event",
  },
  {
    name: "Birthday Celebration - Premium",
    description:
      "An enhanced birthday package with more food options and better service.",
    available: true,
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Premium birthday setup with balloons",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (4 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Birthday cake table with special decoration",
      },
      { typeOfCustomer: "Buffet", includes: "Welcome drinks and iced tea" },
      { typeOfCustomer: "Buffet", includes: "Basic photo area" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
    packageType: "Event",
  },
  {
    name: "Birthday Celebration - Deluxe",
    description:
      "A comprehensive birthday package for a memorable celebration.",
    available: true,
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Deluxe birthday setup with themed decorations",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (6 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Elaborate birthday cake table" },
      {
        typeOfCustomer: "Buffet",
        includes: "Welcome drinks and unlimited iced tea",
      },
      { typeOfCustomer: "Buffet", includes: "Dessert station" },
      { typeOfCustomer: "Buffet", includes: "Photo area with props" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
    packageType: "Event",
  },
  {
    name: "Birthday Celebration - Ultimate",
    description:
      "The ultimate birthday package for an unforgettable celebration.",
    available: true,
    eventType: "Birthday",
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Ultimate birthday setup with premium decorations",
      },
      { typeOfCustomer: "Buffet", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (8 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Luxury birthday cake table" },
      {
        typeOfCustomer: "Buffet",
        includes: "Welcome cocktails and unlimited beverages",
      },
      { typeOfCustomer: "Buffet", includes: "Premium dessert station" },
      { typeOfCustomer: "Buffet", includes: "Professional photo area" },
      { typeOfCustomer: "Buffet", includes: "Live cooking station" },
      { typeOfCustomer: "Buffet", includes: "Ice cream station" },
      { typeOfCustomer: "Buffet", includes: "Basic entertainment coordination" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  //Wedding
  {
    name: "Wedding Reception - Essential",
    description:
      "An essential wedding reception package for intimate celebrations.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      { typeOfCustomer: "Buffet", includes: "Basic wedding reception setup" },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (4 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Cake table setup" },
      { typeOfCustomer: "Buffet", includes: "Welcome drinks" },
      { typeOfCustomer: "Buffet", includes: "Basic toast setup" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Wedding Reception - Classic",
    description: "A classic wedding reception package with enhanced offerings.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes:
          "Classic wedding reception setup with basic floral arrangements",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (6 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Elegant cake table setup" },
      { typeOfCustomer: "Buffet", includes: "Welcome drinks and iced tea" },
      { typeOfCustomer: "Buffet", includes: "Toast setup with sparkling juice" },
      { typeOfCustomer: "Buffet", includes: "Basic couple's table decoration" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Wedding Reception - Elegant",
    description:
      "An elegant wedding reception package for a beautiful celebration.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Elegant wedding reception setup with floral arrangements",
      },
      { typeOfCustomer: "Buffet", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (8 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Premium cake table setup" },
      {
        typeOfCustomer: "Buffet",
        includes: "Welcome cocktails and unlimited beverages",
      },
      { typeOfCustomer: "Buffet", includes: "Toast setup with sparkling wine" },
      {
        typeOfCustomer: "Buffet",
        includes: "Elegant couple's table decoration",
      },
      { typeOfCustomer: "Buffet", includes: "Dessert station" },
      { typeOfCustomer: "Buffet", includes: "Coffee and tea station" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Wedding Reception - Luxurious",
    description:
      "A luxurious wedding reception package for an unforgettable celebration.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes:
          "Luxurious wedding reception setup with premium floral arrangements",
      },
      { typeOfCustomer: "Buffet", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (12 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Luxury cake table setup" },
      {
        typeOfCustomer: "Buffet",
        includes: "Welcome champagne and unlimited premium beverages",
      },
      { typeOfCustomer: "Buffet", includes: "Toast setup with champagne" },
      { typeOfCustomer: "Buffet", includes: "Luxury couple's table decoration" },
      { typeOfCustomer: "Buffet", includes: "Premium dessert station" },
      { typeOfCustomer: "Buffet", includes: "Premium coffee and tea station" },
      { typeOfCustomer: "Buffet", includes: "Chocolate fountain" },
      { typeOfCustomer: "Buffet", includes: "Ice cream station" },
      { typeOfCustomer: "Buffet", includes: "Live cooking station" },
      {
        typeOfCustomer: "Buffet",
        includes: "Basic coordination with other vendors",
      },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },

  //Corporate
  {
    name: "Corporate Event - Basic",
    description:
      "A basic corporate event package suitable for meetings and small gatherings.",
    packageType: "Event",
    available: true,
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      { typeOfCustomer: "Buffet", includes: "Basic corporate setup" },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (3 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Water station" },
      { typeOfCustomer: "Buffet", includes: "Basic coffee and tea station" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Corporate Event - Standard",
    description:
      "A standard corporate event package for professional gatherings.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      { typeOfCustomer: "Buffet", includes: "Professional corporate setup" },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (4 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Water station" },
      { typeOfCustomer: "Buffet", includes: "Coffee and tea station" },
      { typeOfCustomer: "Buffet", includes: "Light snacks during breaks" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Corporate Event - Executive",
    description:
      "An executive corporate event package for important business functions.",
    packageType: "Event",
    available: true,
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      { typeOfCustomer: "Buffet", includes: "Executive corporate setup" },
      { typeOfCustomer: "Buffet", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (6 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Water station with lemon" },
      { typeOfCustomer: "Buffet", includes: "Premium coffee and tea station" },
      { typeOfCustomer: "Buffet", includes: "Morning and afternoon snacks" },
      { typeOfCustomer: "Buffet", includes: "Dessert station" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Corporate Event - Premium",
    description:
      "A premium corporate event package for high-profile business functions.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Premium corporate setup with branding options",
      },
      { typeOfCustomer: "Buffet", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (8 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Infused water station" },
      { typeOfCustomer: "Buffet", includes: "Premium coffee and tea station" },
      {
        typeOfCustomer: "Buffet",
        includes: "Gourmet morning and afternoon snacks",
      },
      { typeOfCustomer: "Buffet", includes: "Premium dessert station" },
      { typeOfCustomer: "Buffet", includes: "Fruit and cheese station" },
      { typeOfCustomer: "Buffet", includes: "Basic technical support" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  //Graduation
  {
    name: "Graduation Celebration - Basic",
    description: "A basic graduation celebration package for the new graduate.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      { typeOfCustomer: "Buffet", includes: "Basic graduation setup" },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (3 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Graduation cake table setup" },
      { typeOfCustomer: "Buffet", includes: "Welcome drinks" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Graduation Celebration - Standard",
    description:
      "A standard graduation celebration package for a memorable achievement.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Standard graduation setup with basic decorations",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (4 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Graduation cake table with special decoration",
      },
      { typeOfCustomer: "Buffet", includes: "Welcome drinks and iced tea" },
      { typeOfCustomer: "Buffet", includes: "Basic photo area" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Graduation Celebration - Deluxe",
    description:
      "A deluxe graduation celebration package for an important milestone.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Deluxe graduation setup with themed decorations",
      },
      {
        typeOfCustomer: "Buffet",
        includes: "Quality disposable utensils and plates",
      },
      { typeOfCustomer: "Buffet", includes: "Service staff (6 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Elaborate graduation cake table" },
      {
        typeOfCustomer: "Buffet",
        includes: "Welcome drinks and unlimited iced tea",
      },
      { typeOfCustomer: "Buffet", includes: "Dessert station" },
      { typeOfCustomer: "Buffet", includes: "Photo area with props" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
  {
    name: "Graduation Celebration - Premium",
    description:
      "A premium graduation celebration package for an unforgettable achievement.",
    available: true,
    packageType: "Event",
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
      { typeOfCustomer: "Buffet", includes: "Unlimited steamed rice" },
      {
        typeOfCustomer: "Buffet",
        includes: "Premium graduation setup with elegant decorations",
      },
      { typeOfCustomer: "Buffet", includes: "Fine dining utensils and plates" },
      { typeOfCustomer: "Buffet", includes: "Service staff (8 personnel)" },
      {
        typeOfCustomer: "Buffet",
        includes: "Food warmers and serving utensils",
      },
      { typeOfCustomer: "Buffet", includes: "Luxury graduation cake table" },
      {
        typeOfCustomer: "Buffet",
        includes: "Welcome cocktails and unlimited beverages",
      },
      { typeOfCustomer: "Buffet", includes: "Premium dessert station" },
      { typeOfCustomer: "Buffet", includes: "Professional photo area" },
      { typeOfCustomer: "Buffet", includes: "Live cooking station" },
      { typeOfCustomer: "Buffet", includes: "Basic entertainment coordination" },
    ],
    imageUrl: "/placeholder.svg?height=300&width=400",
    rating: 4.5,
    ratingCount: 200,
  },
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
