import { Eye, TrendingUp, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Idea, emitAnalyticsEvent } from '@/lib/mockData';

interface IdeaCardProps {
  idea: Idea;
  onInspect: (id: string) => void;
  onGenerate: (id: string) => void;
}

export const IdeaCard = ({ idea, onInspect, onGenerate }: IdeaCardProps) => {
  const getDemandScoreClass = (score: number) => {
    if (score >= 80) return 'gauge-high';
    if (score >= 60) return 'gauge-medium';
    return 'gauge-low';
  };

  const getComplexityClass = (complexity: string) => {
    if (complexity === 'Low') return 'complexity-low';
    if (complexity === 'Medium') return 'complexity-medium';
    return 'complexity-high';
  };

  const handleInspect = () => {
    emitAnalyticsEvent('idea_inspect_open', { ideaId: idea.id });
    onInspect(idea.id);
  };

  const handleGenerate = () => {
    emitAnalyticsEvent('idea_generate_click', { ideaId: idea.id });
    onGenerate(idea.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="card-hover card-glow border-border/50">
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-lg bg-surface border flex items-center justify-center overflow-hidden">
                <img 
                  src={idea.thumbnail} 
                  alt={idea.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `data:image/svg+xml,${encodeURIComponent(
                      `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="96" height="96" fill="#F7F7F8"/>
                        <path d="M48 32C44.6863 32 42 34.6863 42 38C42 41.3137 44.6863 44 48 44C51.3137 44 54 41.3137 54 38C54 34.6863 51.3137 32 48 32Z" fill="#6B7280"/>
                        <path d="M32 52C32 50.8954 32.8954 50 34 50H62C63.1046 50 64 50.8954 64 52V62C64 63.1046 63.1046 64 62 64H34C32.8954 64 32 63.1046 32 62V52Z" fill="#6B7280"/>
                      </svg>`
                    )}`;
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
                    {idea.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {idea.summary}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {idea.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {idea.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{idea.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Demand Score Gauge */}
                <div className={`gauge ${getDemandScoreClass(idea.demandScore)}`}>
                  {idea.demandScore}
                </div>
              </div>

              {/* Metrics Row */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <span className={getComplexityClass(idea.complexity)}>
                    {idea.complexity}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{idea.timeToMVP}</span>
                </div>

                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{idea.upvotes} upvotes</span>
                </div>

                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{idea.seedPosts.length} signals</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={handleInspect}
                className="gap-2 min-w-[100px]"
              >
                <Eye className="w-4 h-4" />
                Inspect
              </Button>
              
              <Button
                className="btn-compact gap-2 min-w-[100px]"
                onClick={handleGenerate}
              >
                Generate
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};