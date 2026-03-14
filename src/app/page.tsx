import Chat from "../features/chat/Chat";
import {Editor} from "../features/editor";

export default function Home() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto my-12 font-sans relative flex flex-col items-center">
      {/* <Chat /> */}
      <header>
        {/* <MenuButton withoutTooltip title="Sign In">Sign In</MenuButton>
        <MenuButton withoutTooltip title="Sign Up">Sign Up</MenuButton> */}
      </header>
      <Editor />
    </div>
  );
}
