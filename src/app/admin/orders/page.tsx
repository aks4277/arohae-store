"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, Package, Truck, CheckCircle2, AlertCircle, LayoutList, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminOrders() {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const orders = [
    { id: "ORD-94302", customer: "Priya Sharma", date: "Today, 10:42 AM", total: 10498, items: 2, status: "Unfulfilled", payment: "Paid", priority: "High" },
    { id: "ORD-89211", customer: "Rahul Verma", date: "Yesterday, 3:15 PM", total: 24500, items: 1, status: "Processing", payment: "Paid", priority: "Normal" },
    { id: "ORD-75409", customer: "Anita Desai", date: "Oct 22, 2026", total: 6999, items: 1, status: "Shipped", payment: "Paid", priority: "Normal" },
    { id: "ORD-75408", customer: "Vikram Singh", date: "Oct 21, 2026", total: 8999, items: 2, status: "Delivered", payment: "Paid", priority: "Normal" },
    { id: "ORD-75407", customer: "Meera Patel", date: "Oct 21, 2026", total: 15999, items: 3, status: "Unfulfilled", payment: "Pending", priority: "High" },
  ];

  const columns = [
    { id: "Unfulfilled", title: "Unfulfilled", icon: Package, color: "bg-red-50 text-red-700 border-red-200" },
    { id: "Processing", title: "Processing", icon: AlertCircle, color: "bg-orange-50 text-orange-700 border-orange-200" },
    { id: "Shipped", title: "Shipped", icon: Truck, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { id: "Delivered", title: "Delivered", icon: CheckCircle2, color: "bg-green-50 text-green-700 border-green-200" },
  ];

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) setSelectedOrders([]);
    else setSelectedOrders(orders.map(o => o.id));
  };

  const toggleSelect = (id: string) => {
    if (selectedOrders.includes(id)) setSelectedOrders(prev => prev.filter(item => item !== id));
    else setSelectedOrders(prev => [...prev, id]);
  };

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer", "Date", "Total", "Items", "Status", "Payment", "Priority"];
    const csvContent = [
      headers.join(","),
      ...filteredOrders.map(o => `${o.id},"${o.customer}","${o.date}",${o.total},${o.items},${o.status},${o.payment},${o.priority}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "orders_export.csv";
    link.click();
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Simulated import of ${e.target.files[0].name} successful.`);
    }
  };

  return (
    <div className="space-y-6 relative h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">Orders</h1>
          <p className="text-sm text-stone-500 mt-1">Manage fulfillment and track shipments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-stone-100 p-1 rounded-md flex items-center border border-stone-200">
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-1.5 rounded text-sm transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('kanban')} 
              className={`p-1.5 rounded text-sm transition-colors ${viewMode === 'kanban' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <label className="cursor-pointer">
            <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 border border-stone-200 bg-white hover:bg-stone-100 hover:text-stone-900 h-9 px-4 py-2 gap-2 shadow-sm">
              Import CSV
            </div>
          </label>
          <Button variant="outline" className="gap-2 shadow-sm bg-white border-stone-200" onClick={handleExportCSV}>Export CSV</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden flex-1 flex flex-col min-h-[600px]">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by order ID or customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-sm"><Filter className="w-4 h-4" /> Status</Button>
            <Button variant="outline" size="sm" className="gap-2 bg-white hover:bg-stone-50 text-stone-700 border-stone-200 shadow-sm">Payment</Button>
          </div>
        </div>

        {selectedOrders.length > 0 && viewMode === 'list' && (
          <div className="bg-[#947156]/10 px-4 py-3 flex items-center justify-between border-b border-[#947156]/20">
            <span className="text-sm font-semibold text-[#947156]">{selectedOrders.length} orders selected</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white hover:text-[#947156] border-[#947156]/20 shadow-sm text-xs h-8">Mark as Fulfilled</Button>
              <Button variant="outline" size="sm" className="bg-white hover:text-[#947156] border-[#947156]/20 shadow-sm text-xs h-8">Print Packing Slips</Button>
            </div>
          </div>
        )}

        {viewMode === 'list' ? (
          /* List View */
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-stone-500 uppercase bg-stone-50/80 border-b border-stone-200 sticky top-0">
                <tr>
                  <th className="px-6 py-4 w-10">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-stone-300 text-[#947156] focus:ring-[#947156]"
                    />
                  </th>
                  <th className="px-6 py-4 font-medium tracking-wider">Order</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Date</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Total</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Payment</th>
                  <th className="px-6 py-4 font-medium tracking-wider">Fulfillment</th>
                  <th className="px-6 py-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className={`hover:bg-stone-50/80 transition-colors group cursor-pointer ${selectedOrders.includes(order.id) ? 'bg-[#947156]/5' : ''}`}>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        className="w-4 h-4 rounded border-stone-300 text-[#947156] focus:ring-[#947156]"
                      />
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-[#947156]">{order.id}</td>
                    <td className="px-6 py-4 text-stone-500">{order.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-stone-900">{order.customer}</div>
                      <div className="text-xs text-stone-500">{order.items} {order.items === 1 ? 'item' : 'items'}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900" suppressHydrationWarning>₹{order.total.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${order.payment === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-stone-400 hover:text-stone-900 rounded-md transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Kanban View */
          <div className="flex-1 flex overflow-x-auto p-6 gap-6 bg-stone-50/30">
            {columns.map(col => {
              const colOrders = filteredOrders.filter(o => o.status === col.id);
              
              return (
                <div key={col.id} className="w-[300px] shrink-0 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                      <col.icon className="w-4 h-4 text-stone-400" />
                      {col.title}
                    </h3>
                    <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">{colOrders.length}</span>
                  </div>
                  
                  <div className="flex-1 rounded-xl p-2 bg-stone-100/50 border border-stone-200/50 space-y-3 min-h-[200px]">
                    <AnimatePresence>
                      {colOrders.map(order => (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          key={order.id} 
                          className="bg-white p-4 rounded-lg border border-stone-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-[#947156]/30 transition-colors group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-xs font-bold text-[#947156]">{order.id}</span>
                            {order.priority === 'High' && (
                              <span className="w-2 h-2 rounded-full bg-red-500" title="High Priority" />
                            )}
                          </div>
                          <p className="font-semibold text-sm text-stone-900 mb-1">{order.customer}</p>
                          <div className="flex justify-between items-center text-xs text-stone-500 mb-3">
                            <span>{order.items} items</span>
                            <span suppressHydrationWarning>₹{order.total.toLocaleString('en-IN')}</span>
                          </div>
                          
                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                            <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-sm border ${order.payment === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                              {order.payment}
                            </span>
                            <span className="text-xs text-stone-400">{order.date.split(',')[0]}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    </div>
  );
}
