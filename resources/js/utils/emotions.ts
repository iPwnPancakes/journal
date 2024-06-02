import { css, SerializedStyles } from '@emotion/react';

export function emotionsToStyles(emotions: { emotion: string, color: string }[]): SerializedStyles {
  const strings = emotions.map(({ emotion, color }) => {
    return `::highlight(${ emotion }) { background-color: ${ color }; }`;
  });

  return css(strings);
}

export function getEmotions(): { emotion: string, color: string }[] {
  return [
    { emotion: 'happy', color: 'yellow' },
    { emotion: 'sad', color: 'blue' }
  ];
}
