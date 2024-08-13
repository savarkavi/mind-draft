import { Platypi } from "next/font/google";

export const platypi = Platypi({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const Heading = () => {
  return (
    <div
      className={`${platypi.className} w-full max-w-[1200px] mx-auto text-center flex flex-col gap-8 text-[#4dc88a]`}
    >
      <h1 className="text-3xl xl:text-6xl font-extrabold text-balance">
        Streamline Your Thoughts with AI-Powered Notes. Welcome to MindDraft.
      </h1>
      <p className="font-bold text-sm xl:text-lg max-w-[700px] mx-auto">
        MindDraft is your second brain. Create Notes, upload documents and
        summarize and ask question through A.I and easy vector search.
      </p>
    </div>
  );
};

export default Heading;
