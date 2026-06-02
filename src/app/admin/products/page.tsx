"use client";

import { useState, useCallback } from "react";
import { Search, Filter, Plus, Edit, Trash, X, Save, UploadCloud, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";

export default function AdminProducts() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [uploadedImages, setUploadedImages] = useState<{url: string, id: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    { id: "PRD-001", name: "Embroidered Silk Blend Kurta", sku: "SKU-KRT-001", price: 6999, stock: 45, category: "Women > Kurtas", status: "Active", image: "/images/products/tunic_2_1780252716722.png" },
    { id: "PRD-002", name: "Embroidered Silk Lehenga", sku: "SKU-MBN-002", price: 12500, stock: 12, category: "Women > Lehenga", status: "Active", image: "/images/products/trousers_1780252755043.png" },
    { id: "PRD-003", name: "Festive Zari Saree", sku: "SKU-SAR-003", price: 18999, stock: 0, category: "Women > Sarees", status: "Out of Stock", image: "/images/products/tunic_3_1780252733370.png" },
    { id: "PRD-004", name: "Kundan Choker Set", sku: "SKU-ACC-004", price: 4500, stock: 89, category: "Accessories > Jewellery", status: "Active", image: "/images/products/earrings_1780252782529.png" },
  ];

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    // Pre-populate images if editing
    if (product) {
      // Use a more reliable placeholder service (picsum) for the admin preview to avoid Unsplash hotlinking blocks
      setUploadedImages([{ url: `https://picsum.photos/seed/${product.id}/400/400`, id: '1' }]);
    } else {
      setUploadedImages([]);
    }
    setIsEditOpen(true);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    
    // Convert files to base64 data URIs for 100% reliable local previews
    const filePromises = acceptedFiles.map(file => {
      return new Promise<{url: string, id: string}>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve({
            url: e.target?.result as string,
            id: Math.random().toString(36).substr(2, 9)
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((newImages) => {
      // Simulate upload delay for realism
      setTimeout(() => {
        setUploadedImages(prev => [...prev, ...newImages]);
        setIsUploading(false);
      }, 1000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(prev => prev.filter(item => item !== id));
    } else {
      setSelectedItems(prev => [...prev, id]);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "SKU", "Price", "Stock", "Category", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredProducts.map(p => `${p.id},"${p.name}",${p.sku},${p.price},${p.stock},"${p.category}",${p.status}`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products_export.csv";
    link.click();
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Simulated import of ${e.target.files[0].name} successful.`);
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">Products</h1>
          <p className="text-sm text-stone-500 mt-1">Manage your catalog, inventory, and media.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 border border-stone-200 bg-white hover:bg-stone-100 hover:text-stone-900 h-9 px-4 py-2 gap-2 shadow-sm">
              <UploadCloud className="w-4 h-4" /> Import CSV
            </div>
          </label>
          <Button variant="outline" className="gap-2 shadow-sm bg-white" onClick={handleExportCSV}>Export CSV</Button>
          <Button variant="luxury" className="gap-2 shadow-sm" onClick={() => handleEdit(null)}><Plus className="w-4 h-4" /> Add Product</Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] transition-all"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-9 pr-8 py-2 text-sm border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] transition-all bg-white appearance-none cursor-pointer"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>)}
              </select>
            </div>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="bg-[#947156]/10 px-4 py-3 flex items-center justify-between border-b border-[#947156]/20">
            <span className="text-sm font-semibold text-[#947156]">{selectedItems.length} items selected</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white hover:text-[#947156] border-[#947156]/20 shadow-sm text-xs h-8">Bulk Edit</Button>
              <Button variant="outline" size="sm" className="bg-white hover:text-red-600 border-red-200 shadow-sm text-xs h-8">Delete Selected</Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-stone-500 uppercase bg-stone-50/80 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input 
                    type="checkbox" 
                    checked={selectedItems.length === products.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-stone-300 text-[#947156] focus:ring-[#947156]"
                  />
                </th>
                <th className="px-6 py-4 font-medium tracking-wider">Product</th>
                <th className="px-6 py-4 font-medium tracking-wider">SKU</th>
                <th className="px-6 py-4 font-medium tracking-wider">Category</th>
                <th className="px-6 py-4 font-medium tracking-wider">Price</th>
                <th className="px-6 py-4 font-medium tracking-wider">Stock</th>
                <th className="px-6 py-4 font-medium tracking-wider">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className={`hover:bg-stone-50/80 transition-colors group cursor-pointer ${selectedItems.includes(product.id) ? 'bg-[#947156]/5' : ''}`} onClick={() => handleEdit(product)}>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-stone-300 text-[#947156] focus:ring-[#947156]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-stone-100 overflow-hidden shrink-0 relative group">
                        <img src={product.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="font-medium text-stone-900">{product.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-500 font-mono text-xs">{product.sku}</td>
                  <td className="px-6 py-4 text-stone-500">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-stone-900" suppressHydrationWarning>₹{product.price.toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={product.stock === 0 ? "text-red-600 font-medium" : "text-stone-900"}>{product.stock}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${product.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); handleEdit(product); }} className="p-2 text-stone-400 hover:text-[#947156] hover:bg-[#947156]/10 rounded-md transition-all"><Edit className="w-4 h-4" /></button>
                      <button onClick={(e) => e.stopPropagation()} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"><Trash className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-stone-500">
                    No products found matching your search or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isEditOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditOpen(false)}
              className="fixed inset-0 bg-stone-900/40 z-40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.5 }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl border-l border-stone-200 flex flex-col overflow-y-auto"
            >
              <div className="p-6 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
                <div>
                  <h2 className="text-xl font-semibold text-stone-900 tracking-tight">{selectedProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <p className="text-sm text-stone-500 mt-1">{selectedProduct ? 'Update product details and media.' : 'Create a new product listing.'}</p>
                </div>
                <button onClick={() => setIsEditOpen(false)} className="p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-900 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 flex-1 space-y-10">
                {/* Media Upload Section */}
                <section>
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4">Media Gallery</h3>
                  
                  <div 
                    {...getRootProps()} 
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[160px]
                      ${isDragActive ? 'border-[#947156] bg-[#947156]/5' : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'}`}
                  >
                    <input {...getInputProps()} />
                    {isUploading ? (
                      <div className="flex flex-col items-center space-y-3 text-[#947156]">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p className="text-sm font-medium">Uploading high-res media...</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                          <UploadCloud className="w-6 h-6 text-stone-500" />
                        </div>
                        <p className="text-sm font-medium text-stone-900">Drag & drop product images here</p>
                        <p className="text-xs text-stone-500 mt-1">or click to browse from your computer (JPEG, PNG, WebP)</p>
                      </>
                    )}
                  </div>

                  {/* Image Preview Grid */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-6">
                      {uploadedImages.map((img, index) => (
                        <div key={img.id} className="relative aspect-square rounded-lg border border-stone-200 overflow-hidden group bg-stone-100">
                          <img src={img.url} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                            <button onClick={() => removeImage(img.id)} className="p-1.5 bg-white/20 hover:bg-red-500 text-white rounded-md backdrop-blur-md transition-colors shadow-sm">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                          {index === 0 && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#947156] rounded-sm shadow-sm">
                              Main Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <hr className="border-stone-100" />

                {/* Details Section */}
                <section className="space-y-6">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">Product Details</h3>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-stone-700">Product Name</label>
                    <input type="text" defaultValue={selectedProduct?.name || ''} className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] text-stone-900 transition-all shadow-sm" placeholder="e.g. Silk Blend Kurta" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">SKU</label>
                      <input type="text" defaultValue={selectedProduct?.sku || ''} className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] text-stone-900 transition-all shadow-sm font-mono text-sm" placeholder="SKU-..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Price (₹)</label>
                      <input type="number" defaultValue={selectedProduct?.price || ''} className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] text-stone-900 transition-all shadow-sm" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Inventory Stock</label>
                      <input type="number" defaultValue={selectedProduct?.stock || ''} className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] text-stone-900 transition-all shadow-sm" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-stone-700">Status</label>
                      <select className="w-full p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947156]/20 focus:border-[#947156] bg-white text-stone-900 transition-all shadow-sm">
                        <option>Active</option>
                        <option>Draft</option>
                        <option>Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </section>
              </div>

              <div className="p-6 border-t border-stone-100 bg-white sticky bottom-0 flex justify-end gap-3 z-20">
                <Button variant="outline" onClick={() => setIsEditOpen(false)} className="px-6">Cancel</Button>
                <Button variant="luxury" className="gap-2 px-8 shadow-md" onClick={() => setIsEditOpen(false)}>
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
