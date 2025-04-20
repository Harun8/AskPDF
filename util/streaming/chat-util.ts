// util/streaming/chat-util.ts
import { useEffect } from "react";

export function useConversationLogic(
   
  channelA: any,
  setShowThinkingAnimation: (b: boolean) => void,
  setCurrentResponse: (updater: (prev: string) => string) => void,
  setConversation: (updater: (prev: any[]) => any[]) => void
) {
  useEffect(() => {
    if (!channelA) return;

    // subscribe
    const subscription = channelA
      .on("broadcast", { event: "acknowledge" }, (payload: any) => {
        if (payload.payload) {
          setShowThinkingAnimation(false);
          setCurrentResponse(prev => prev + payload.payload.message);
        }

        setConversation(prev => {
          const conv = [...prev];
          const last = conv[conv.length - 1];
          if (last?.type === "response") {
            last.text += payload.payload.message;
          } else {
            conv.push({ type: "response", text: payload.payload.message });
          }
          return conv;
        });
      })
      .subscribe();

    // cleanup on unmount or channel change
    return () => {
      subscription.unsubscribe();
    };
  }, [channelA, setShowThinkingAnimation, setCurrentResponse, setConversation]);
}
