import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import pumpImage from "@/assets/pump-product.jpg";
import cleaningImage from "@/assets/cleaning-accessories.jpg";
import customImage from "@/assets/custom-system.jpg";

const ProductsSection = () => {
  const products = [
    {
      title: "High Pressure Triplex Plunger Pumps",
      description: "Up to 1000 bar pressure with heavy-duty construction and CNC precision parts",
      image: pumpImage,
      specs: [
        { label: "Pressure", value: "Up to 1000 bar" },
        { label: "Construction", value: "Heavy-duty forged steel" },
        { label: "Components", value: "CNC precision machined" },
      ],
    },
    {
      title: "Tube Cleaning Accessories",
      description: "Lances, nozzles, plungers, and seals designed for durability and compatibility",
      image: cleaningImage,
      specs: [
        { label: "Materials", value: "Corrosion-resistant" },
        { label: "Compatibility", value: "Universal mounting" },
        { label: "Service Life", value: "Extended durability" },
      ],
    },
    {
      title: "Custom Pumping Systems",
      description: "Engineered for your specific process, tested and validated under real conditions",
      image: customImage,
      specs: [
        { label: "Design", value: "Application-specific" },
        { label: "Testing", value: "Validated performance" },
        { label: "Support", value: "Installation assistance" },
      ],
    },
  ];

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            High Pressure Solutions
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Precision-engineered pumps and accessories for demanding industrial applications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Link
              key={index}
              to="/products"
              className="group bg-card border border-border overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="space-y-3 pb-4 border-b border-border">
                  {product.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">{spec.label}</span>
                      <span className="text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                  <span>View details</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
