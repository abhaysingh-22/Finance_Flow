
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Loader2, Bot, User, Minimize2, Maximize2 } from "lucide-react";
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-bot-message",
      sender: "bot",
      text: "👋 Hello! I'm your FinanceFlow AI assistant. I can help you with budgeting tips, expense tracking, financial insights, and answer any questions about managing your finances. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.children[0];
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageText = inputValue.trim();
    setInputValue("");

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userMessageText,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    simulateTyping();

    try {
      const chatInput: ChatInput = { message: userMessageText };
      const response: ChatOutput = await simpleChat(chatInput);
      
      // Add slight delay for better UX
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: response.reply,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error("Chatbot error:", error);
      setTimeout(() => {
        const errorMessage: ChatMessage = {
          id: `error-${Date.now()}`,
          sender: "bot",
          text: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment. 🔧",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 800);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={toggleOpen}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 p-0 transition-all duration-300 hover:scale-110",
          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          "border-2 border-white dark:border-gray-800",
          isOpen && "scale-90"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className="relative">
          {isOpen ? (
            <X className="h-6 w-6 text-white transition-transform duration-200" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white transition-transform duration-200" />
          )}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          )}
        </div>
      </Button>

      {/* Chat Dialog */}
      {isOpen && (
        <div 
          className={cn(
            "fixed bottom-24 right-6 z-40 transition-all duration-300 ease-out",
            "w-[calc(100vw-3rem)] max-w-sm",
            isMinimized ? "h-16" : "h-[70vh] max-h-[600px]",
            "sm:w-96 md:max-w-md lg:max-w-lg"
          )}
        >
          <Card className={cn(
            "w-full h-full flex flex-col shadow-2xl border-2 rounded-xl overflow-hidden",
            "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950",
            "border-gray-200 dark:border-gray-700",
            "backdrop-blur-sm",
            isMinimized && "rounded-t-xl rounded-b-none"
          )}>
            <CardHeader className={cn(
              "flex flex-row items-center justify-between p-4 border-b",
              "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
              "border-gray-200 dark:border-gray-700"
            )}>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-6 w-6" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">AI Assistant</CardTitle>
                  <p className="text-xs text-blue-100">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMinimize}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                  <span className="sr-only">{isMinimized ? "Maximize" : "Minimize"}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close chat</span>
                </Button>
              </div>
            </CardHeader>
            
            {!isMinimized && (
              <>
                <CardContent className="flex-1 p-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                  <ScrollArea className="h-full p-4 chat-scrollbar" ref={scrollAreaRef}>
                    <div className="space-y-4">
                      {messages.map((msg, index) => (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex gap-3 items-start animate-in slide-in-from-bottom-2 duration-300",
                            msg.sender === "user" ? "justify-end" : "justify-start"
                          )}
                        >
                          {msg.sender === "bot" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          
                          <div className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm relative",
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md"
                          )}>
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                              {msg.text}
                            </div>
                            <div className={cn(
                              "text-xs mt-2 opacity-70",
                              msg.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                            )}>
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>

                          {msg.sender === "user" && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {(isLoading || isTyping) && (
                        <div className="flex gap-3 items-start animate-in slide-in-from-bottom-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex items-center space-x-2">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
                
                <CardFooter className="p-4 border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                  <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-3">
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                        className={cn(
                          "pr-12 rounded-full border-2 focus:ring-2 focus:ring-blue-500/20 transition-all",
                          "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
                          "placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        )}
                        aria-label="Chat message input"
                        autoComplete="off"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={isLoading || !inputValue.trim()}
                      className={cn(
                        "rounded-full h-10 w-10 shadow-lg transition-all duration-200",
                        "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        !isLoading && inputValue.trim() && "hover:scale-105"
                      )}
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        <Send className="h-4 w-4 text-white" />
                      )}
                    </Button>
                  </form>
                </CardFooter>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
