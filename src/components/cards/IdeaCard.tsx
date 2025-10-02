// src/components/cards/IdeaCard.tsx
import { Component, createMemo } from 'solid-js';

type Props = {
  id: string;
  title: string;
  subreddit?: string;
  trend?: string;
  complexity?: number;
  impact?: number;
  onSelect?: (id: string) => void;
};

const IdeaCard: Component<Props> = (props) => {
  const fitScore = createMemo(() => {
    const impact = props.impact ?? 5;
    const complexity = props.complexity ?? 5;
    const trendBoost = props.trend === 'hot' ? 10 : props.trend === 'rising' ? 5 : 0;
    return impact * 10 - complexity * 4 + trendBoost;
  });

  return (
    <article class="border rounded p-4 hover:shadow cursor-pointer" onClick={() => props.onSelect?.(props.id)}>
      <h3 class="font-semibold">{props.title}</h3>
      <div class="text-xs text-slate-500 mt-1">{props.subreddit ?? '—'}</div>
      <div class="mt-2 text-sm">
        <span class="mr-3">Impact: {props.impact ?? '-'}</span>
        <span>Complexity: {props.complexity ?? '-'}</span>
      </div>
      <div class="mt-2 text-xs text-slate-400">Fit: {fitScore()}</div>
    </article>
  );
};

export default IdeaCard;
