# Verification

- Trained from the three attributed UCI data files on Node.js 24.22.1.
- Held-out accuracy: 84.1629%; macro F1: 0.84155; majority baseline: 50%.
- Independent domain holdouts: Amazon 77.5%, IMDb 70.4%, Yelp 76.2%.
- Six Node tests passed locally, covering tokenisation, train-only vocabulary, deduplication/conflicts, deterministic disjoint splits, learning/contribution arithmetic, and artifact/evaluation consistency.
- The static build passed locally.
- Browser checks passed for positive and negative examples, rejection of Arabic text, and blank-input validation. The interface and evaluation display were inspected visually.
- GitHub Actions successfully reran training, tests and the static build: https://github.com/moamendahshann/sentiment-lens/actions/runs/41322713255

A private owner-only Sites deployment is available to the account owner at https://sentiment-lens-moamen.daringtide16.chatgpt.site . It is not a public visitor demo. The request to change the audience returned an error; owner-only access was preserved. The GitHub source repository is public and can be run locally without account access.

Results are a small-dataset benchmark, not a real-world accuracy guarantee. Scores are uncalibrated. No external inference provider or paid model was used.
