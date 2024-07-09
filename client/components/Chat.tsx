import { useState } from 'react';
import { loadDocument, generateRAG } from '@/pages/api/api';

export default function Chat(): JSX.Element {
    const [chatHistory, setChatHistory] = useState('');
    const [pdfFilePath, setPdfFilePath] = useState('');
    const [messageToQuery, setMessageToQuery] = useState('');
    const [documentLoading, setDocumentLoading] = useState(false);
    const [ragResponding, setRagResponding] = useState(false);

    const onUpload = async (pdfFilePath: string) => {
        setPdfFilePath('');
        setDocumentLoading(true);
        const response = await loadDocument(pdfFilePath);
        setDocumentLoading(false);
        alert(response);
    };

    const onSendMessage = async (query: string) => {
        setChatHistory(chatHistory + '\nUser: ' + query);
        setRagResponding(true);
        setMessageToQuery('');
        const ragResponse = await generateRAG(query);
        setChatHistory(
            chatHistory + '\nUser: ' + query + '\nLLM: ' + ragResponse,
        ); // + '<Response goes here>')
        setRagResponding(false);
    };

    return (
        <div>
            <div>
                <textarea
                    value={pdfFilePath}
                    disabled={documentLoading}
                    onChange={(e) => setPdfFilePath(e.target.value)}
                    // id="outlined-basic"
                    // label="PDF / Big Text file path"
                />
            </div>

            <div>
                <button
                    // loading={documentLoading}
                    onClick={() => onUpload(pdfFilePath)}
                >
                    Upload
                </button>
            </div>

            <div>
                <textarea
                    value={chatHistory}
                    disabled
                    id='outlined-multiline-flexible'
                />
            </div>

            <div>
                <textarea
                    value={messageToQuery}
                    disabled={ragResponding}
                    onChange={(e) => setMessageToQuery(e.target.value)}
                    // id="outlined-basic"
                    // label="Send a message..."
                />
                <button
                    // loading={ragResponding}
                    onClick={() => onSendMessage(messageToQuery)}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
