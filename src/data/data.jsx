import { Baker,Foto4,Foto1, Foto2 } from "../assetsJS";
const Data = {
  categories: [
    {
      name: "Home repairs",
      icon: Baker,
      description: "Fix issues in your home quickly and affordably."
    },
    {
      name: "Baking",
      icon: Baker,
      description: "Professional baking services for events and daily needs."
    },
    {
      name: "Fixing",
      icon: Baker,
      description: "General fixing for appliances and furniture."
    },
    {
      name: "Repairs",
      icon: Baker,
      description: "Repair services for various household items."
    },
    {
      name: "Plumbing",
      icon: Baker,
      description: "Expert plumbing solutions for leaks and installations."
    },
    {
      name: "Electric",
      icon: Foto4,
      description: "Electrical repairs and wiring services."
    },
    {
      name: "Carpentry",
      icon: Foto4,
      description: "Custom carpentry and woodwork projects."
    },
    {
      name: "TV mounting",
      icon: Foto1,
      description: "Mounting"
    },
    {
      name: "Shelf mounting",
      icon: Foto2,
      description: "Mounting"
    }
    
  ],
  location: [
    {
      name: "Tehran, Iran"
    }
  ],
  tasks: [
    {
      kinds: "Upcoming Task",
      mount: "Mounting a shelf",
      day: "Monday",
      month: "October",
      dayN: "14",
      year: "2025"
    }
    // می‌تونی تسک‌های بیشتری اضافه کنی
  ]
};

export default Data;