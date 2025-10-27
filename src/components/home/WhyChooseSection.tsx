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
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            The Power of Engineering Meets Precision Manufacturing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className="bg-secondary-foreground/5 border-secondary-foreground/10 hover:bg-secondary-foreground/10 transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center">
                  <reason.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
