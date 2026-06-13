import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Product } from "../../types/product";
import ProductsManager from "../../components/admin/products/ProductsManager";
import AddProduct from "../../components/admin/products/AddProduct";
import ReviewAndRating from "../../components/admin/products/ReviewAndRating";
import { adminServices } from "../../services/admin.services";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await adminServices.getProducts();
      setProducts((data?.data || data || []) as unknown as Product[]);
    } catch (err) {
      console.warn("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (productData: Partial<Product>) => {
    try {
      if (selectedProduct) {
        await adminServices.updateProduct(selectedProduct.id, productData);
      } else {
        await adminServices.createProduct(productData);
      }
      await fetchProducts();
    } catch (error: any) {
      console.warn("Error saving product:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await adminServices.deleteProduct(id);
      await fetchProducts();
    } catch (error) {
      console.warn("Error deleting product:", error);
    }
  };

  const handleUpdateStats = async (id: string, data: { sales: number; rating: number }) => {
    try {
      await adminServices.updateProduct(id, data);
      await fetchProducts();
    } catch (error) {
      console.warn("Error updating stats:", error);
      throw error;
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-app-primary tracking-tighter uppercase">Products</h1>
          <p className="text-app-secondary font-medium mt-2">Manage your digital assets and inventory.</p>
        </div>
        <button 
          onClick={() => {
            setSelectedProduct(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-3 bg-app-primary text-app-surface px-8 py-4 rounded-none font-black uppercase text-xs tracking-widest hover:opacity-90 transition-opacity shadow-xl"
        >
          <Plus size={18} />
          Add New Product
        </button>
      </div>

      <ProductsManager 
        products={products}
        isLoading={isLoading}
        onEdit={(p) => {
          setSelectedProduct(p);
          setIsAddModalOpen(true);
        }}
        onDelete={handleDelete}
        onReviewInject={(p) => {
          setSelectedProduct(p);
          setIsReviewModalOpen(true);
        }}
      />

      <AddProduct 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />

      <ReviewAndRating 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSave={handleUpdateStats}
        product={selectedProduct}
      />
    </div>
  );
}
