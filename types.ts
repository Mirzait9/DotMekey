
export interface KeywordWithScore {
    keyword: string;
    score: number;
}

export interface KeywordResponse {
    keywords: KeywordWithScore[];
}
