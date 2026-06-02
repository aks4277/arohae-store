"use client";

import { ArrowUpRight, ArrowDownRight, DollarSign, ShoppingBag, Users, Activity, CreditCard } from "lucide-react";

export default function AdminDashboard() {
  const recentOrders = [
    { id: '5001', cust: 'Priya Sharma', stat: 'Processing', amt: '12,499' },
    { id: '5002', cust: 'Rahul Verma', stat: 'Shipped', amt: '4,999' },
    { id: '5003', cust: 'Anita Desai', stat: 'Delivered', amt: '24,500' },
    { id: '5004', cust: 'Vikram Singh', stat: 'Processing', amt: '8,999' },
    { id: '5005', cust: 'Meera Patel', stat: 'Shipped', amt: '15,999' },
  ];

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer", "Status", "Amount"];
    const csvContent = [
      headers.join(","),
      ...recentOrders.map(o => `${o.id},"${o.cust}",${o.stat},"${o.amt}"`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "recent_transactions.csv";
    link.click();
  };

  const metrics = [
    { title: "Total Revenue", value: "₹24,56,890", trend: "+12.5%", isPositive: true, icon: DollarSign },
    { title: "Active Orders", value: "142", trend: "+5.2%", isPositive: true, icon: ShoppingBag },
    { title: "New Customers", value: "845", trend: "-2.1%", isPositive: false, icon: Users },
    { title: "Conversion Rate", value: "3.2%", trend: "+1.1%", isPositive: true, icon: Activity },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-stone-500 mt-1">Welcome back. Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-stone-200 text-sm font-medium text-stone-700 py-2 pl-4 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-[#947156]/20 shadow-sm appearance-none cursor-pointer">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={metric.title} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 translate-x-4 -translate-y-4">
              <metric.icon className="w-24 h-24 text-[#947156]" />
            </div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="p-2.5 bg-[#947156]/10 text-[#947156] rounded-lg shadow-sm border border-[#947156]/10">
                <metric.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center px-2 py-1 rounded-md text-xs font-semibold ${metric.isPositive ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                {metric.isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {metric.trend}
              </div>
            </div>
            <div className="relative z-10 space-y-1">
              <h3 className="text-sm font-medium text-stone-500">{metric.title}</h3>
              <div className="text-3xl font-semibold text-stone-900 tracking-tight">{metric.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-stone-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Recent Transactions</h2>
            <div className="flex gap-3">
              <button onClick={handleExportCSV} className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">Export CSV</button>
              <button className="text-sm font-medium text-[#947156] hover:text-stone-900 transition-colors">View all</button>
            </div>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-50/50">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-stone-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs font-semibold text-[#947156]">#ORD-{order.id}</div>
                      <div className="text-xs text-stone-400 mt-0.5">Oct {24-i}, 2023</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900 flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center text-xs font-bold shrink-0">{order.cust.charAt(0)}</div>
                      {order.cust}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        order.stat === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        order.stat === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {order.stat}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-stone-900 text-right">₹{order.amt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900 tracking-tight">Top Sellers</h2>
            <button className="p-2 hover:bg-stone-50 rounded-md transition-colors text-stone-400"><Activity className="w-4 h-4"/></button>
          </div>
          <div className="p-6 space-y-6 flex-1">
            {[
              { name: 'Embroidered Silk Blend Kurta', sales: 142, revenue: '9,93,858', img: '/images/products/tunic_2_1780252716722.png' },
              { name: 'Festive Zari Lehenga', sales: 98, revenue: '14,21,000', img: '/images/products/trousers_1780252755043.png' },
              { name: 'Kundan Choker Set', sales: 85, revenue: '3,82,500', img: '/images/products/earrings_1780252782529.png' },
              { name: 'Minimalist Tote', sales: 64, revenue: '1,56,800', img: '/images/products/tote_1780252769115.png' }
            ].map((prod, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-14 h-14 bg-stone-100 rounded-lg overflow-hidden shrink-0 border border-stone-200 shadow-sm">
                  <img src={prod.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 truncate group-hover:text-[#947156] transition-colors">{prod.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">{prod.sales} Sales</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-stone-900 text-right">₹{prod.revenue}</div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-stone-100 text-center">
            <button className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">View Inventory Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
