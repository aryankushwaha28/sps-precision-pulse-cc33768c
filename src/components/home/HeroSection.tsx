import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
const HeroSection = () => {
  return <section className="relative h-[85vh] flex items-center overflow-hidden bg-white">
      {/* Clean Background with Technical Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Industrial high-pressure pumps" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent"></div>
      </div>

      {/* Clean, Left-Aligned Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl space-y-8">
          {/* Bold, Simple Tagline */}
          <div className="space-y-2">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">
              Since 2006
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              HIGH-PRESSURE TECHNOLOGY.
            </h1>
          </div>
          
          {/* Clean Technical Description */}
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Manufacturer of triplex plunger pumps, CNC precision components, and industrial cleaning systems. Engineered for reliability in demanding applications.
          </p>

          {/* Simple CTA */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" asChild className="px-8">
              <Link to="/products">
                View Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>

          {/* Technical Specs Bar */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-foreground">1500 bar</div>
              <div className="text-sm text-muted-foreground">Max Pressure</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">19+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">ISO</div>
              <div className="text-sm text-muted-foreground">Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;