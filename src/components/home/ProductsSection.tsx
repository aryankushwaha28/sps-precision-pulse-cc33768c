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
      features: ["1000 bar pressure", "Heavy-duty construction", "CNC precision parts"],
    },
    {
      title: "Tube Cleaning Accessories",
      description: "Lances, nozzles, plungers, and seals designed for durability and compatibility",
      image: cleaningImage,
      features: ["Lances & nozzles", "Durable materials", "Universal compatibility"],
    },
    {
      title: "Custom Pumping Systems",
      description: "Engineered for your specific process, tested and validated under real conditions",
      image: customImage,
      features: ["Custom engineering", "Process-specific", "Validated performance"],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
            Products
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Product Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="group bg-card border border-border hover:border-primary transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <ul className="space-y-2 pt-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="p-0 h-auto font-semibold" asChild>
                  <Link to="/products">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link to="/products">Complete Product Catalog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
