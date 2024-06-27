export async function loadDocument(pathToDocument: string): Promise<string> {
	const data = {
		filePath: pathToDocument
	}
	const response = await fetch("http://127.0.0.1:8001/load_document", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	});
	const serverResponse = await response.json();
	let message = (serverResponse as PythonServerLoadDocumentResponse)

    if (message?.message) {
        return message.message
    } else if (message?.error) {
        return message.error
    } else {
        return "document not found!"
    }
}

export async function generateRAG(query: string): Promise<string> {
    const data = {
		text: query
	}
	const response = await fetch("http://127.0.0.1:8001/generate_rag", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	});
	const serverResponse = await response.json();
	let message = (serverResponse as PythonServerGenerateRAGResponse)
    if (message?.generate_rag) {
        return message.generate_rag
    } else if (message?.error) {
        return message.error
    } else {
        return "unkown error"
    }
}

interface PythonServerLoadDocumentResponse {
    message?: string
    error?: string
}

interface PythonServerGenerateRAGResponse {
    generate_rag?: string,
    error?: string,
}