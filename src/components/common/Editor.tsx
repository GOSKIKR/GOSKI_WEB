import React, { useMemo, useRef } from 'react';
import { useUploadFile } from '../../utils/useUploadImage';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
    'size',
    'h1',
];

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    const uploadFileMutation = useUploadFile();
    const quillRef = useRef<ReactQuill | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    async function handleImageUpload(file: File) {
        if (!file) {
            alert('파일이 선택되지 않았습니다.');
            return;
        }

        if (quillRef.current) {
            try {
                const result = await uploadFileMutation.mutateAsync(file);
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection(true);

                if (range) {
                    editor.insertEmbed(range.index, 'image', result.displayUrl);
                } else {
                    alert('에디터에 포커스를 맞추고 다시 시도해주세요.');
                }
            } catch (error) {
                alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
                console.error('Error:', error);
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleImageButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ size: ['small', false, 'large', 'huge'] }],
                    [{ align: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                    ['link', 'image']
                ],
                handlers: {
                    image: handleImageButtonClick,
                },
            },
        };
    }, []);

    return (
        <div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={onChange}
            />
            <input
                type="file"
                ref={inputFileRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default Editor;
