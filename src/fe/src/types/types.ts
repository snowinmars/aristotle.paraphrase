export enum ParagraphHeader {
  paraphrase = 'paraphrase',
  paraphraseNotes = 'paraphraseNotes',
  qBitSky = 'qBitSky',
  qBitSkyNotes = 'qBitSkyNotes',
  ross = 'ross',
  rossNotes = 'rossNotes',
}

export type EditorParameters = {
  bookId: number,
  chapterId: number,
  paragraphId: number,
  header: ParagraphHeader,
  text: string
};

export type MultiText = {
  paraphrase: string,
  paraphraseNotes: string,

  qBitSky: string,
  qBitSkyNotes: string,

  ross: string,
  rossNotes: string,
}

export type Paragraph = {
  id: number,
  key: string,
  text: MultiText,
}

export type Chapter = {
  id: number,
  key: string,
  qBitSkyEpigraph: string,
  rossEpigraph: string,
  paragraphs: Paragraph[]
}

export type Book = {
  id: number,
  key: string,
  headers: ParagraphHeader[],
  chapters: Chapter[]
}
