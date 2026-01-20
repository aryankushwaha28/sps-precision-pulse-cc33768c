import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import pumpImage from "@/assets/pump-product.jpg";
import cleaningImage from "@/assets/cleaning-accessories.jpg";
import customImage from "@/assets/custom-system.jpg";
import RequestQuoteModal from "@/components/RequestQuoteModal";

interface ProductSpec {
  pressure?: string;
  flow?: string;
  power?: string;
  pressureBar?: number;
  flowLPM?: number;
}

interface Product {
  id: string;
  title: string;
  category: "Pump" | "Accessory" | "Custom";
  description: string;
  image: string;
  specs?: ProductSpec;
  features?: string[];
}

const ProductsSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState("all");
  const [pressureRange, setPressureRange] = useState({ min: 0, max: 3500 });
  const [flowRange, setFlowRange] = useState({ min: 0, max: 600 });
  const [showFilters, setShowFilters] = useState(false);

  const products: Product[] = [
    {
      id: "sps-8000",
      title: "SPS-8000 Series",
      category: "Pump",
      description: "Heavy-duty triplex plunger pump for industrial cleaning and surface preparation",
      image: pumpImage,
      specs: {
        pressure: "800 bar",
        flow: "24-150 LPM",
        power: "75 kW",
        pressureBar: 800,
        flowLPM: 283,
      },
    },
    {
      id: "sps-11000",
      title: "SPS-11000 Series",
      category: "Pump",
      description: "High-performance pump designed for demanding hydroblasting applications",
      image: pumpImage,
      specs: {
        pressure: "1100 bar",
        flow: "33-215 LPM",
        power: "110 kW",
        pressureBar: 1100,
        flowLPM: 454,
      },
    },
    {
      id: "sps-13000",
      title: "SPS-13000 Series COOLING TYPE",
      category: "Pump",
      description: "Ultra-high pressure system for specialized industrial applications",
      image: pumpImage,
      specs: {
        pressure: "0-1100 bar",
        flow: "33-215 LPM",
        power: "180 kW",
        pressureBar: 1800,
        flowLPM: 522,
      },
    },
    {
      id: "sps-15000",
      title: "SPS-15000 Series",
      category: "Pump",
      description: "Ultra-high pressure pump for demanding heavy-duty industrial applications",
      image: pumpImage,
      specs: {
        pressure: "0-1400 bar",
        flow: "50-115 LPM",
        power: "132 kW",
        pressureBar: 1400,
        flowLPM: 115,
      },
    },
    {
      id: "custom-parts",
      title: "Custom CNC Parts",
      category: "Custom",
      description: "Precision-machined components with tight tolerances for pump maintenance and upgrades",
      image: customImage,
      features: [
        "CNC precision machining",
        "±0.01mm tolerance standards",
        "Material certification included",
        "Custom specifications available",
      ],
    },
    {
      id: "hp-nozzles",
      title: "High Pressure Nozzles",
      category: "Accessory",
      description: "Engineered nozzles for optimal spray patterns and maximum cleaning efficiency",
      image: cleaningImage,
      features: [
        "Multiple spray profiles available",
        "Hardened stainless steel construction",
        "Corrosion-resistant coating",
        "Compatible with standard fittings",
      ],
    },
    {
      id: "hp-guns",
      title: "High Pressure Guns",
      category: "Accessory",
      description: "Ergonomic trigger guns with safety features for operator comfort and control",
      image: cleaningImage,
      features: [
        "1000 bar rated capacity",
        "Safety lock mechanism",
        "Insulated grip design",
        "Swivel inlet connection",
      ],
    },
    {
      id: "lance-hose",
      title: "Lances & Hoses",
      category: "Accessory",
      description: "Durable high-pressure lances and reinforced hoses for extended reach applications",
      image: cleaningImage,
      features: [
        "Custom length options",
        "Quick-connect fittings",
        "Steel-braided reinforcement",
        "Flexible in cold conditions",
      ],
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Text search
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Model filter
      const matchesModel = selectedModel === "all" || product.id === selectedModel;

      // Pressure filter - only for products with specs
      const matchesPressure = !product.specs?.pressureBar || 
        (product.specs.pressureBar >= pressureRange.min && product.specs.pressureBar <= pressureRange.max);

      // Flow filter - only for products with specs
      const matchesFlow = !product.specs?.flowLPM ||
        (product.specs.flowLPM >= flowRange.min && product.specs.flowLPM <= flowRange.max);

      return matchesSearch && matchesModel && matchesPressure && matchesFlow;
    });
  }, [searchQuery, selectedModel, pressureRange, flowRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedModel("all");
    setPressureRange({ min: 0, max: 3500 });
    setFlowRange({ min: 0, max: 600 });
  };

  const hasActiveFilters = searchQuery !== "" || selectedModel !== "all" || 
    pressureRange.min !== 0 || pressureRange.max !== 3500 ||
    flowRange.min !== 0 || flowRange.max !== 600;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            High Pressure Solutions
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            Precision-engineered pumps and accessories for demanding industrial applications
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Model Selector */}
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full lg:w-[240px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Advanced Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-secondary/20">
              {/* Pressure Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Pressure Range (bar)
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={pressureRange.min || ""}
                    onChange={(e) => setPressureRange({ ...pressureRange, min: Number(e.target.value) || 0 })}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={pressureRange.max || ""}
                    onChange={(e) => setPressureRange({ ...pressureRange, max: Number(e.target.value) || 3500 })}
                    className="w-24"
                  />
                </div>
              </div>

              {/* Flow Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Flow Rate (LPM)
                </label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={flowRange.min || ""}
                    onChange={(e) => setFlowRange({ ...flowRange, min: Number(e.target.value) || 0 })}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={flowRange.max || ""}
                    onChange={(e) => setFlowRange({ ...flowRange, max: Number(e.target.value) || 600 })}
                    className="w-24"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Info */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <span className="text-sm text-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-primary hover:text-primary"
              >
                <X className="h-4 w-4 mr-1" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-card border border-border overflow-hidden hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {product.category}
                  </Badge>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Specs or Features */}
                  {product.specs ? (
                    <div className="space-y-2 pb-4 border-b border-border">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Pressure</span>
                        <span className="text-foreground font-semibold">{product.specs.pressure}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Flow Rate</span>
                        <span className="text-foreground font-semibold">{product.specs.flow}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">Power</span>
                        <span className="text-foreground font-semibold">{product.specs.power}</span>
                      </div>
                    </div>
                  ) : product.features ? (
                    <ul className="space-y-2 pb-4 border-b border-border">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {/* CTAs */}
                  <div className="mt-4 flex gap-2">
                    <Link to="/products" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full group/btn">
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <div className="flex-1">
                      <RequestQuoteModal productName={product.title} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 border border-border rounded-lg bg-secondary/20">
            <p className="text-lg text-muted-foreground mb-4">
              No products match your filters
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Premium CTA Section */}
        <div className="mt-16 p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Need Custom Pressure Solutions?
            </h3>
            <p className="text-base text-muted-foreground mb-6">
              Tell us your specifications and get a customized quote for your industrial application
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">✓</span>
                Custom engineering support
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">✓</span>
                Expert consultation included
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-primary">✓</span>
                Fast response guaranteed
              </div>
            </div>
            <Link to="/contact">
              <Button size="lg" className="font-semibold">
                Get a Custom Quote
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
