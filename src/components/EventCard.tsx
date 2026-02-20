import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { Event } from "@/data/events";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
  index?: number;
}

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const spotsLeft = event.capacity - event.registered;
  const fillPercent = Math.round((event.registered / event.capacity) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      {/* Category badge */}
      <div className="px-5 pt-5">
        <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {event.category}
        </span>
      </div>

      <div className="p-5 pt-3 space-y-3">
        <h3 className="font-display text-lg font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

        <div className="space-y-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>{new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Capacity bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" /> {event.registered}/{event.capacity}
            </span>
            <span>{spotsLeft} spots left</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <Link to={`/register?event=${event.id}`} className="block">
          <Button className="w-full mt-1" size="sm">
            Register Now
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EventCard;
