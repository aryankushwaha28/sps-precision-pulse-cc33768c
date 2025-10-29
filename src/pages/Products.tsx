import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import pumpImage from "@/assets/pump-product.jpg";
import cleaningImage from "@/assets/cleaning-accessories.jpg";
import customImage from "@/assets/custom-system.jpg";

const Products = () => {
  const products = [
    {
      title: "High Pressure Triplex Plunger Pumps",
      description: "Industry-leading performance for the most demanding applications",
      image: pumpImage,
      features: [
        "Pressure range: Up to 1000 bar",
        "Flow rates: Customizable to application",
        "Heavy-duty forged steel construction",
        "CNC-machined precision components",
        "Long-life ceramic plungers",
        "Advanced sealing systems",
        "Pressure-tested before dispatch",
        "ISO-certified manufacturing",
      ],
      applications: [
        "Tube cleaning in boilers and heat exchangers",
        "High-pressure water jetting",
        "Industrial cleaning systems",
        "Hydrostatic testing",
        "Paint and coating removal",
      ],
    },
    {
      title: "Tube Cleaning Accessories",
      description: "Comprehensive range of high-quality cleaning components",
      image: cleaningImage,
      features: [
        "Precision-engineered lances",
        "High-performance nozzles",
        "Durable plungers and seals",
        "Corrosion-resistant materials",
        "Compatible with multiple pump models",
        "Extended service life",
        "Quick replacement parts",
        "Custom configurations available",
      ],
      applications: [
        "Paper mill cleaning operations",
        "Sugar plant maintenance",
        "Power plant tube cleaning",
        "Chemical plant equipment",
        "Industrial boiler maintenance",
      ],
    },
    {
      title: "Custom Pumping Systems",
      description: "Engineered solutions tailored to your specific requirements",
      image: customImage,
      features: [
        "Application-specific design",
        "Custom pressure and flow configurations",
        "Integrated control systems",
        "Process optimization",
        "Performance validation testing",
        "Comprehensive documentation",
        "Installation support",
        "Ongoing technical assistance",
      ],
      applications: [
        "Specialized industrial processes",
        "OEM applications",
        "Retrofit projects",
        "System upgrades",
        "Complex cleaning operations",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold">Our Products</h1>
              <p className="text-xl opacity-90">
                Precision-Engineered Solutions for Industrial Excellence
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 space-y-20">
            {products.map((product, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Card className="overflow-hidden border-2 shadow-elegant">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                      {product.title}
                    </h2>
                    <p className="text-lg text-muted-foreground">{product.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">Applications</h3>
                    <ul className="space-y-2">
                      {product.applications.map((app, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="default" size="lg" asChild>
                    <Link to="/contact">Request a Quote</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
