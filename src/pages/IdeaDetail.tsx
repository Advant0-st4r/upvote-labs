import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upvote, Share } from 'lucide-react';
import { motion } from 'framer-motion';
import { getIdeaById } from '@/lib/mockData';

export const IdeaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: idea, isLoading, isError } = useQuery({
    queryKey: ['idea', id],
    queryFn: () => getIdeaById(Number(id)),
  });

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading idea...</div>;
  }

  if (isError || !idea) {
    return <div className="container mx-auto p-4">Error loading idea</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-4 max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>{idea.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{idea.description}</p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Upvote className="h-5 w-5" />
              <span>{idea.upvotes}</span>
            </div>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
