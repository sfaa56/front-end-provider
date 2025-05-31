import Cards from "./Cards";
import OrderGrowthChart from "./OrderGrowthChart";
import UserGrowthChart from "./UserGrowthChart";

export default function Page() {
  return (
    <div className="flex flex-col px-6">
      <p className="text-xl">welcome, Amen</p>
      <h1 className="text-md mb-4 text-gray-500">Overview</h1>
      <Cards />
      <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <UserGrowthChart />
        <OrderGrowthChart />
        {/* يمكنك إضافة المزيد من المكونات هنا */}
      </div>
    </div>
  );
}
