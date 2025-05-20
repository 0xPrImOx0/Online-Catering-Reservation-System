import Image from "next/image";
import { favoriteMenuType } from "@/lib/caterer/analytics-metadata";
import { RenderStarRatings } from "../CustomStarRating";

interface MostFavoritesItemsProps {
  favoriteMenus: favoriteMenuType[];
  formatNumber: (num: number) => string;
}

export default function MostFavoritesItems({
  favoriteMenus,
  formatNumber,
}: MostFavoritesItemsProps) {
  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Most Favorites Items</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {favoriteMenus.map((menu) => (
          <div key={menu.id} className="overflow-hidden rounded-lg border">
            <div className="relative w-full h-40">
              <Image
                src={menu.image || "/placeholder.svg"}
                alt={menu.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="mb-2 font-medium">{menu.name}</h3>
              <div className="flex justify-between items-center">
                <div className="flex">{RenderStarRatings(menu.rating, 'small')}</div>
                <div className="flex items-center text-indigo-600">
                  <svg
                    className="mr-1 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  <span>{formatNumber(menu.likes)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
