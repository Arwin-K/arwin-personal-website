export interface WorkItem {
  id: string;
  role: string;
  company: string;
  location: string;
  dates: string;
  icon: string;
  summary: string;
  tags: string[];
  highlight: string;
  bullets: string[];
}

export const work: WorkItem[] = [
  {
    id: "sellstatic",
    role: "Software Engineer",
    company: "SellStatic",
    location: "Toronto, ON",
    dates: "May 2026 – Present",
    icon: "briefcase",
    summary: "Shipping reliable AI-ad creation workflows across React, ASP.NET Core, Azure, and AWS.",
    tags: ["React", "C# / ASP.NET Core", "AWS", "Azure"],
    highlight: "27 product surfaces instrumented",
    bullets: [
      "Designed a fault-tolerant AI-video completion pipeline (AWS SNS, SQS with dead-letter queue, Lambda, SES; Azure Blob Storage) that delivers generated videos to users who leave the app mid-render",
      "Shipped revision history for AI-generated ads with backend validation, durable storage, blob-cleanup retries, and stale-credit recovery, fixing failure cases in a deployed generative-AI product",
      "Built a brand-onboarding flow (React, C# ASP.NET Core) that imports a company’s logo and extracts its color palette to configure AI ad generation, covered by 10+ tests",
      "Built a GA4 analytics layer with a standardized event taxonomy tracking clicks, feature timing, credit spend, and subscriptions across 27 product surfaces to measure user experience",
    ],
  },
  {
    id: "amazon",
    role: "Artificial Intelligence Intern",
    company: "Amazon Work Experience Program",
    location: "Remote",
    dates: "June 2023 – August 2023",
    icon: "amazon",
    summary: "Compared machine-learning models for forest-cover classification on AWS.",
    tags: ["Python", "scikit-learn", "SageMaker", "Optuna"],
    highlight: "93.4% decision-tree accuracy",
    bullets: [
      "Built a supervised machine-learning pipeline in Python (pandas, NumPy, scikit-learn) to classify 7 forest cover types from 54 environmental features across 464,811 records, min-max scaling features whose ranges spanned 3 to 3,000",
      "Fixed a 104× class imbalance (2,179 to 226,793 samples per class) by oversampling all 7 classes with SMOTE",
      "Tuned a decision tree with Optuna (max depth 40, entropy) to 93.4% accuracy, beating a neural network (70.6%) and logistic regression (61.7%); used Matplotlib feature importance to find the top predictor",
      "Benchmarked training time across all 3 models (6.6 s to 285.7 s) on AWS (SageMaker, S3, EC2) and presented accuracy-versus-cost trade-offs to AWS engineers as part of a 4-person team",
    ],
  },
];
