import OpenAI from "openai";
import type { AssistantStream } from "openai/lib/AssistantStream";
import type { Channel, Event, MessageResponse, StreamChat } from "stream-chat"


export class OpenAIResponseHandler {
    private message_text = ""
    private chunk_counter = 0  // text chunk received for monitoring
    private run_id = ""  // storing run identifier for open ai api operations
}