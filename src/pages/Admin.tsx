import { useState } from "react";
import { Calendar, Users, TrendingUp, Plus, Search, Download, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/Layout";
import { mockEvents } from "@/data/events";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/data/events";

const mockRegistrations = [
  { id: "1", studentName: "Alice Johnson", studentId: "STU001", email: "alice@college.edu", eventTitle: "Annual Tech Symposium 2026", date: "2026-02-15" },
  { id: "2", studentName: "Bob Smith", studentId: "STU002", email: "bob@college.edu", eventTitle: "Hackathon 2026", date: "2026-02-16" },
  { id: "3", studentName: "Carol Davis", studentId: "STU003", email: "carol@college.edu", eventTitle: "Cultural Fest - Harmony 2026", date: "2026-02-17" },
  { id: "4", studentName: "David Lee", studentId: "STU004", email: "david@college.edu", eventTitle: "Entrepreneurship Workshop", date: "2026-02-18" },
  { id: "5", studentName: "Emma Wilson", studentId: "STU005", email: "emma@college.edu", eventTitle: "Annual Tech Symposium 2026", date: "2026-02-19" },
];

const Admin = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [regSearch, setRegSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const [newEvent, setNewEvent] = useState({
    title: "", description: "", date: "", time: "", venue: "", organizer: "", category: "Technology",
  });

  const filteredRegs = mockRegistrations.filter(
    (r) =>
      r.studentName.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.studentId.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(regSearch.toLowerCase())
  );

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({ title: "Error", description: "Title and date are required", variant: "destructive" });
      return;
    }
    if (editingEvent) {
      setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? { ...e, ...newEvent } : e)));
      toast({ title: "Event Updated" });
    } else {
      const ev: Event = { ...newEvent, id: Date.now().toString(), capacity: 200, registered: 0 };
      setEvents((prev) => [...prev, ev]);
      toast({ title: "Event Created" });
    }
    setDialogOpen(false);
    setEditingEvent(null);
    setNewEvent({ title: "", description: "", date: "", time: "", venue: "", organizer: "", category: "Technology" });
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({ title: event.title, description: event.description, date: event.date, time: event.time, venue: event.venue, organizer: event.organizer, category: event.category });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Event Deleted" });
  };

  const exportCSV = () => {
    const header = "Name,Student ID,Email,Event,Date\n";
    const rows = mockRegistrations.map((r) => `${r.studentName},${r.studentId},${r.email},${r.eventTitle},${r.date}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "registrations.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    { icon: Calendar, label: "Total Events", value: events.length, color: "bg-primary/10 text-primary" },
    { icon: Users, label: "Total Registrations", value: mockRegistrations.length, color: "bg-accent/10 text-accent" },
    { icon: TrendingUp, label: "Upcoming Events", value: events.filter((e) => new Date(e.date) > new Date()).length, color: "bg-destructive/10 text-destructive" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-display">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage events and registrations</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditingEvent(null); setNewEvent({ title: "", description: "", date: "", time: "", venue: "", organizer: "", category: "Technology" }); } }}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Add Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editingEvent ? "Edit Event" : "Add New Event"}</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2">
                <div><Label>Title</Label><Input value={newEvent.title} onChange={(e) => setNewEvent(p => ({...p, title: e.target.value}))} /></div>
                <div><Label>Description</Label><Textarea value={newEvent.description} onChange={(e) => setNewEvent(p => ({...p, description: e.target.value}))} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Date</Label><Input type="date" value={newEvent.date} onChange={(e) => setNewEvent(p => ({...p, date: e.target.value}))} /></div>
                  <div><Label>Time</Label><Input value={newEvent.time} onChange={(e) => setNewEvent(p => ({...p, time: e.target.value}))} placeholder="09:00 AM" /></div>
                </div>
                <div><Label>Venue</Label><Input value={newEvent.venue} onChange={(e) => setNewEvent(p => ({...p, venue: e.target.value}))} /></div>
                <div><Label>Organizer</Label><Input value={newEvent.organizer} onChange={(e) => setNewEvent(p => ({...p, organizer: e.target.value}))} /></div>
                <Button onClick={handleSaveEvent} className="w-full">{editingEvent ? "Update Event" : "Create Event"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border shadow-card p-5 flex items-center gap-4">
              <div className={`rounded-lg p-2.5 ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-2xl font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Events Table */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5 mb-10">
          <h2 className="font-display font-bold text-lg text-foreground mb-4">Events</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((ev) => (
                  <TableRow key={ev.id}>
                    <TableCell className="font-medium">{ev.title}</TableCell>
                    <TableCell>{ev.date}</TableCell>
                    <TableCell>{ev.venue}</TableCell>
                    <TableCell>{ev.registered}/{ev.capacity}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(ev)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(ev.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Registrations */}
        <div className="bg-card rounded-xl border border-border shadow-card p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <h2 className="font-display font-bold text-lg text-foreground">Registrations</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-9 w-56" value={regSearch} onChange={(e) => setRegSearch(e.target.value)} />
              </div>
              <Button variant="outline" size="sm" className="gap-1" onClick={exportCSV}><Download className="h-3.5 w-3.5" /> Export CSV</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegs.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.studentName}</TableCell>
                    <TableCell>{r.studentId}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.eventTitle}</TableCell>
                    <TableCell>{r.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
