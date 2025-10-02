import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getForumPosts } from '@/lib/mockData';

export const Forum = () => {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['forumPosts'],
    queryFn: getForumPosts,
  });

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading forum...</div>;
  }

  if (isError) {
    return <div className="container mx-auto p-4">Error loading forum</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
      <div className="space-y-4">
        {posts.map((post: any) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments} comments
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
