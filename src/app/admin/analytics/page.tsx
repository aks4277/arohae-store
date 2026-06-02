import { BarChart3, TrendingUp, Users, ShoppingBag } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-stone-900">Analytics & Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
          <div className="w-16 h-16 bg-[#947156]/10 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#947156]" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Revenue Tracking</h3>
            <p className="text-sm text-stone-500 mt-1 max-w-sm">Detailed revenue charting and cohort analysis will appear here once connected to the live API.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[300px]">
          <div className="w-16 h-16 bg-[#947156]/10 rounded-full flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-[#947156]" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-stone-900">Sales by Category</h3>
            <p className="text-sm text-stone-500 mt-1 max-w-sm">Visual breakdowns of top performing categories and product lines.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
