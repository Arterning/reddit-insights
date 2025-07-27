'use client';

import type { AnalyzeRedditDataOutput } from '@/ai/flows/analyze-reddit-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Bot, ExternalLink, Share2 } from 'lucide-react';

type Post = NonNullable<AnalyzeRedditDataOutput['relevantPosts']>[0];

interface AnalysisResultProps {
  result: AnalyzeRedditDataOutput;
  onSelectPost: (post: Post) => void;
  onShare: () => void;
}

export function AnalysisResult({ result, onSelectPost, onShare }: AnalysisResultProps) {
  const { marketDemandAnalysis, relevantPosts } = result;

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader className="flex-row items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="font-headline">AI Market Analysis</CardTitle>
            <CardDescription>
              Based on Reddit discussions and trends.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 pr-4">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {marketDemandAnalysis}
            </p>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </CardFooter>
      </Card>

      {relevantPosts && relevantPosts.length > 0 && (
        <div>
          <h3 className="text-xl font-bold font-headline mb-4">Relevant Reddit Posts</h3>
          <div className="space-y-4">
            {relevantPosts.map((post, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base font-medium">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.snippet}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="outline" size="sm" onClick={() => onSelectPost(post)}>
                    View Details
                  </Button>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    View on Reddit <ExternalLink className="h-3 w-3" />
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
