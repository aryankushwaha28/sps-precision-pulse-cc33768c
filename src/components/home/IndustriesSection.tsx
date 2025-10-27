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
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Empowering Industries Across India
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We deliver custom-engineered solutions that enhance productivity and reliability 
            across a wide range of industrial sectors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg bg-card border border-border hover:border-primary hover:shadow-card transition-all duration-300 text-center space-y-3"
            >
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                  <industry.icon className={`h-8 w-8 ${industry.color} group-hover:scale-110 transition-transform`} />
                </div>
              </div>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                {industry.name}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our technology at work — powering India's industrial cleaning and maintenance operations 
            with precision-engineered solutions built to last.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
