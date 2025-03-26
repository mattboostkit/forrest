import { Service, BlogPost, FAQ, Testimonial } from '../types';

export const services: Service[] = [
  {
    id: 'hr-consulting',
    title: 'HR Consulting',
    description: 'Strategic HR solutions tailored to your business needs',
    icon: 'Briefcase',
    details: [
      'Organisational Development',
      'Performance Management',
      'Employee Relations',
      'HR Strategy Development',
      'Recruitment & Selection'
    ]
  },
  {
    id: 'employee-training',
    title: 'Employee Training',
    description: 'Comprehensive training programmes for workforce development',
    icon: 'GraduationCap',
    details: [
      'Leadership Development',
      'Compliance Training',
      'Soft Skills Development',
      'Team Building',
      'Professional Development'
    ]
  },
  {
    id: 'health-safety',
    title: 'Health & Safety',
    description: 'Ensuring workplace safety and compliance',
    icon: 'ShieldCheck',
    details: [
      'Risk Assessment',
      'Safety Audits',
      'Policy Development',
      'Training & Implementation',
      'Compliance Monitoring'
    ]
  },
  {
    id: 'legal',
    title: 'Legal',
    description: 'Expert employment law guidance and support',
    icon: 'Scale',
    details: [
      'Contract Review',
      'Policy Development',
      'Employment Law Advice',
      'Dispute Resolution',
      'Compliance Management'
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    role: 'HR Director',
    company: 'Tech Innovations Ltd',
    content: 'Forrest HR transformed our HR processes completely. Their strategic approach and expertise have been invaluable to our growth.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'CEO',
    company: 'Wilson Manufacturing',
    content: 'Their proactive approach to HR consulting has helped us build a stronger, more engaged workforce.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    id: '3',
    name: 'Emily Roberts',
    role: 'Operations Manager',
    company: 'Global Solutions UK',
    content: 'Outstanding service and expertise. The training programmes they developed have significantly improved our team performance.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export const faqs: FAQ[] = [
  {
    question: 'How can HR consulting benefit my small business?',
    answer: 'HR consulting can help small businesses establish compliant HR practices, optimize recruitment processes, develop employee handbooks, implement performance management systems, and ensure legal compliance while allowing you to focus on growing your business.'
  },
  {
    question: 'What should I expect from a HR audit?',
    answer: 'A HR audit comprehensively reviews your current HR practices, including policies, procedures, documentation, and compliance. We assess areas like recruitment, onboarding, performance management, and legal compliance, providing detailed recommendations for improvement.'
  },
  {
    question: 'How often should we update our HR policies?',
    answer: 'HR policies should be reviewed annually and updated whenever there are significant changes in employment law, company structure, or business practices. Regular reviews ensure compliance with current legislation and alignment with business objectives.'
  },
  {
    question: 'What training programs are essential for all employees?',
    answer: 'Essential training programs include health and safety, equality and diversity, data protection (GDPR), cybersecurity awareness, and workplace conduct. We can help design and implement these programs tailored to your organization.'
  },
  {
    question: 'How can we improve employee retention?',
    answer: 'Employee retention can be improved through competitive compensation packages, career development opportunities, regular feedback and recognition, work-life balance initiatives, and creating a positive workplace culture. We can help develop strategies specific to your organization.'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Artificial Intelligence in HR: Revolutionising the Modern Workplace',
    excerpt: 'Discover how AI is transforming HR practices in the UK, from recruitment to employee engagement.',
    author: {
      name: 'Dr. Emma Williams',
      role: 'Head of HR Technology',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: '2024-03-15',
    category: 'Technology',
    content: 'Artificial Intelligence is revolutionising how HR departments operate across the UK...',
    tags: ['AI', 'Digital Transformation', 'HR Technology', 'Future of Work'],
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '2',
    title: 'Creating Inclusive Workplaces: Essential Strategies for UK Organisations',
    excerpt: 'Practical guidance on fostering diversity and inclusion in British workplaces.',
    author: {
      name: 'Sarah Thompson',
      role: 'Diversity & Inclusion Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: '2024-03-10',
    category: 'Workplace Culture',
    content: 'Building an inclusive workplace in the UK requires a comprehensive approach...',
    tags: ['DEI', 'Workplace Culture', 'Employee Experience', 'Best Practices'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '3',
    title: 'Mental Health at Work: A Guide for UK Employers',
    excerpt: 'Essential strategies for supporting employee wellbeing and mental health in British workplaces.',
    author: {
      name: 'Dr. James Wilson',
      role: 'Occupational Health Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: '2024-03-05',
    category: 'Wellbeing',
    content: 'Mental health support has become essential for modern UK organisations...',
    tags: ['Mental Health', 'Wellbeing', 'Employee Support', 'Workplace Health'],
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '4',
    title: 'The Future of Remote Work in UK Businesses',
    excerpt: 'Exploring how British companies are adapting to hybrid and remote work models in 2024 and beyond.',
    author: {
      name: 'Victoria Clarke',
      role: 'Workplace Strategy Consultant',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: '2024-03-01',
    category: 'Workplace Trends',
    content: 'As UK businesses continue to evolve their working practices, remote and hybrid models have become increasingly sophisticated. This comprehensive guide explores the latest trends, challenges, and best practices for implementing successful remote work policies. From managing virtual teams to ensuring compliance with UK employment law, we examine how organisations can create effective and engaging remote work environments.',
    tags: ['Remote Work', 'Hybrid Working', 'Digital Workplace', 'Employee Engagement'],
    image: 'https://images.unsplash.com/photo-1521898284481-a5ec348cb555?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '5',
    title: 'Employment Law Updates 2024: What UK Employers Need to Know',
    excerpt: 'Key changes in UK employment legislation and their impact on businesses.',
    author: {
      name: 'Richard Foster',
      role: 'Employment Law Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: '2024-02-25',
    category: 'Legal',
    content: 'Stay compliant with the latest changes in UK employment law. This comprehensive overview covers recent updates to legislation, including changes to flexible working requests, holiday pay calculations, and family-friendly policies. We provide practical guidance on implementing these changes and ensuring your organisation remains compliant.',
    tags: ['Employment Law', 'Compliance', 'Legal Updates', 'HR Policy'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: '6',
    title: 'Building a Strong Company Culture in a Multi-Generational Workforce',
    excerpt: 'Strategies for fostering an inclusive culture across different generations in UK workplaces.',
    author: {
      name: 'Dr. Elizabeth Hart',
      role: 'Organisational Culture Specialist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
    },
    date: '2024-02-20',
    category: 'Workplace Culture',
    content: 'With up to five generations now working together in many UK organisations, creating a cohesive company culture has never been more challenging or important. This article explores practical strategies for building an inclusive culture that engages employees across all age groups, from Generation Z to Baby Boomers. Learn how to leverage generational diversity to drive innovation and productivity.',
    tags: ['Company Culture', 'Multi-generational Workforce', 'Employee Engagement', 'Diversity'],
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=1200'
  }
];