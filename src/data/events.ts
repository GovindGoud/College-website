export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: string;
  category: string;
  capacity: number;
  registered: number;
  image?: string;
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Tech Symposium 2026",
    description: "Join us for a day of cutting-edge technology talks, workshops, and networking with industry leaders. Explore AI, blockchain, and cloud computing.",
    date: "2026-03-15",
    time: "09:00 AM",
    venue: "Main Auditorium, Block A",
    organizer: "Computer Science Department",
    category: "Technology",
    capacity: 300,
    registered: 187,
  },
  {
    id: "2",
    title: "Cultural Fest - Harmony 2026",
    description: "A grand celebration of art, music, dance, and drama. Participate in competitions or enjoy performances from talented students across the college.",
    date: "2026-03-22",
    time: "10:00 AM",
    venue: "Open Air Theatre",
    organizer: "Cultural Committee",
    category: "Cultural",
    capacity: 500,
    registered: 342,
  },
  {
    id: "3",
    title: "Entrepreneurship Workshop",
    description: "Learn the fundamentals of starting your own business. Guest speakers include successful startup founders and venture capitalists.",
    date: "2026-04-05",
    time: "02:00 PM",
    venue: "Seminar Hall 2, Block C",
    organizer: "Business School",
    category: "Workshop",
    capacity: 150,
    registered: 98,
  },
  {
    id: "4",
    title: "Inter-College Sports Meet",
    description: "Compete in track & field, basketball, cricket, and more. Teams from 20+ colleges will participate in this annual sports extravaganza.",
    date: "2026-04-12",
    time: "08:00 AM",
    venue: "College Sports Complex",
    organizer: "Sports Committee",
    category: "Sports",
    capacity: 400,
    registered: 265,
  },
  {
    id: "5",
    title: "Research Paper Presentation",
    description: "Present your research findings to a panel of experts. Open to all departments. Best papers will be published in the college journal.",
    date: "2026-04-20",
    time: "11:00 AM",
    venue: "Conference Room, Admin Block",
    organizer: "Research Cell",
    category: "Academic",
    capacity: 100,
    registered: 45,
  },
  {
    id: "6",
    title: "Hackathon 2026",
    description: "24-hour coding challenge! Build innovative solutions for real-world problems. Prizes worth $5,000 for top teams.",
    date: "2026-05-01",
    time: "06:00 PM",
    venue: "IT Lab, Block B",
    organizer: "Coding Club",
    category: "Technology",
    capacity: 200,
    registered: 156,
  },
];

export const categories = ["All", "Technology", "Cultural", "Workshop", "Sports", "Academic"];

export const departments = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Business Administration",
  "Arts & Humanities",
  "Science",
];

export const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
