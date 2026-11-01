# Data provenance

Source: Kotzias, D. (2015), Sentiment Labelled Sentences, UCI Machine Learning Repository.
- Dataset DOI: https://doi.org/10.24432/C57604
- Official page: https://archive.ics.uci.edu/dataset/331/sentiment+labelled+sentences
- Download: https://archive.ics.uci.edu/static/public/331/sentiment+labelled+sentences.zip
- License: Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/
- Underlying review domains: amazon.com, imdb.com, yelp.com; 1,000 binary-labelled sentences from each.
- Dataset paper: Kotzias, Denil, de Freitas and Smyth, From Group to Individual Labels Using Deep Features, KDD 2015.

The three labelled text files are redistributed unchanged from the official archive. Generated features, deduplication and model-training transformations happen in code; the raw files are retained. SHA-256 hashes are recorded in docs/metrics.json. The dataset license is separate from the code license. Labels are 0 (negative) and 1 (positive), with no neutral class.
