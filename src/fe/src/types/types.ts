enum types {
  origin_rus = 'origin_rus',
  origin_rus_notes = 'origin_rus_notes',
  origin_eng = 'origin_eng',
  origin_eng_notes = 'origin_eng_notes',
  paraphrase = 'paraphrase',
  paraphrase_notes = 'paraphrase_notes',
  core = 'core',
}

enum extensions {
  pdf = 'pdf',
  tex = 'tex',
}

export interface AnyObject {
  [key: string]: string | undefined;
}

export {
  types,
  extensions,
};
