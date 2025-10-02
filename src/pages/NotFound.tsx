import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-screen"
  >
    <h1 className="text-6xl font-bold mb-4">404</h1>
    <p className="text-xl mb-8">Page not found</p>
    <Button asChild>
      <Link to="/discovery">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Discovery
      </Link>
    </Button>
  </motion.div>
);

export default NotFound;
