import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CheckCircle2, Target, Eye, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-industrial.jpg";

// Client logos
import jkCement from "@/assets/clients/jk-cement.jpg";
import jkPaper from "@/assets/clients/jk-paper.jpg";
import shreeCement from "@/assets/clients/shree-cement.jpg";
import ultratech from "@/assets/clients/ultratech.jpg";
import jsw from "@/assets/clients/jsw.jpg";
const About = () => {
  const values = [{
    icon: Target,
    title: "Our Mission",
    description: "To deliver precision-engineered pumping solutions that exceed industry standards and empower our clients' success through reliability and innovation."
  }, {
    icon: Eye,
    title: "Our Vision",
    description: "To be India's most trusted name in high-pressure pumping systems, recognized for engineering excellence and unwavering commitment to quality."
  }, {
    icon: Award,
    title: "Quality Assurance",
    description: "ISO-grade manufacturing processes with rigorous testing protocols ensure every product meets the highest standards of performance and durability."
  }];
  const infrastructure = ["State-of-the-art CNC machining center", "Advanced pressure testing facilities", "Quality control laboratory", "In-house design and engineering team", "Comprehensive spare parts inventory", "24/7 technical support center"];
  return <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroImage} alt="Industrial high-pressure pumps" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold">About Saraswati Pumps & Systems</h1>
              <p className="text-xl text-muted-foreground">
                Engineering Excellence and Innovation Since 2006
              </p>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Our Journey</h2>
                <div className="w-20 h-1 bg-accent mx-auto"></div>
              </div>
              
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Founded in 2006, Saraswati Pumps & Systems (SPS) has grown from a small engineering 
                  workshop to one of India's leading manufacturers of high-pressure triplex plunger pumps 
                  and tube cleaning systems. Our journey has been driven by a singular focus: delivering 
                  precision-engineered solutions that our clients can rely on, day after day.
                </p>
                
                <p>
                  With nearly two decades of experience, we've built our reputation on the foundation of 
                  quality, innovation, and customer satisfaction. Every pump that leaves our facility is 
                  a testament to our commitment to engineering excellence and our understanding of the 
                  demanding environments in which our products operate.
                </p>
                
                <p>
                  Today, SPS serves a diverse range of industries across India, from paper and pulp plants 
                  to sugar mills, chemical processing facilities, and power generation units. Our products 
                  are trusted by leading companies who demand nothing but the best in performance, reliability, 
                  and durability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                  <CardContent className="p-8 space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Infrastructure */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Our Infrastructure</h2>
                <div className="w-20 h-1 bg-accent mx-auto"></div>
                <p className="text-lg text-muted-foreground">
                  Equipped with cutting-edge technology and staffed by experienced professionals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {infrastructure.map((item, index) => <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-card border border-border hover:shadow-card transition-all duration-300">
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>)}
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Clients */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold text-foreground">Trusted By Industry Leaders</h2>
                <div className="w-20 h-1 bg-accent mx-auto"></div>
                <p className="text-lg text-muted-foreground">
                  Partnering with India's leading companies across multiple industries
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {[
                  { src: jkCement, alt: "JK Cement" },
                  { src: jkPaper, alt: "JK Paper Ltd" },
                  { src: shreeCement, alt: "Shree Cement" },
                  { src: ultratech, alt: "UltraTech Cement" },
                  { src: jsw, alt: "JSW" },
                ].map((client, index) => (
                  <div 
                    key={index} 
                    className="bg-card border border-border rounded-lg p-6 flex items-center justify-center hover:shadow-card transition-all duration-300"
                  >
                    <img 
                      src={client.src} 
                      alt={client.alt} 
                      className="max-h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">2006</div>
                <div className="text-muted-foreground">Established</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">1000+</div>
                <div className="text-muted-foreground">Installations</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">500+</div>
                <div className="text-muted-foreground">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-accent mb-2">24/7</div>
                <div className="text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default About;