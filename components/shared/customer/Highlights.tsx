import { Card } from '@/components/ui/card';
import React from 'react'

export default function Highlights({ metric, title }: { metric: string; title: string }) {
  return (
    <Card className="flex-1 p-6 bg-gradient-to-br rounded-lg border shadow-sm transition-all duration-300 border-primary/10 hover:shadow-md from-background to-background/80">
      <div className="flex flex-col space-y-2">
        <span className="text-4xl font-bold tracking-tight text-primary">
          {metric}
        </span>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
      <div className="mt-3 w-12 h-1 rounded-full bg-primary/20" />
    </Card>
  );
}
