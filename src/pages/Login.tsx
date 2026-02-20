import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (role: string) => (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Login feature", description: `${role} login requires backend integration. Enable Lovable Cloud to get started!` });
  };

  const form = (role: string) => (
    <form onSubmit={handleLogin(role)} className="space-y-4 mt-4">
      <div className="space-y-1.5">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input id={`${role}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@college.edu" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input id={`${role}-password`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </div>
      <Button type="submit" className="w-full">Log In as {role}</Button>
    </form>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="text-center mb-8">
          <div className="gradient-primary rounded-xl p-3 inline-block mb-4">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground font-display">Welcome Back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          <Tabs defaultValue="student">
            <TabsList className="w-full">
              <TabsTrigger value="student" className="flex-1">Student</TabsTrigger>
              <TabsTrigger value="admin" className="flex-1">Admin</TabsTrigger>
            </TabsList>
            <TabsContent value="student">{form("Student")}</TabsContent>
            <TabsContent value="admin">{form("Admin")}</TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
