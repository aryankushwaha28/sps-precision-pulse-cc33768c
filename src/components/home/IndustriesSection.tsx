import { FileText, Zap, Factory, Building, Wrench, Droplet } from "lucide-react";

const IndustriesSection = () => {
  const industries = [
    { icon: FileText, name: "Paper & Pulp", color: "text-blue-500" },
    { icon: Droplet, name: "Sugar & Power", color: "text-orange-500" },
    { icon: Zap, name: "Chemical & Process", color: "text-purple-500" },
    { icon: Building, name: "Construction & Hydrotesting", color: "text-green-500" },
    { icon: Factory, name: "Manufacturing", color: "text-red-500" },
    { icon: Wrench, name: "Automotive Cleaning", color: "text-yellow-500" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
            Applications
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Industries Served
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group p-6 bg-card border border-border hover:border-primary transition-colors"
            >
              <div className="flex items-center space-x-4">
                <industry.icon className={`h-6 w-6 ${industry.color}`} />
                <h3 className="font-semibold text-foreground">
                  {industry.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
