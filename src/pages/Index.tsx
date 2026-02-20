import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import EventCard from "@/components/EventCard";
import { mockEvents } from "@/data/events";
import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const stats = [
  { icon: Calendar, label: "Events This Year", value: "50+" },
  { icon: Users, label: "Student Registrations", value: "3,200+" },
  { icon: Award, label: "Departments", value: "12" },
];

const Index = () => {
  const upcomingEvents = mockEvents.slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 font-display"
          >
            College Event Registration Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8"
          >
            Discover, register, and participate in exciting campus events. From tech symposiums to cultural fests — there&apos;s something for everyone.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link to="/events">
              <Button size="lg" className="gap-2">
                Browse Events <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Register Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
              >
                <div className="gradient-primary rounded-lg p-2.5">
                  <stat.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-display">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground mt-1">Don&apos;t miss out on what&apos;s happening on campus</p>
            </div>
            <Link to="/events">
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
