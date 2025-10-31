import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import pumpImage from "@/assets/pump-product.jpg";
import cleaningImage from "@/assets/cleaning-accessories.jpg";
import customImage from "@/assets/custom-system.jpg";
import heroImage from "@/assets/hero-industrial.jpg";
import cylinderSleevesImage from "@/assets/cylinder-sleeves.png";
const Gallery = () => {
  const galleryItems = [{
    image: pumpImage,
    title: "High Pressure Triplex Plunger Pump",
    category: "Products"
  }, {
    image: cleaningImage,
    title: "Tube Cleaning Accessories",
    category: "Products"
  }, {
    image: customImage,
    title: "Custom Pumping System",
    category: "Products"
  }, {
    image: heroImage,
    title: "Manufacturing Facility",
    category: "Infrastructure"
  }, {
    image: cylinderSleevesImage,
    title: "CNC Machined Components",
    category: "Manufacturing"
  }, {
    image: cylinderSleevesImage,
    title: "SPS Cylinder Sleeves",
    category: "Products"
  }, {
    image: cleaningImage,
    title: "Quality Testing",
    category: "Quality Assurance"
  }];
  const categories = ["All", "Products", "Manufacturing", "Infrastructure", "Quality Assurance"];
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
              <h1 className="text-5xl md:text-6xl font-bold">Gallery</h1>
              <p className="text-xl text-muted-foreground">
                Real Work, Real Results — Our Technology in Action
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => <button key={index} className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${index === 0 ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
                  {category}
                </button>)}
            </div>

            {/* Gallery Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => <Card key={index} className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="aspect-square overflow-hidden bg-muted relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-secondary-foreground">
                        <div className="text-xs font-medium text-accent mb-1">{item.category}</div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </Card>)}
            </div>

            {/* Video Section */}
            <div className="mt-20">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  See Our Technology in Action
                </h2>
                <p className="text-lg text-muted-foreground">
                  Watch our high-pressure pumps and cleaning systems at work
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                        <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-accent border-b-[12px] border-b-transparent ml-1"></div>
                      </div>
                      <p className="text-muted-foreground">
                        Video content showcasing our products and services
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Gallery;