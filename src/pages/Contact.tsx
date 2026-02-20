import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-foreground font-display mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-10">Have questions? Reach out and we&apos;ll respond promptly.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm(p => ({...p, name: e.target.value}))} placeholder="Your name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm(p => ({...p, email: e.target.value}))} placeholder="you@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm(p => ({...p, message: e.target.value}))} placeholder="Your message..." />
            </div>
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl border border-border shadow-card p-6 space-y-4">
              <h3 className="font-display font-bold text-lg text-foreground">Get in Touch</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="gradient-primary rounded-lg p-2"><MapPin className="h-4 w-4 text-primary-foreground" /></div>
                  <div><p className="font-medium text-sm text-foreground">Address</p><p className="text-sm text-muted-foreground">123 University Avenue, Campus City, ST 12345</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="gradient-primary rounded-lg p-2"><Mail className="h-4 w-4 text-primary-foreground" /></div>
                  <div><p className="font-medium text-sm text-foreground">Email</p><p className="text-sm text-muted-foreground">events@college.edu</p></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="gradient-primary rounded-lg p-2"><Phone className="h-4 w-4 text-primary-foreground" /></div>
                  <div><p className="font-medium text-sm text-foreground">Phone</p><p className="text-sm text-muted-foreground">+1 (555) 123-4567</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
