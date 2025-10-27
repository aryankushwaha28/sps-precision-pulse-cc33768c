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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Engineering Reliability Since 2006
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Saraswati Pumps & Systems (SPS), we design and manufacture high-pressure triplex 
            plunger pumps and precision-engineered cleaning systems for the toughest industrial 
            environments. From CNC-machined parts to micron-level assemblies, every SPS product 
            stands for quality, durability, and innovation.
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg bg-card border border-border hover:shadow-card transition-all duration-300"
              >
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-foreground font-medium">{highlight}</span>
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
