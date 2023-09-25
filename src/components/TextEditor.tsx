import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
});

const TextEditor = () => {
    const [state, copyToClipboard] = useCopyToClipboard();
    const [content, setContent] = useState();
    const handleChange = (e: string) => {
        console.log(e);
        setContent(e);
    };

    return (
        <div className="text-black">
            <button onClick={() => copyToClipboard(content)}>Click me</button>
            <SunEditor
                height="330px"
                autoFocus
                placeholder="Viết nội dung ở đây"
                setDefaultStyle="font-family: 'Roboto', sans-serif; font-size: 16px;"
                onChange={handleChange}
                setOptions={{
                    buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle', 'blockquote'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['fontColor', 'hiliteColor', 'textStyle'],
                        ['removeFormat'],
                        '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image'], // You must add the 'katex' library at options to use the 'math' plugin.
                        /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                        ['fullScreen', 'showBlocks', 'codeView'],
                        ['preview'],
                        ['save'],
                    ],
                }}
            />
        </div>
    );
};

export default TextEditor;
