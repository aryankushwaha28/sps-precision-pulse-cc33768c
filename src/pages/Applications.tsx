import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Droplet, Zap, Building, Factory, Wrench } from "lucide-react";
const Applications = () => {
  const applications = [{
    icon: FileText,
    title: "Paper & Pulp Industry",
    description: "High-pressure cleaning solutions for paper manufacturing equipment",
    details: ["Yankee dryer cleaning", "Press roll maintenance", "Heat exchanger tube cleaning", "Coating removal systems", "Process equipment cleaning"],
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20"
  }, {
    icon: Droplet,
    title: "Sugar Industry",
    description: "Efficient cleaning systems for sugar processing plants",
    details: ["Evaporator tube cleaning", "Heat exchanger maintenance", "Crystallizer cleaning", "Pan cleaning operations", "Pipeline descaling"],
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20"
  }, {
    icon: Zap,
    title: "Power Generation",
    description: "Critical maintenance solutions for power plants",
    details: ["Boiler tube cleaning", "Condenser maintenance", "Air preheater cleaning", "Economizer tube cleaning", "Steam generator maintenance"],
    color: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
  }, {
    icon: Factory,
    title: "Chemical & Process Industries",
    description: "Versatile cleaning solutions for chemical processing",
    details: ["Reactor cleaning", "Heat exchanger maintenance", "Pipeline cleaning", "Tank cleaning systems", "Process equipment maintenance"],
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20"
  }, {
    icon: Building,
    title: "Construction & Hydrotesting",
    description: "High-pressure systems for construction and testing",
    details: ["Pipeline hydrostatic testing", "Pressure vessel testing", "Surface preparation", "Concrete removal", "Industrial coating removal"],
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20"
  }, {
    icon: Wrench,
    title: "Automotive & Manufacturing",
    description: "Precision cleaning for manufacturing processes",
    details: ["Parts cleaning systems", "Mold cleaning", "Surface treatment", "Paint removal", "Production equipment maintenance"],
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20"
  }];
  return <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground bg-[#00090a]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold text-stone-50">Applications</h1>
              <p className="text-xl opacity-90">
                Powering Industries with Precision-Engineered Solutions
              </p>
            </div>
          </div>
        </section>

        {/* Applications Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app, index) => <Card key={index} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                  <CardHeader className={`${app.bgColor} pb-4`}>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-background/80">
                        <app.icon className={`h-8 w-8 ${app.color}`} />
                      </div>
                      <CardTitle className="text-xl">{app.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-2">{app.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {app.details.map((detail, idx) => <li key={idx} className="flex items-start space-x-2">
                          <div className={`w-2 h-2 rounded-full ${app.color.replace('text', 'bg')} mt-2 flex-shrink-0`}></div>
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </li>)}
                    </ul>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Need a Custom Solution?
              </h2>
              <p className="text-lg text-muted-foreground">
                We specialize in engineering tailored pumping systems for unique industrial requirements. 
                Contact us to discuss your specific application.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Applications;