import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    "ISO-grade manufacturing",
    "In-house CNC machining",
    "Expert service team",
    "Proven performance across industries",
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-black text-foreground tracking-tight">
            Engineering Reliability Since 2006
          </h2>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-medium">
            At Saraswati Pumps & Systems (SPS), we design and manufacture high-pressure triplex 
            plunger pumps and precision-engineered cleaning systems for the toughest industrial 
            environments. From CNC-machined parts to micron-level assemblies, every SPS product 
            stands for quality, durability, and innovation.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border-2 border-border/50 hover:border-primary/50 hover:shadow-elegant transition-all duration-500 group backdrop-blur-sm"
              >
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <CheckCircle2 className="h-7 w-7 text-primary flex-shrink-0" />
                </div>
                <span className="text-foreground font-semibold text-lg">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Button variant="default" size="lg" asChild>
              <Link to="/about">Know More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
