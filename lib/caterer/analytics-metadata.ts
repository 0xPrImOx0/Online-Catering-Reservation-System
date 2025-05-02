import { cateringPackages } from "../customer/packages-metadata";
import { menuItems } from "../menu-lists";

// Sample data for chart

export type chartDataType = {
  month: string;
  value: number;
};

const chartData: chartDataType[] = [
  { month: "Jan", value: 38 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 45 },
  { month: "Apr", value: 78 },
  { month: "May", value: 90 },
  { month: "Jun", value: 85 },
  { month: "Jul", value: 92 },
];

// Sample data for trending packages
export type trendingPackagesType = {
  id: number;
  name: string;
  eventType?: string;
  price: number;
  sales: number;
  percentChange: number;
  image?: string;
};

const trendingPackages: trendingPackagesType[] = [
  {
    id: 1,
    name: cateringPackages[0].name,
    eventType: cateringPackages[0].eventType,
    price: cateringPackages[0].pricePerPax,
    sales: 524,
    percentChange: 12,
    image: cateringPackages[0].imageUrl,
  },
  {
    id: 2,
    name: cateringPackages[1].name,
    eventType: cateringPackages[1].eventType,
    price: cateringPackages[1].pricePerPax,
    sales: 224,
    percentChange: 12,
    image: cateringPackages[1].imageUrl,
  },
  {
    id: 3,
    name: cateringPackages[2].name,
    eventType: cateringPackages[2].eventType,
    price: cateringPackages[2].pricePerPax,
    sales: 124,
    percentChange: 12,
    image: cateringPackages[2].imageUrl,
  },
  {
    id: 4,
    name: cateringPackages[3].name,
    eventType: cateringPackages[3].eventType,
    price: cateringPackages[3].pricePerPax,
    sales: 104,
    percentChange: 12,
    image: cateringPackages[3].imageUrl,
  },
];

// Sample data for most favorite dishes
export type favoriteMenuType = {
  id: number;
  name: string;
  image?: string;
  likes: number;
  rating: number;
};

// Function to get top 4 menu items by rating
const getTopRatedMenus = (): favoriteMenuType[] => {
  return menuItems
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4)
    .map((item, index) => ({
      id: index + 1,
      name: item.name,
      image: item.imageUrl,
      likes: item.ratingCount,
      rating: item.rating,
    }));
};

// Assign top rated menus to favoriteMenus
const favoriteMenus: favoriteMenuType[] = getTopRatedMenus();

// Sample data for most selling dishes
export type mostSellingMenusType = {
  id: number;
  name: string;
  category: string;
  price: number;
  image?: string;
  servesFor: string;
  ratingCount: number;
};

// Function to get top selling menu items by rating count
const getTopSellingMenus = (): mostSellingMenusType[] => {
  return menuItems
    .sort((a, b) => b.ratingCount - a.ratingCount)
    .slice(0, 4)
    .map((item, index) => ({
      id: index + 1,
      name: item.name,
      category: item.category,
      price: item.regularPricePerPax || 0,
      image: item.imageUrl,
      servesFor: `${item.prices?.[0]?.minimumPax || 4} Person`,
      ratingCount: item.ratingCount,
    }));
};

// Assign top selling menus to mostSellingMenus
const mostSellingMenus: mostSellingMenusType[] = getTopSellingMenus();

export { chartData, trendingPackages, favoriteMenus, mostSellingMenus };
