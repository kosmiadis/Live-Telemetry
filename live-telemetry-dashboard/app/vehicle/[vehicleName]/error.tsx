'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  
  useEffect(() => {
    // Μπορείς να logάρεις το error σε κάποιο υπηρεσία όπως το Sentry
    console.error("Telemetry Error Caught:", error);
  }, [error]);

  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center bg-background text-foreground p-6 rounded-xl border border-destructive/10 animate-fade-in">
      <div className="max-w-md text-center space-y-6">
        
        <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <svg 
            className="w-6 h-6 text-destructive" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {error.message || "An unexpected telemetry error occurred"}
          </h2>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            The connection to the vehicle was interrupted. Please check the hardware status and try again.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Button 
            onClick={unstable_retry}
            variant="outline"
            className="px-6 border-destructive/20 hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            Reconnect to Vehicle
          </Button>
        </div>

        {/* Technical Details (Optional / Secondary) */}
        {error.digest && (
          <p className="text-[10px] font-mono text-muted-foreground/50 pt-4">
            ErrID: {error.digest}
          </p>
        )}
        
      </div>
    </div>
  );
}