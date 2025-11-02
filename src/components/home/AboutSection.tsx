import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Technical Content */}
          <div className="space-y-6">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
                About SPS
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Engineering Precision Since 2006
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Saraswati Pumps & Systems specializes in the design and manufacture of high-pressure 
                triplex plunger pumps and precision cleaning systems for industrial applications.
              </p>
              <p>
                Our manufacturing facility features in-house CNC machining capabilities, ensuring 
                micron-level precision across all product lines.
              </p>
            </div>

            <Button variant="outline" size="lg" asChild className="mt-6">
              <Link to="/about">Company Profile</Link>
            </Button>
          </div>

          {/* Right: Technical Specs */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card p-6 border border-border">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">CNC Precision</h3>
              <p className="text-sm text-muted-foreground">In-house machining</p>
            </div>
            <div className="bg-card p-6 border border-border">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Custom Solutions</h3>
              <p className="text-sm text-muted-foreground">Application-specific</p>
            </div>
            <div className="bg-card p-6 border border-border">
              <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-foreground mb-2">Service Network</h3>
              <p className="text-sm text-muted-foreground">Technical support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
