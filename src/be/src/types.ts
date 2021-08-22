export const enum ParagraphHeader {
    paraphrase = 'paraphrase',
    paraphraseNotes = 'paraphraseNotes',
    qBitSky = 'qBitSky',
    qBitSkyNotes = 'qBitSkyNotes',
    ross = 'ross',
    rossNotes = 'rossNotes',
}

type Common = {
    id: number;
    key: string;
}

export type Book = Common & {
    headers: ParagraphHeader[];
    chapters: Chapter[];
}

export type Chapter = Common & {
    paragraphs: Paragraph[];
    qBitSkyEpigraph: string;
    rossEpigraph: string;
}

export type Paragraph = Common & {
    text: MultiText;
}

export type MultiText = {
    paraphrase: string;
    paraphraseNotes: string;
    qBitSky: string;
    qBitSkyNotes: string;
    ross: string;
    rossNotes: string;
}
