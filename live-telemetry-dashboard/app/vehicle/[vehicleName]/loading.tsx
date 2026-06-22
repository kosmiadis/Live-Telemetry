import { H2 } from "@/components/ui/typography";
import { Loader2 } from "lucide-react";

export default function VehicleDataLoading () {
    return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4 p-6 text-center animate-fade-in">
            <div className="relative flex items-center justify-center">
            <div className="absolute h-12 w-12 rounded-full border border-primary/30 animate-ping duration-1000 opacity-40" />
                
                <div className="relative p-3 rounded-full bg-muted/30 border border-border/40 backdrop-blur-sm">
                    <Loader2 className="h-6 w-6 animate-spin text-primary stroke-[1.5]" />
                </div>
            </div>

            
            <div className="space-y-1 mt-2">
                <H2>
                    Establishing Connection
                </H2>
                <p className="text-xs text-muted-foreground/80 tracking-wider uppercase animate-pulse">
                    Fetching live vehicle data...
                </p>
            </div>
        </div>
    );
}