import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Send, Loader2, CheckCircle2 } from "lucide-react";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_bye4d9s";
const EMAILJS_TEMPLATE_ID = "template_00lgiib";
const EMAILJS_PUBLIC_KEY = "PijOFDzmbAluwxYkM";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface RequestQuoteModalProps {
  productName: string;
  trigger?: React.ReactNode;
}

const RequestQuoteModal = ({ productName, trigger }: RequestQuoteModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Save to Supabase
      const { error } = await supabase.from("quote_requests").insert({
        name: data.name,
        company: data.company || null,
        email: data.email,
        phone: data.phone || null,
        product_name: productName,
        message: data.message || null,
      });

      if (error) throw error;

      // Send email notification via EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          company: data.company || "Not provided",
          phone: data.phone || "Not provided",
          product_name: productName,
          message: data.message || "No additional details provided",
          to_email: "sps.bsk2011@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const formData = form.getValues();
    const message = encodeURIComponent(
      `Hi, I'm interested in ${productName}.\n\nName: ${formData.name || "N/A"}\nCompany: ${formData.company || "N/A"}\nEmail: ${formData.email || "N/A"}\nPhone: ${formData.phone || "N/A"}\n\nMessage: ${formData.message || "Please provide a quote."}`
    );
    window.open(`https://wa.me/919920710203?text=${message}`, "_blank");
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setIsSuccess(false);
        form.reset();
      }
    }}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="w-full">
            Request Quote
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl">Request Submitted!</DialogTitle>
              <DialogDescription className="text-base">
                Thank you for your interest in {productName}. Our team will contact you within 24 hours.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-4 space-y-3">
              <Button onClick={handleWhatsApp} variant="outline" className="w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp for Faster Response
              </Button>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request Quote</DialogTitle>
              <DialogDescription>
                Get a customized quote for <span className="font-medium text-foreground">{productName}</span>
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 XXXXX XXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your requirements..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3 pt-2">
                  <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Request
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="w-full gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp Instead
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestQuoteModal;
