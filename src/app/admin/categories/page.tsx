import { Plus, Edit, Trash, MoveVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminCategories() {
  const categories = [
    { id: "CAT-W", name: "Women", slug: "women", products: 450, status: "Active" },
    { id: "CAT-M", name: "Men", slug: "men", products: 320, status: "Active" },
    { id: "CAT-K", name: "Kids", slug: "kids", products: 150, status: "Active" },
    { id: "CAT-A", name: "Accessories", slug: "accessories", products: 85, status: "Active" },
    { id: "CAT-S", name: "Sale", slug: "sale", products: 120, status: "Draft" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-serif text-stone-900">Categories</h1>
        <div className="flex items-center gap-3">
          <Button variant="luxury" className="gap-2"><Plus className="w-4 h-4" /> New Category</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 w-12"></th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium text-center">Products</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 text-stone-400 cursor-grab active:cursor-grabbing"><MoveVertical className="w-4 h-4" /></td>
                  <td className="px-6 py-4 font-medium text-stone-900">{cat.name}</td>
                  <td className="px-6 py-4 text-stone-500">/{cat.slug}</td>
                  <td className="px-6 py-4 text-center font-medium text-[#947156]">{cat.products}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${cat.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-600'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-stone-400 hover:text-[#947156] transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"><Trash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
