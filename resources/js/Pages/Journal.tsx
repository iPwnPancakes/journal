import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useEditable } from 'use-editable';
import { emotionsToStyles, getEmotions } from "@/utils/emotions";

export default function Journal() {
    const editorRef = useRef(null);
    const [fullContent, setContent] = useState('I am very happy. I am very sadv.');
    const [ranges, setRanges] = useState<Range[]>([]);

    const onEditableChange = useCallback((content: string) => {
        setContent(content.slice(0, -1));
    }, []);

    const onHighlight = useCallback(() => {
        const selection = document.getSelection();
        if (!selection) {
            return;
        }
        if (selection.rangeCount <= 0) {
            return;
        }

        const range = selection.getRangeAt(0);

        setRanges([...ranges, range]);
        console.log('Ranges:', ranges);
    }, [ranges]);

    useEditable(editorRef, onEditableChange, {
        disabled: false,
        indentation: 2
    });

    useEffect(() => {
        console.log('Applying Ranges:', ranges);

        const highlight = new Highlight();

        ranges.forEach(range => {
            highlight.add(range);
        });

        CSS.highlights.set('happy', highlight);
    }, [ranges]);

    const emotions = getEmotions();
    const styles = emotionsToStyles(emotions);

    return (
        <div css={ styles }>
      <pre
          style={ { whiteSpace: 'pre-wrap', caretColor: 'blue', caretShape: 'block' } }
          ref={ editorRef }
          tabIndex={ -1 } // Chrome quirk
      >
        <Fragment>
          <span>{ fullContent + '\n' }</span>
        </Fragment>
      </pre>

            <button onClick={ onHighlight }>Test</button>
        </div>
    );
}
