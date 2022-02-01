export const classes = (...classes: (string | false | 0 | null | undefined)[]): string => {
  if (classes.length === 0) return '';
  if (classes.length === 1) return classes[0] || '';

  return [
    ...new Set(
      classes
        .filter(x => x)
        .map(x => {
          return (x as string).split(' ');
        })
        .flat()
    )
  ]
    .join(' ')
    .trim();
};

