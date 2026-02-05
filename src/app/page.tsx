import {Editor} from "../features/editor";

export default function Home() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col gap-10 items-center justify-center my-6 font-sans">
      <Editor />
    </div>
  );
}
