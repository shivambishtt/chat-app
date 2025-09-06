import OpenAI from "openai";
import type { AssistantStream } from "openai/lib/AssistantStream";
import type { Channel, Event, MessageResponse, StreamChat } from "stream-chat"


export class OpenAIResponseHandler {
    private message_text = ""
    private chunk_counter = 0  // text chunk received for monitoring
    private run_id = ""  // storing run identifier for open ai api operations
    private is_done = false
    private last_update_time = 0


    constructor(
        private readonly openai: OpenAI,
        private readonly openAiThread: OpenAI.Beta.Thread,
        private readonly assistantStream: AssistantStream,
        private readonly chatClient: StreamChat,
        private readonly channel: Channel,
        private readonly message: MessageResponse,
        private readonly onDispose: () => void,
    ) {
        // utility in order to stop open ai server from generating stream
        this.chatClient.on("ai_indicator.stop", this.handleStopGenerating)
    }
    run = async () => { }
    dispose = async () => { }
    private handleStopGenerating = async (event: Event) => { }
    private handleStreamEvent = async (event: Event) => { }
    private handleError = async (event: Event) => { }
    private performWebSearch = async (query: string): Promise<string> => {
        const TAVILY_API_KEY = process.env.TAVILY_API_KEY

        if (!TAVILY_API_KEY) {
            return JSON.stringify({
                error: "Web search is not availaible, API Key not configured "
            })
        }
        console.log(`Performing web search for ${query}`)
        try {
            const response = await fetch("https://api.tavily.com/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TAVILY_API_KEY}`
                },
                body: JSON.stringify({
                    query: query,
                    search_depth: "advanced",
                    max_results: 5,
                    include_answer: true,
                    include_raw_content: false
                })
            })
            if (!response.ok) {
                const errorText = await response.text()
                console.log(`Tavily search failedf for query ${query}`);

            }
        } catch (error) {

        }
    }
}