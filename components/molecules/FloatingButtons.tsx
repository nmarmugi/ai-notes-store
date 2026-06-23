import { ReactNode } from "react";
import ChatAssistant from "@/components/organisms/ChatAssistant";

interface IFloatingButtons {
  leading?: ReactNode;
}

export default function FloatingButtons({ leading }: IFloatingButtons) {
  return (
    <div className="fixed bottom-4 right-4 flex gap-8">
      {leading}
      <ChatAssistant />
    </div>
  );
}
