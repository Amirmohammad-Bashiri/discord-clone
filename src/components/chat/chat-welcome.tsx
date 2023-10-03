import { Hash } from "lucide-react";

type ChatWelcomeProps = {
  type: "channel" | "conversation";
  name: string;
};

function ChatWelcome({ type, name }: ChatWelcomeProps) {
  return (
    <div className="px-4 mb-4 space-y-2">
      {type === "channel" ? (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="w-12 h-12 text-white" />
        </div>
      ) : null}

      <p className="text-xl font-bold md:text-3xl">
        {type === "channel" ? "Welcome to #" : null}
        {name}
      </p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {type === "channel"
          ? `This is the start of the #${name} channel.`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
}

export default ChatWelcome;
