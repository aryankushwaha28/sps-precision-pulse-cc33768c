import { Cog, Shield, Gauge, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Cog,
      title: "CNC Machined Components",
      description: "Micron accuracy in every part ensures optimal performance and longevity",
    },
    {
      icon: Shield,
      title: "Long Life Sealing Systems",
      description: "Built for heavy-duty operations with extended service life",
    },
    {
      icon: Gauge,
      title: "Performance Tested",
      description: "Every pump is pressure tested before dispatch to ensure reliability",
    },
    {
      icon: Headphones,
      title: "After-Sales Support",
      description: "Fast response times and comprehensive spare parts availability",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
            Why Choose SPS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Engineering Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-card border border-border p-6 space-y-4"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{reason.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
