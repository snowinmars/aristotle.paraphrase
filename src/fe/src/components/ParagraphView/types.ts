import {Paragraph, ParagraphHeader} from '../../types/types';

export type ParagraphViewProperties = {
  bookId: number;
  chapterId: number;
  paragraph: Paragraph,

  headers: ParagraphHeader[],
}

export type ControlChange = {
  blockType: string,
  paragraphHeaderId: ParagraphHeader,
}

export type ControlProperties = {
  blockType: string,
  paragraphKey: string,
  selectedTextId: ParagraphHeader,
  parentChangeCallback: (header: ControlChange) => void,
}
