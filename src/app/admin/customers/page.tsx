"use client";

import { useState } from "react";
import { Search, Filter, Mail, MoreHorizontal, Download, User, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCustomers() {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [viewCustomer, setViewCustomer] = useState<any | null>(null);
  const [editCustomer, setEditCustomer] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const initialCustomers = [
    { id: "CUS-001", name: "Priya Sharma", email: "priya.s@example.com", orders: 12, spent: 45000, joined: "Jan 12, 2023" },
    { id: "CUS-002", name: "Rahul Verma", email: "rahul.v@example.com", orders: 3, spent: 12500, joined: "Mar 05, 2023" },
    { id: "CUS-003", name: "Anita Desai", email: "anita.d@example.com", orders: 24, spent: 156000, joined: "Nov 22, 2022" },
    { id: "CUS-004", name: "Vikram Singh", email: "vikram.s@example.com", orders: 1, spent: 8999, joined: "Oct 20, 2023" },
  ];

  const [customers, setCustomers] = useState(initialCustomers);

  const handleAction = (action: string, id: string) => {
    setActiveMenuId(null);
    const cus = customers.find(c => c.id === id);
    if (action === 'delete') {
      if (confirm("Are you sure you want to delete this customer?")) {
        setCustomers(prev => prev.filter(c => c.id !== id));
      }
    } else if (action === 'View Profile') {
      setViewCustomer(cus);
    } else if (action === 'Edit Details') {
      setEditCustomer(cus);
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editCustomer) {
      setCustomers(prev => prev.map(c => c.id === editCustomer.id ? editCustomer : c));
      setEditCustomer(null);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Total Orders", "Total Spent", "Joined Date"];
    const csvContent = [
      headers.join(","),
      ...filteredCustomers.map(c => `${c.id},"${c.name}","${c.email}",${c.orders},${c.spent},"${c.joined}"`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "customers_export.csv";
    link.click();
  };

  return (
    <div className="space-y-6" onClick={() => setActiveMenuId(null)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">Customers</h1>
        <Button variant="outline" className="gap-2 shadow-sm bg-white border-stone-200" onClick={handleExportCSV}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by name, email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium text-center">Total Orders</th>
                <th className="px-6 py-4 font-medium text-right">Total Spent</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCustomers.map((cus) => (
                <tr key={cus.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#947156] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {cus.name.charAt(0)}
                      </div>
                      <div className="font-medium text-stone-900">{cus.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-500">{cus.email}</td>
                  <td className="px-6 py-4 text-center font-medium text-stone-900">{cus.orders}</td>
                  <td className="px-6 py-4 font-medium text-stone-900 text-right" suppressHydrationWarning>₹{cus.spent.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 text-stone-500">{cus.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 relative">
                      <button className="p-1.5 text-stone-400 hover:text-[#947156] transition-colors" title="Email Customer"><Mail className="w-4 h-4" /></button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenuId(activeMenuId === cus.id ? null : cus.id);
                        }}
                        className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      
                      {activeMenuId === cus.id && (
                        <div className="absolute right-0 top-10 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-50 py-1 text-left">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction('View Profile', cus.id); }}
                            className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#947156] transition-colors flex items-center gap-2"
                          >
                            <User className="w-4 h-4" /> View Profile
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction('Edit Details', cus.id); }}
                            className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#947156] transition-colors flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" /> Edit Details
                          </button>
                          <div className="h-px bg-stone-100 my-1"></div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction('delete', cus.id); }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                          >
                            <Trash className="w-4 h-4" /> Delete Customer
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Profile Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm" onClick={() => setViewCustomer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#947156] px-6 py-8 text-center relative">
              <button onClick={() => setViewCustomer(null)} className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors">✕</button>
              <div className="w-20 h-20 bg-white/20 text-white rounded-full flex items-center justify-center text-3xl font-serif mx-auto mb-3 backdrop-blur-md border border-white/30 shadow-inner">
                {viewCustomer.name.charAt(0)}
              </div>
              <h2 className="text-xl font-semibold text-white">{viewCustomer.name}</h2>
              <p className="text-white/80 text-sm mt-1">{viewCustomer.email}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-xs text-stone-500 font-medium mb-1 uppercase tracking-wider">Total Orders</p>
                  <p className="text-2xl font-bold text-stone-900">{viewCustomer.orders}</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-100">
                  <p className="text-xs text-stone-500 font-medium mb-1 uppercase tracking-wider">Total Spent</p>
                  <p className="text-2xl font-bold text-stone-900" suppressHydrationWarning>₹{viewCustomer.spent.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-stone-500 py-3 border-t border-stone-100">
                <span>Customer ID</span>
                <span className="font-mono text-stone-900">{viewCustomer.id}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-stone-500 py-3 border-t border-stone-100">
                <span>Joined Date</span>
                <span className="text-stone-900">{viewCustomer.joined}</span>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-[#947156] hover:bg-[#83634b]" onClick={() => setViewCustomer(null)}>Close Profile</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}
      {editCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm" onClick={() => setEditCustomer(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
              <h2 className="text-lg font-semibold text-stone-900">Edit Customer Details</h2>
              <button onClick={() => setEditCustomer(null)} className="text-stone-400 hover:text-stone-900 transition-colors">✕</button>
            </div>
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700">Full Name</label>
                <input 
                  type="text" 
                  value={editCustomer.name}
                  onChange={e => setEditCustomer({...editCustomer, name: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156]"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700">Email Address</label>
                <input 
                  type="email" 
                  value={editCustomer.email}
                  onChange={e => setEditCustomer({...editCustomer, email: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156]"
                  required
                />
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="button" variant="outline" className="flex-1 border-stone-200" onClick={() => setEditCustomer(null)}>Cancel</Button>
                <Button type="submit" className="flex-1 bg-[#947156] hover:bg-[#83634b]">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
