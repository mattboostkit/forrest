export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  category: string;
  content: string;
  image: string;
  tags: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}