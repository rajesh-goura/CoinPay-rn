type TabType = "spending" | "income" | "bills" | "savings";

interface Transaction {
    id: string;
    name: string;
    amount: number;
    date: string;
    icon: any;
    type: TabType;
  }

export const sampleData: Transaction[] = [
    {
      id: "1",
      name: "Netflix",
      amount: -500,
      date: "1st JAN AT 7:20pm",
      icon: require("@/assets/images/spendicons/netflix.svg"),
      type: "spending",
    },
    {
      id: "2",
      name: "Youtube Premium",
      amount: -300,
      date: "5th JAN AT 3:45pm",
      icon: require("@/assets/images/spendicons/youtube.svg"),
      type: "spending",
    },
    {
      id: "3",
      name: "Pinterest",
      amount: -800,
      date: "10th JAN AT 11:30am",
      icon: require("@/assets/images/spendicons/pinterest.svg"),
      type: "spending",
    },
    {
      id: "4",
      name: "Google Cloud",
      amount: -1200,
      date: "15th JAN AT 9:15am",
      icon: require("@/assets/images/spendicons/google.svg"),
      type: "spending",
    },
    {
      id: "5",
      name: "Dribble",
      amount: -250,
      date: "20th JAN AT 5:40pm",
      icon: require("@/assets/images/spendicons/dribble.svg"),
      type: "spending",
    },
    {
      id: "6",
      name: "Freelance Payment",
      amount: 25000,
      date: "3rd JAN AT 10:15am",
      icon: require("@/assets/images/spendicons/freelance.png"),
      type: "income",
    },
    {
      id: "7",
      name: "Salary",
      amount: 75000,
      date: "28th JAN AT 12:00pm",
      icon: require("@/assets/images/spendicons/salary.png"),
      type: "income",
    },
    {
      id: "8",
      name: "Investment Dividends",
      amount: 12000,
      date: "15th JAN AT 4:30pm",
      icon: require("@/assets/images/spendicons/investment.jpg"),
      type: "income",
    },
  
    // Bill transactions
    {
      id: "9",
      name: "Electricity Bill",
      amount: -3500,
      date: "5th JAN AT 9:00am",
      icon: require("@/assets/images/spendicons/electricity.png"),
      type: "bills",
    },
    {
      id: "10",
      name: "Internet Bill",
      amount: -2200,
      date: "10th JAN AT 11:30am",
      icon: require("@/assets/images/spendicons/internet.svg"),
      type: "bills",
    },
    {
      id: "11",
      name: "Water Bill",
      amount: -1800,
      date: "15th JAN AT 2:15pm",
      icon: require("@/assets/images/spendicons/water.svg"),
      type: "bills",
    },
  
    // Savings transactions
    {
      id: "12",
      name: "Emergency Fund",
      amount: 10000,
      date: "7th JAN AT 8:45am",
      icon: require("@/assets/images/spendicons/emergency.png"),
      type: "savings",
    },
    {
      id: "13",
      name: "Retirement Fund",
      amount: 15000,
      date: "14th JAN AT 10:30am",
      icon: require("@/assets/images/spendicons/retirement.png"),
      type: "savings",
    },
    {
      id: "14",
      name: "Vacation Savings",
      amount: 8000,
      date: "21st JAN AT 3:15pm",
      icon: require("@/assets/images/spendicons/vacation.jpg"),
      type: "savings",
    },
  ];