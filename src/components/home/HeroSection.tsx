import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Industrial manufacturing facility"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in-up">
          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black text-primary-foreground leading-tight tracking-tight">
            Precision in Every
            <span className="block bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
              Pulse
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-2xl md:text-3xl text-primary-foreground/95 font-bold tracking-wide">
            Powering Industries Since 2006
          </p>

          {/* Animated Tagline */}
          <div className="py-6 animate-fade-in backdrop-blur-sm bg-background/5 rounded-2xl border border-primary-foreground/10 px-8 inline-block" style={{ animationDelay: "0.3s" }}>
            <p className="text-lg md:text-xl text-primary-foreground/90 font-medium">
              High-Pressure Triplex Plunger Pumps | CNC Machined Components | Tube Cleaning Systems
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6 animate-scale-in" style={{ animationDelay: "0.6s" }}>
            <Button variant="hero" size="lg" asChild className="text-lg px-10 py-7 shadow-2xl shadow-accent/40 hover:shadow-accent/60">
              <Link to="/products">
                Explore Products
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-10 py-7 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary backdrop-blur-sm bg-background/10 shadow-xl">
              <Link to="/contact">
                <Phone className="mr-2 h-6 w-6" />
                Request a Quote
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 animate-fade-in" style={{ animationDelay: "0.9s" }}>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">19+</div>
              <div className="text-sm text-primary-foreground/80 mt-2 font-semibold">Years Experience</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-sm text-primary-foreground/80 mt-2 font-semibold">Installations</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">ISO</div>
              <div className="text-sm text-primary-foreground/80 mt-2 font-semibold">Certified</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-accent to-accent/60 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-sm text-primary-foreground/80 mt-2 font-semibold">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
