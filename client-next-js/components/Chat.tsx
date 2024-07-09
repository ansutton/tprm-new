import { loadDocument, generateRAG } from "@/pages/api/api";
import React from "react";

export default function Chat() {
    const [chatHistory, setChatHistory] = React.useState("");
    const [pdfFilePath, setPdfFilePath] = React.useState("");
    const [messageToQuery, setMessageToQuery] = React.useState("");
    const [documentLoading, setDocumentLoading] = React.useState(false);
    const [ragResponding, setRagResponding] = React.useState(false);

    const onUpload = async (pdfFilePath: string) => {
        setPdfFilePath("");
        setDocumentLoading(true);
        const response = await loadDocument(pdfFilePath);
        setDocumentLoading(false);
        alert(response);
    };

    const onSendMessage = async (query: string) => {
        setChatHistory(chatHistory + "\nUser: " + query);
        setRagResponding(true);
        setMessageToQuery("");
        const ragResponse = await generateRAG(query);
        setChatHistory(
            chatHistory + "\nUser: " + query + "\nLLM: " + ragResponse,
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
                    id="outlined-multiline-flexible"
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
