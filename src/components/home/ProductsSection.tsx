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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            High-Performance Pumps & Systems
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored solutions for industries demanding consistency, strength, and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 bg-card/50 backdrop-blur-sm overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="aspect-square overflow-hidden bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  {product.title}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="w-full group/btn" asChild>
                  <Link to="/products">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="default" size="lg" asChild>
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
