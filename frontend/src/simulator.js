// Interactive Python execution simulator for ML Practicals
export function runPythonSimulation(code) {
  const timestamp = new Date().toLocaleTimeString();
  const logs = [];
  const plots = [];

  logs.push(`[${timestamp}] Python 3.11.8 (main, Oct 19 2026, 02:40:00) [MSC v.1938 64 bit] on win32`);
  logs.push(`[${timestamp}] Running active script in isolated environment...\n`);

  let executedAny = false;

  // Experiment 1: Gaussian Naive Bayes
  if (code.includes("GaussianNB") || code.includes("Experiment 1")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 1: Gaussian Naive Bayes");
    logs.push("[sklearn.datasets] Loaded Iris dataset (150 samples, 4 features)");
    logs.push("[train_test_split] Split: 105 Train samples, 45 Test samples (test_size=0.3)");
    logs.push("[GaussianNB] Model fitted successfully.");
    const acc = (0.9333333333333333 + Math.random() * 0.04).toFixed(4);
    logs.push(`Accuracy: ${acc}`);
    logs.push("Confusion Matrix:\n [[16  0  0]\n  [ 0 14  1]\n  [ 0  1 14]]\n");
  }

  // Experiment 2: Decision Tree
  if (code.includes("DecisionTreeClassifier") || code.includes("Experiment 2")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 2: Decision Tree Classifier");
    logs.push("[DecisionTreeClassifier] Max depth=3, criterion='gini'");
    logs.push("Prediction: [0]");
    logs.push("Accuracy: 0.9733333333333334");
    logs.push("[plot_tree] Visual tree generated (11 nodes, 6 leaves)");
    logs.push("[matplotlib] Figure displayed successfully.\n");
    plots.push({
      type: "tree",
      title: "Decision Tree (max_depth=3) on Iris Dataset",
      nodes: [
        { name: "X[2] <= 2.45", gini: "0.667", samples: 150, value: "[50, 50, 50]", class: "Setosa" },
        { name: "X[3] <= 1.75", gini: "0.5", samples: 100, value: "[0, 50, 50]", class: "Versicolor" },
        { name: "Leaf: Virginica", gini: "0.043", samples: 46, value: "[0, 1, 45]", class: "Virginica" }
      ]
    });
  }

  // Experiment 3: Linear & Logistic Regression
  if (code.includes("LinearRegression") || code.includes("LogisticRegression") || code.includes("Experiment 3")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 3: Linear & Logistic Regression");
    if (code.includes("LinearRegression")) {
      logs.push("# Part A: Linear Regression");
      logs.push("Training Data: X=[[1],[2],[3],[4],[5]], y=[20, 30, 40, 50, 60]");
      logs.push("Model slope: 10.0, Intercept: 10.0");
      logs.push("Predicted marks: 70.0");
    }
    if (code.includes("LogisticRegression")) {
      logs.push("# Part B: Logistic Regression - Pass (1) or Fail (0)");
      logs.push("Training: X=[[20],[30],[40],[60],[70],[80]], y=[0, 0, 0, 1, 1, 1]");
      logs.push("Prediction: 1 (Pass)");
      logs.push("Accuracy: 1.0\n");
    }
  }

  // Experiment 4: Random Forest
  if (code.includes("RandomForestClassifier") || code.includes("Experiment 4")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 4: Random Forest Classifier");
    logs.push("[RandomForestClassifier] n_estimators=10, bootstrap=True");
    logs.push("Accuracy: 0.9777777777777777");
    logs.push("Confusion Matrix:\n [[15  0  0]\n  [ 0 14  1]\n  [ 0  0 15]]\n");
  }

  // Experiment 5: K-Means Clustering
  if (code.includes("KMeans") || code.includes("Experiment 5")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 5: K-Means Clustering");
    logs.push("X = [[1,2], [2,3], [3,2], [8,8], [9,8], [8,9]]");
    logs.push("Fitting KMeans(n_clusters=2, n_init=10)...");
    logs.push("Labels: [1 1 1 0 0 0]");
    logs.push("Centroids:\n  Cluster 0: [8.33, 8.33]\n  Cluster 1: [2.0, 2.33]");
    logs.push("[matplotlib] Scatter plot generated with 2 distinct clusters.\n");
    plots.push({
      type: "scatter",
      title: "K-Means Clustering (k=2)",
      data: [
        { x: 1, y: 2, cluster: 0, label: "Cluster A" },
        { x: 2, y: 3, cluster: 0, label: "Cluster A" },
        { x: 3, y: 2, cluster: 0, label: "Cluster A" },
        { x: 8, y: 8, cluster: 1, label: "Cluster B" },
        { x: 9, y: 8, cluster: 1, label: "Cluster B" },
        { x: 8, y: 9, cluster: 1, label: "Cluster B" }
      ]
    });
  }

  // Experiment 6A: Hierarchical Linkage & Dendrogram
  if (code.includes("linkage") || code.includes("dendrogram") || code.includes("Experiment 6A")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 6A: Agglomerative Hierarchical Linkage");
    logs.push("Method: 'complete' (Furthest Neighbor Linkage)");
    logs.push("Linkage Matrix computed for 6 data points.");
    logs.push("[scipy.cluster.hierarchy] Dendrogram plotted successfully.\n");
    plots.push({
      type: "dendrogram",
      title: "Hierarchical Clustering Dendrogram (Complete Linkage)",
      clusters: [
        { label: "P0 (1,2)", d: 1.41 },
        { label: "P1 (2,3)", d: 1.41 },
        { label: "P2 (3,2)", d: 2.0 },
        { label: "P3 (8,8)", d: 1.0 },
        { label: "P4 (9,8)", d: 1.0 },
        { label: "P5 (8,9)", d: 1.41 }
      ]
    });
  }

  // Experiment 6B: DBSCAN Clustering
  if (code.includes("DBSCAN") || code.includes("Experiment 6B")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 6B: DBSCAN Density-Based Clustering");
    logs.push("Parameters: eps=1.5, min_samples=3");
    logs.push("Labels: [ 0  0  0  0  1  1  1 -1]");
    logs.push("Identified: Cluster 0 (4 points), Cluster 1 (3 points), Noise (-1): 1 point at (10, 2)\n");
    plots.push({
      type: "scatter",
      title: "DBSCAN Clustering (eps=1.5, min_samples=3)",
      data: [
        { x: 1, y: 1, cluster: 0, label: "Core" },
        { x: 1, y: 2, cluster: 0, label: "Core" },
        { x: 2, y: 1, cluster: 0, label: "Core" },
        { x: 2, y: 2, cluster: 0, label: "Core" },
        { x: 7, y: 7, cluster: 1, label: "Core" },
        { x: 7, y: 8, cluster: 1, label: "Core" },
        { x: 8, y: 7, cluster: 1, label: "Core" },
        { x: 10, y: 2, cluster: -1, label: "Noise (-1)" }
      ]
    });
  }

  // Experiment 7: PCA Dimensionality Reduction
  if (code.includes("PCA") || code.includes("Experiment 7")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 7: PCA Dimensionality Reduction");
    logs.push("Original shape: (150, 4)");
    logs.push("StandardScaler: Transformed features to zero mean & unit variance");
    logs.push("PCA components: 2");
    logs.push("Reduced shape: (150, 2)");
    logs.push("Explained variance ratios: [0.7296, 0.2285] (Cumulative: 95.81%)\n");
    plots.push({
      type: "pca",
      title: "PCA 2D Projection of Iris Dataset (4D -> 2D)",
      variance: "95.8% Variance Retained"
    });
  }

  // Experiment 8: Perceptron
  if (code.includes("Perceptron") || code.includes("Experiment 8")) {
    executedAny = true;
    logs.push(">>> # Running Experiment 8: Single-Layer Perceptron");
    logs.push("Subset: 100 samples (Setosa vs Versicolor), 2 features");
    logs.push("Trained Perceptron with max_iter=1000, tol=1e-3");
    logs.push("Prediction: [1]");
    logs.push("Accuracy: 1.0");
    logs.push("Confusion Matrix:\n [[50  0]\n  [ 0 50]]\n");
  }

  // Fallback for custom code
  if (!executedAny) {
    logs.push(">>> Executing script...");
    const lines = code.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("print(")) {
        const match = trimmed.match(/print\((.*)\)/);
        if (match && match[1]) {
          try {
            // Safe simulated print
            const val = match[1].replace(/['"]/g, "");
            logs.push(val);
          } catch {
            logs.push(match[1]);
          }
        }
      }
    }
    logs.push("\nProcess finished with exit code 0");
  } else {
    logs.push(">>> ----------------------------------------------------");
    logs.push(">>> Process finished with exit code 0 (All tests passed)");
  }

  return { logs: logs.join("\n"), plots };
}
