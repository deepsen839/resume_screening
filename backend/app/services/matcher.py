from sklearn.metrics.pairwise import cosine_similarity


def rank_resumes(vectors):
    job_vector = vectors[0]
    resume_vectors = vectors[1:]

    scores = cosine_similarity(job_vector, resume_vectors)[0]

    ranked = sorted(
        enumerate(scores),
        key=lambda x: x[1],
        reverse=True
    )

    return ranked