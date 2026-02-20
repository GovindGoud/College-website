import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { mockEvents, departments, years } from "@/data/events";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get("event") || "";
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    eventId: preselected,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.studentId.trim()) errs.studentId = "Student ID is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.length < 7) errs.phone = "Valid phone number is required";
    if (!form.department) errs.department = "Select a department";
    if (!form.year) errs.year = "Select your year";
    if (!form.eventId) errs.eventId = "Select an event";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Mock submit
    setSubmitted(true);
    toast({
      title: "Registration Successful!",
      description: "You have been registered for the event.",
    });
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-foreground font-display mb-2">Registration Complete!</h2>
          <p className="text-muted-foreground mb-6">
            You&apos;ve been successfully registered. Check your email for confirmation details.
          </p>
          <Button onClick={() => { setSubmitted(false); setForm({ fullName: "", studentId: "", email: "", phone: "", department: "", year: "", eventId: "" }); }}>
            Register for Another Event
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <h1 className="text-3xl font-bold text-foreground font-display mb-2">Event Registration</h1>
        <p className="text-muted-foreground mb-8">Fill in your details to register for an event</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="John Doe" />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="studentId">Student ID</Label>
            <Input id="studentId" value={form.studentId} onChange={(e) => updateField("studentId", e.target.value)} placeholder="STU2026001" />
            {errors.studentId && <p className="text-sm text-destructive">{errors.studentId}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="john@college.edu" />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+1 555 123 4567" />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Department</Label>
            <Select value={form.department} onValueChange={(v) => updateField("department", v)}>
              <SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.department && <p className="text-sm text-destructive">{errors.department}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Year</Label>
            <Select value={form.year} onValueChange={(v) => updateField("year", v)}>
              <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
              <SelectContent>
                {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
          </div>

          <div className="space-y-1.5">
            <Label>Select Event</Label>
            <Select value={form.eventId} onValueChange={(v) => updateField("eventId", v)}>
              <SelectTrigger><SelectValue placeholder="Choose an event" /></SelectTrigger>
              <SelectContent>
                {mockEvents.map((ev) => <SelectItem key={ev.id} value={ev.id}>{ev.title}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.eventId && <p className="text-sm text-destructive">{errors.eventId}</p>}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Registration
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
