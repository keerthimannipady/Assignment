import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState('');
    const [html, setHtml] = useState('');

    useEffect(() => {
        convertMarkdownToHtml(markdown);
    }, [markdown]);

    const handleMarkdownChange = (e) => {
        setMarkdown(e.target.value);
    };

    const convertMarkdownToHtml = async (markdownText) => {
        try {
            const response = await axios.post('http://localhost:3001/api/convert', { markdown: markdownText });
            setHtml(response.data.html);
        } catch (error) {
            console.error('Error converting markdown to HTML', error);
            setHtml('<p>Error converting Markdown to HTML.</p>'); // Fallback handling
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
            {/* Left Pane: Markdown Input */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
                <h2 style={{ marginBottom: '10px' }}>Markdown Editor</h2>
                <textarea
                    style={{ width: '100%', height: 'calc(100vh - 80px)', padding: '10px', fontSize: '16px', fontFamily: 'inherit', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={markdown}
                    onChange={handleMarkdownChange}
                    placeholder="Type your Markdown here..."
                />
            </div>

            {/* Middle Pane: Markdown Preview */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto', borderLeft: '1px solid #ccc' }}>
                <h2 style={{ marginBottom: '10px' }}>Markdown Preview</h2>
                <div style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <ReactMarkdown components={{ code: SyntaxHighlighter }} children={markdown} />
                </div>
            </div>

            {/* Right Pane: HTML Preview */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#fff', overflowY: 'auto', borderLeft: '1px solid #ccc' }}>
                <h2 style={{ marginBottom: '10px' }}>HTML Preview</h2>
                <div style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            </div>
        </div>
    );
};

export default MarkdownEditor;
