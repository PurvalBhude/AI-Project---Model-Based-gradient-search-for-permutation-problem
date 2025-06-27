# Model-Based Gradient Search for Permutation Problems

This repository implements a **Model-Based Gradient Search** algorithm for solving **permutation-based combinatorial optimization problems**, inspired by the research paper:

**"Model-Based Gradient Search for Permutation Problems"** By: *J. Ceberio and V. Santucci* Published in *ACM Transactions on Evolutionary Learning and Optimization*, Vol. 3, No. 4, Article 15, Dec 2023.  
🔗 [Read the paper](https://doi.org/10.1145/3628605)

---

## 🧠 Abstract

Permutation problems are tough due to the lack of gradient information. This project introduces a **model-based gradient approach** using the **Plackett-Luce (PL) distribution** to define a differentiable probability model over permutations. The model is iteratively improved through **gradient ascent** on the expected objective value.

We implemented and analyzed various enhancements including:
- Cumulative Step-size Adaptation (CSA)
- Entropy-based sampling
- Utility-based objective transformation
- Soft restarts to escape local optima
- Natural gradients for better convergence

---

## 🧩 Key Concepts

### 🔹 Problem Motivation
- Combinatorial Optimization Problems (COPs) lack direct gradient information.
- The solution: **Model a differentiable probability distribution** over permutations.
- Apply gradient-based optimization to the distribution’s parameters to sample better solutions over time.

### 🔹 Why Plackett-Luce?
- Probability model for ranking items.
- Efficient sampling: $\mathcal{O}(n \log n)$
- Gradient computation: $\mathcal{O}(n)$
- Parameterized using an n-length vector `$z$`, representing scores for items.

---

## ⚙️ Algorithmic Components

| Component | Description |
|----------|-------------|
| **GS** | Gradient Search without natural gradients |
| **NES** | Natural Evolution Strategy with natural gradients |
| **EDA** | Estimation of Distribution Algorithm using PL model |
| **CSA** | Adaptive learning rate using cumulative step-size |
| **Entropy Adaptation** | Dynamically adjusts the sample size |
| **Utility Transformation** | Refines the feedback from objective scores |
| **Soft Restarts** | Helps escape local optima and improves exploration |

---

## 📊 Experimental Results

The algorithms were tested on **Linear Ordering Problem (LOP)** instances.  
Observations:
- **GS** yielded the best results with higher convergence efficiency.
- **NES** performed similarly but was slightly slower.
- **EDA** had lower efficiency and convergence rates.

---

## 💻 Tech Stack

| Tech | Purpose |
|------|---------|
| **React.js** | Interactive Frontend UI |
| **JavaScript** | Algorithm Logic |
| **HTML + CSS** | Styling |
| **Vercel** | Deployment |
| **GitHub** | Codebase management and collaboration |

---

## 🚀 Running Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/PurvalBhude/AI-Project---Model-Based-gradient-search-for-permutation-problem
    ```
2.  **Navigate to the project directory**
    ```bash
    cd AI-Project---Model-Based-gradient-search-for-permutation-problem
    ```
3.  **Install dependencies**
    ```bash
    npm install
    ```
4.  **Run the development server**
    ```bash
    npm run dev
    ```
5.  **Visit `http://localhost:3000` in your browser.**

---

## 📖 Reference

J. Ceberio and V. Santucci,
Model-based Gradient Search for Permutation Problems,

ACM Transactions on Evolutionary Learning and Optimization, Vol. 3, No. 4, Article 15, Dec 2023.
DOI: 10.1145/3628605

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/PurvalBhude/AI-Project---Model-Based-gradient-search-for-permutation-problem/blob/main/LICENSE) file for details.

---

Made with ❤️ by Purval Bhude. For more about me and my work, visit my [Portfolio](https://purvalbhude.github.io/Portfolio-Website/) or [LinkedIn](https://www.linkedin.com/in/purvalbhude).
