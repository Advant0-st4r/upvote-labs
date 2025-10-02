import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

export const ProjectWizard = () => {
  const [step, setStep] = useState(1);
  const [idea, setIdea] = useState({ title: '', description: '' });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleSubmit = async () => {
    toast({
      title: 'Idea Generated',
      description: `Title: ${idea.title}`,
    });
  };

  const steps = [
    {
      title: 'Describe Your Idea',
      content: (
        <Input
          placeholder="Idea title"
          value={idea.title}
          onChange={(e) => setIdea({ ...idea, title: e.target.value })}
        />
      ),
    },
    {
      title: 'Add Details',
      content: (
        <Input
          placeholder="Description"
          value={idea.description}
          onChange={(e) => setIdea({ ...idea, description: e.target.value })}
        />
      ),
    },
    {
      title: 'Generate',
      content: (
        <Button onClick={handleSubmit}>
          <Zap className="h-4 w-4 mr-2" /> Generate Project
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4 max-w-md">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Project Wizard - Step {step}/{steps.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="mb-4">{steps[step - 1].title}</h2>
            {steps[step - 1].content}
          </CardContent>
        </Card>
        <div className="flex justify-between">
          {step > 1 && <Button variant="outline" onClick={handlePrev}>Previous</Button>}
          {step < steps.length ? <Button onClick={handleNext}>Next</Button> : null}
        </div>
      </motion.div>
    </div>
  );
};
