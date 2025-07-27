'use client';

import { useState } from 'react';
import type { AnalyzeRedditDataInput, AnalyzeRedditDataOutput } from '@/ai/flows/analyze-reddit-data';
import { analyzeRedditDataAction, chatWithReportAction } from '@/app/actions';
import { AnalysisResult } from '@/components/analysis-result';
import { ChatBox, type Message } from '@/components/chat-box';
import { IdeaForm } from '@/components/idea-form';
import { Icons } from '@/components/icons';
import { Header } from '@/components/layout/header';
import { PostViewer } from '@/components/post-viewer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type Post = NonNullable<AnalyzeRedditDataOutput['relevantPosts']>[0];

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeRedditDataOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async (data: AnalyzeRedditDataInput) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setChatMessages([]);
    try {
      const result = await analyzeRedditDataAction(data);
      setAnalysisResult(result);
      setChatMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Here's your initial analysis. Feel free to ask follow-up questions about the report.",
        },
      ]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError('An error occurred during analysis. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!analysisResult || !analysisResult.marketDemandAnalysis) return;

    const newMessages: Message[] = [
      ...chatMessages,
      { id: Date.now().toString(), role: 'user', content: message },
    ];
    setChatMessages(newMessages);
    setIsChatLoading(true);

    try {
      const response = await chatWithReportAction({
        ideaDescription: message, // User's question
        problemStatement: analysisResult.marketDemandAnalysis, // Context
        targetAudience: 'user seeking clarification', // Context
        redditData: analysisResult.marketDemandAnalysis,
      });
      setChatMessages([
        ...newMessages,
        { id: Date.now().toString() + 'ai', role: 'assistant', content: response.report },
      ]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setChatMessages([
        ...newMessages,
        { id: Date.now().toString() + 'err', role: 'assistant', content: `Sorry, I couldn't process that. ${errorMessage}` },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleShare = () => {
    if (!analysisResult?.marketDemandAnalysis) return;
    navigator.clipboard.writeText(analysisResult.marketDemandAnalysis);
    toast({
      title: 'Copied to Clipboard',
      description: 'The analysis report has been copied to your clipboard.',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">
        <div className="container mx-auto px-4 py-8">
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tighter">Validate Your Idea with AI</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
              Enter your business concept and let our AI analyze Reddit discussions to gauge market demand and discover key insights.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
            <div className="mb-12 lg:mb-0">
              <Card className="sticky top-20 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Icons.lightbulb className="w-6 h-6" />
                    Describe Your Idea
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <IdeaForm onSubmit={handleAnalysis} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold font-headline text-center lg:text-left">Analysis & Insights</h2>
              {isLoading && <AnalysisSkeleton />}
              {error && (
                <Card className="border-destructive">
                  <CardHeader>
                    <CardTitle className="text-destructive">Analysis Failed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{error}</p>
                  </CardContent>
                </Card>
              )}
              {!isLoading && !analysisResult && !error && <WelcomePlaceholder />}
              {analysisResult && (
                <div className="space-y-8">
                  <AnalysisResult
                    result={analysisResult}
                    onSelectPost={setSelectedPost}
                    onShare={handleShare}
                  />
                  <ChatBox
                    messages={chatMessages}
                    onSendMessage={handleSendMessage}
                    isLoading={isChatLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <PostViewer post={selectedPost} open={!!selectedPost} onOpenChange={(isOpen) => !isOpen && setSelectedPost(null)} />
    </div>
  );
}

const WelcomePlaceholder = () => (
  <div className="text-center border-2 border-dashed rounded-lg p-12">
    <Icons.logo className="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 className="mt-4 text-lg font-medium font-headline">Your analysis will appear here</h3>
    <p className="mt-1 text-sm text-muted-foreground">Fill out the form to get started.</p>
  </div>
);

const AnalysisSkeleton = () => (
  <div className="space-y-8">
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/2" />
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
