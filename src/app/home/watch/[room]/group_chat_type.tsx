import { ContentTypeId } from "@xmtp/xmtp-js";

// Create a unique identifier for your content type
export const ContentTypeGroupChat = new ContentTypeId({
  authorityId: "puzzle",
  typeId: "group-chat",
  versionMajor: 1,
  versionMinor: 0,
});

// Define the GroupChat class
export class ContentTypeGroupChatCodec {
  get contentType() {
    return ContentTypeGroupChat;
  }

  // The encode method accepts an object with two numbers (a, b) and encodes it as a byte array
  encode({ origin, message }: { origin: string, message: string }) {
    return {
      type: ContentTypeGroupChat,
      parameters: {},
      content: new TextEncoder().encode(JSON.stringify({ origin, message })),
    };
  }

  // The decode method decodes the byte array, parses the string into numbers (a, b), and returns their product
  decode(content: { content: any }) {
    const uint8Array = content.content;
    const { origin, message } = JSON.parse(new TextDecoder().decode(uint8Array));
    return { origin, message };
  }

  fallback() {
    return 'unhandled group message type';
  }
}