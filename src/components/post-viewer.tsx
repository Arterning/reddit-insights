'use client';

import type { AnalyzeRedditDataOutput } from '@/ai/flows/analyze-reddit-data';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ExternalLink } from 'lucide-react';

type Post = NonNullable<AnalyzeRedditDataOutput['relevantPosts']>[0];

interface PostViewerProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PostViewer({ post, open, onOpenChange }: PostViewerProps) {
  if (!post) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="font-headline text-xl">{post.title}</SheetTitle>
          <SheetDescription>
            A relevant post found during the analysis.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            <h4 className="font-semibold">Snippet from post:</h4>
            <blockquote className="border-l-2 pl-6 italic text-muted-foreground">
              {post.snippet}
            </blockquote>
          </div>
        </ScrollArea>
        <div className="p-6 border-t bg-background/95">
           <Button asChild className="w-full">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full Post on Reddit
            </a>
           </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
