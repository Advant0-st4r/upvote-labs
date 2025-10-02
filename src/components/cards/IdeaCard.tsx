import { createMemo } from "solid-js";
import type { Problem } from "../../lib/problem";

export default function IdeaCard(props: { problem: Problem; onSelect: (p: Problem) => void }) {
  const problem = createMemo(() => props.problem);

  return (
    <div
      class="p-4 border rounded cursor-pointer hover:shadow-md"
      onClick={() => props.onSelect(problem())}
    >
      <h3 class="font-semibold">{problem().title}</h3>
      <p>Subreddit: {problem().subreddit}</p>
      <p>Trend: {problem().trend}</p>
    </div>
  );
}
