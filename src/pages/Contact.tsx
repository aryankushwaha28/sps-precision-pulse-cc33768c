import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Clock } from "lucide-react";
const Contact = () => {
  return <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-primary text-primary-foreground bg-neutral-700">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold">Contact Us</h1>
              <p className="text-xl opacity-90">
                Let's Build Performance Together
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help with your pumping system requirements. Reach out through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a href="mailto:sps.bsk2011@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                          sps.bsk2011@gmail.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <a href="tel:+919811112086" className="text-muted-foreground hover:text-accent transition-colors">
                          +91 9811112086
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          B.S.K., Uttar Pradesh, India
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Linkedin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">LinkedIn</h3>
                        <a href="https://www.linkedin.com/in/brajendra-singh-34b1b049/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                          Connect with Brajendra Singh
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-card transition-all duration-300">
                    <CardContent className="p-6 flex items-start space-x-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Saturday: 9:00 AM - 6:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">
                      Map Location - B.S.K., Uttar Pradesh, India
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Contact;