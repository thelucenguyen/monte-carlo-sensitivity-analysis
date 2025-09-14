# Monte Carlo Sensitivity Analysis for Multi-Criteria Decision Making

An interactive web application demonstrating a Monte Carlo approach to sensitivity analysis for engineering and operations research decision-making problems. This project implements the methodology described in "A Monte Carlo Approach to Sensitivity Analysis for Multi-Criteria Decision Making" by Lucille E. Nguyen.

## 🎯 Overview

This application addresses the computational challenge of analyzing sensitivity in multi-criteria decision making models where the number of possible pairwise comparison matrices grows exponentially (9^n combinations). Instead of computing all possibilities, we use Monte Carlo simulation to generate statistically significant insights with manageable computation.

## 🧮 Methodology

### The Problem
- **Engineering Analysis Matrix (A)**: Fixed scores for alternatives against attributes
- **Pairwise Comparison Matrix (B)**: Variable weights based on decision-maker preferences  
- **Challenge**: For even small problems, exhaustive analysis becomes computationally intractable

### The Solution
1. **Random Matrix Generation**: Generate random, valid pairwise comparison matrices
2. **Score Calculation**: Multiply A × B to get weighted scores for each alternative
3. **Ranking**: Rank alternatives by their calculated scores
4. **Statistical Analysis**: Repeat process to achieve 95% confidence with 5% margin of error

## 🚀 Features

- **Interactive Simulation**: Run Monte Carlo analysis with customizable parameters
- **Real-time Visualization**: Dynamic charts showing rank distributions
- **Statistical Summary**: Probability percentages for each alternative's ranking
- **Responsive Design**: Works on desktop and mobile devices
- **Educational Content**: Detailed explanation of methodology and insights

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Deployment**: Vercel

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/monte-carlo-sensitivity-analysis.git
cd monte-carlo-sensitivity-analysis

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Deployment to Vercel

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

3. **Custom Domain** (optional):
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings

## 📊 Example Results

The simulation typically reveals patterns such as:
- **Blue alternative**: Consistently ranks first (~85% of simulations)
- **Red alternative**: Frequently takes second place (~60% of simulations)  
- **Green alternative**: Often ranks last (~70% of simulations)

These results demonstrate how Monte Carlo analysis can reveal the sensitivity of rankings to preference weight variations.

## 🎓 Academic Background

This implementation is based on research addressing the exponential complexity of sensitivity analysis in multi-criteria decision making:

- **Problem Scale**: 3 attributes = 729 possible matrices, 20 attributes = ~12 quintillion combinations
- **Statistical Rigor**: Achieves 95% confidence level with 5% margin of error
- **Practical Application**: Suitable for engineering analysis and operations research

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👩‍💼 Author

**Lucille E. Nguyen**
- Original research and methodology
- Interactive implementation for data science portfolio

## 🔗 Links

- [GitHub Repository](https://github.com/thelucenguyen/monte-carlo-sensitivity-analysis)
- [Author's Portfolio](https://lucenguyen.com)

---

*This project demonstrates the application of Monte Carlo methods to solve complex optimization problems in engineering and operations research.*
