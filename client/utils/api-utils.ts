import { localPythonServerConnectionString } from "./connections";
export async function helloWorld(): Promise<string> {
	const response = await fetch(`${localPythonServerConnectionString}/hello_world`, {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        //   "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
		},
	});

	const hello = await response.json();
	return JSON.stringify(hello)
}

export async function queryLLM(input: string): Promise<string> {
	const data = {
		text: input
	}
	const response = await fetch("http://localhost:8001/generate_code", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	}); // Replace with locally hosted docker container and pass in {input} query
	const movies = await response.json();
	return JSON.stringify(movies)
}

export async function sendLLMChatMessageQuery(input: string): Promise<string> {
	const data = {
		text: input
	}
	const response = await fetch("http://localhost:8001/generate_code", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	});
	const LLMResponse = await response.json();
	let generatedCodeResponse = (LLMResponse as PythonServerAPIResponse).generated_code
	// Remove repeated query before sending response.
	// return generatedCodeResponse
	return generatedCodeResponse.replace(data.text, "");
}

export async function inlinePythonCompletionLLMQuery(input: string): Promise<string> {
	const data = {
		text: "You are an expert Python dev following SOLID design principles using sound quality. You only respond in code blocks. Please generate an implementation for the following Python code without an explanation: " + input
	}
	const response = await fetch("http://localhost:8001/generate_code", {
		method: "POST",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify(data)
	});
	const LLMResponse = await response.json();
	let generatedCodeResponse = (LLMResponse as PythonServerAPIResponse).generated_code
	// Remove repeated query before sending response.
	return generatedCodeResponse.replace(data.text, "");
}

interface PythonServerAPIResponse {
	generated_code: string
}