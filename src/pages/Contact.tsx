import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Clock } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
const Contact = () => {
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
              <h1 className="text-5xl md:text-6xl font-bold">Contact Us</h1>
              <p className="text-xl text-muted-foreground">
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
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.12876929726!2d77.7781048!3d28.4067036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c9e5f3a4c0ddd%3A0x8c8f7f8f8f8f8f8f!2sBulandshahr%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Saraswati Pumps & Systems Location"
                    className="w-full h-full"
                  />
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