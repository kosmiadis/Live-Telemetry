import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { CarFront } from "lucide-react"

export default function VehicleNotFoundPage () {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-auto border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-center">
                <CardHeader className="flex flex-col items-center justify-center pt-8 pb-4 gap-4">
                    <div className="p-4 rounded-full bg-muted/50 border border-border/60 text-muted-foreground/80">
                        <CarFront className="h-10 w-10 stroke-[1.5]" />
                    </div>
                    <CardTitle className="text-3xl font-light tracking-tight mt-2 text-foreground">
                        Vehicle Not Found
                    </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col items-center gap-6 pb-8">
                    <CardDescription className="text-sm text-muted-foreground max-w-[280px] leading-relaxed mx-auto">
                        The specific vehicle you are trying to access does not exist or has been removed from the registry.
                    </CardDescription>
                    
                    <Link href="/" passHref className="w-full max-w-[240px]">
                        <Button 
                            className="w-full tracking-wide font-medium transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
                            variant="secondary"
                        >
                            Return to Dashboard
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}