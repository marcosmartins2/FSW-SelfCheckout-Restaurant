import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantHeader from "./components/header";

type props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
};

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({ params, searchParams }: props) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantBySlug(slug);

  if (!isConsumptionMethodValid(consumptionMethod) || !restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
