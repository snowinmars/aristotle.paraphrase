export enum ParagraphHeader {
  paraphrase = 'paraphrase',
  paraphraseNotes = 'paraphraseNotes',
  qBitSky = 'qBitSky',
  qBitSkyNotes = 'qBitSkyNotes',
  ross = 'ross',
  rossNotes = 'rossNotes',
}

export type EditorParameters = {
  readonly bookId: number;
  readonly chapterId: number;
  readonly paragraphId: number;
  readonly header: ParagraphHeader;
  readonly text: string;
};

export type MultiText = {
  readonly paraphrase: string;
  readonly paraphraseNotes: string;

  readonly qBitSky: string;
  readonly qBitSkyNotes: string;

  readonly ross: string;
  readonly rossNotes: string;
}

export type Paragraph = {
  readonly id: number;
  readonly key: string;
  readonly text: MultiText;
}

export type Chapter = {
  readonly id: number;
  readonly key: string;
  readonly qBitSkyEpigraph: string;
  readonly rossEpigraph: string;
  readonly paragraphs: Paragraph[];
}

export type Book = {
  readonly id: number;
  readonly key: string;
  readonly headers: ParagraphHeader[];
  readonly chapters: Chapter[];
}
