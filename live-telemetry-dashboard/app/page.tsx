import { H1, H3, H4, Muted } from "@/components/ui/typography";
import { prisma } from "./lib/prisma";
import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Car, Plus, Calendar, Gauge, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

async function VehiclesGrid() {
  const vehicles = await prisma.vehicle.findMany({
    include: {
      vehicleStats: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (vehicles.length === 0) {
    return (
      <Card className="border-dashed flex flex-col items-center justify-center p-8 text-center bg-muted/20">
        <H3>No Registered Vehicles Found</H3>
        <Muted>Get started by registering your first racing vehicle below.</Muted>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {vehicles.map((vehicle) => (
        <Card key={vehicle.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Car className="h-5 w-5 text-primary shrink-0" />
                {vehicle.vehicleName}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(vehicle.createdAt).toLocaleDateString()}</span>
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="pb-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{vehicle.vehicleStats?.color || "N/A"}</Badge>
              <Badge variant="outline">{vehicle.vehicleStats?.weight ? `${vehicle.vehicleStats.weight} kg` : "N/A"}</Badge>
              <Badge variant="outline">
                {vehicle.vehicleStats?.batteryVoltage ? `${vehicle.vehicleStats.batteryVoltage} V` : "N/A"}
              </Badge>
            </div>
          </CardContent>

          <CardFooter className="bg-muted/30 pt-3 border-t flex justify-end">
            <Link href={`/vehicle/${vehicle.vehicleName}`} passHref>
              <Button size="sm" className="gap-1.5 cursor-pointer">
                <Gauge className="h-4 w-4" />
                Launch Telemetry
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function VehiclesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <CardHeader className="pb-3">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardHeader>
          <CardContent className="pb-3">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 pt-3 border-t flex justify-end">
            <Skeleton className="h-9 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full min-h-screen p-4 md:p-8 max-w-[1000px] mx-auto space-y-8">
      <div className="flex flex-col gap-1 pb-4">
        <H1>Live Telemetry Dashboard</H1>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <H4>
            <span>Registered Vehicles</span>
          </H4>
          <Suspense fallback={<VehiclesGridSkeleton />}>
            <VehiclesGrid />
          </Suspense>
        </div>

        <div className="pt-4">
          <div className="p-6 border border-dashed rounded-lg bg-card/50 flex flex-col gap-4">
            <div className="space-y-1">
              <H4>
                <div className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Register a New Vehicle
                </div>
              </H4>
            </div>
            
            <div className="w-full max-w-sm">
              <Button variant="outline" className="w-full justify-start text-muted-foreground">
                Configure telemetry setup...
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}