
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Loader2 } from "lucide-react";
import { simpleChat, type ChatInput, type ChatOutput } from "@/ai/flows/chat-flow";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-bot-message",
      sender: "bot",
      text: "Hello! I'm your FinanceFlow assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      // The direct child of ScrollArea is the Viewport
      const viewport = scrollAreaRef.current.children[0];
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    setInputValue(""); // Clear input immediately

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userMessageText,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const chatInput: ChatInput = { message: userMessageText };
      const response: ChatOutput = await simpleChat(chatInput);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.reply,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: "bot",
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 p-0"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        variant="default"
      >
        {isOpen ? <X className="h-8 w-8" /> : <MessageCircle className="h-8 w-8" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-28 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[550px] z-40 sm:w-full">
          <Card className="w-full h-full flex flex-col shadow-xl border rounded-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-card">
              <CardTitle className="text-lg font-semibold text-card-foreground">AI Assistant</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close chat</span>
              </Button>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden bg-background">
              <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex w-max max-w-[85%] flex-col gap-1 rounded-lg px-3 py-2 text-sm shadow-sm",
                        msg.sender === "user"
                          ? "ml-auto bg-primary text-primary-foreground"
                          : "bg-card border text-card-foreground"
                      )}
                    >
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                      <span className={cn("text-xs self-end pt-1", 
                        msg.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground/80")}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className={cn("flex items-center space-x-2 self-start rounded-lg px-3 py-2 text-sm", "bg-card border text-card-foreground")}>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-3 border-t bg-card">
              <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                  aria-label="Chat message input"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
