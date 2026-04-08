from sklearn.feature_extraction.text import TfidfVectorizer


def vectorize(job_desc, resumes):
    corpus = [job_desc] + resumes

    vectorizer = TfidfVectorizer(stop_words="english")
    vectors = vectorizer.fit_transform(corpus)

    return vectors