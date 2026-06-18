import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { H4, Muted, P } from "@/components/ui/typography";
import { VehiclePerformanceType } from "@/types/vehicle";
import { Gauge, Orbit, Thermometer, Zap } from "lucide-react";
import { Metadata } from "next"
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";

export async function generateMetadata(
  { params }: { params: Promise<{ vehicleName: string }>},
): Promise<Metadata> {
  const { vehicleName } = await params;
  return {
    title: vehicleName
  }
}

export default async function VehicleDetailsLayout ({ children, params }: { children: ReactNode, params: Promise<{vehicleName: string}>}) {
  //add logic so that real time data are calculated and static data are 
  //updated every 20 seconds using cron jobs

return <div className="py-2 md:px-4 w-full">
        <Suspense fallback={<VehicleHeaderSkeleton />}>
            <VehicleLayoutHeader params={params} />
        </Suspense>
        
        <Suspense fallback={<PerformanceDataSkeleton />}>
            <VehicleLayoutStaticPerformanceData params={params} />
        </Suspense>
        {children}
    </div>
}

function VehicleHeaderSkeleton() {
  return (
    <div className="flex min-w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="h-4 w-48 rounded" />
      </div>
      <div className="w-min">
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>
    </div>
  );
}

async function VehicleLayoutHeader ({ params }: { params: Promise<{vehicleName: string}>}) {
    const { vehicleName } = await params;

    const vehicle = await prisma.vehicle.findUnique({
        where: { vehicleName },
        select: { vehicleName: true, vehicleStats: true, createdAt: true }
    })

    if (!vehicle) notFound();

    return <div className="flex flex-row  min-w-full items-center justify-between">
        <div className="flex items-center gap-2">
            <H4>{vehicle.vehicleName}</H4>
            <Muted>{vehicle.vehicleStats?.weight}kg | {vehicle.vehicleStats?.batteryVoltage}V | {new Date(vehicle.createdAt).toLocaleDateString()}</Muted>
        </div>
        <div className="w-min flex items-center gap-2">
            <Link href={'/'} className="text-nowrap"><Button className="hover:cursor-pointer">Go back</Button></Link>
            <Button variant={'destructive'} className="hover:cursor-pointer">Delete Vehicle</Button>
        </div>
    </div>
}

function PerformanceDataSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-36 mb-2" />
            <Skeleton className="h-3 w-28" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function VehicleLayoutStaticPerformanceData ({ params }: { params: Promise<{vehicleName: string}>}) {
    const { vehicleName } = await params;

    const vehicle = await prisma.vehicle.findUnique({
        where: { vehicleName },
        select: { vehiclePerformance: true }
    })

    if (!vehicle) notFound();

    const { averageSpeed, maxSpeed, averageRpm, averageThrottle, maxBatteryTemp, maxRpm, maxThrottle } = vehicle.vehiclePerformance as VehiclePerformanceType;

    const stats = [
    {
      title: "Speed",
      avg: `${averageSpeed} km/h`,
      max: `${maxSpeed} km/h`,
      icon: <Gauge className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Motor RPM",
      avg: `${averageRpm} rpm`,
      max: `${maxRpm} rpm`,
      icon: <Orbit className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Throttle Position",
      avg: `${averageThrottle}%`,
      max: `${maxThrottle}%`,
      icon: <Zap className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Battery Temp",
      avg: "N/A",
      max: `${maxBatteryTemp} °C`,
      icon: <Thermometer className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            {stat.title !== "Battery Temp" && (
              <div className="text-2xl font-bold">Avg: {stat.avg}</div>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Peak / Max: <span className="font-semibold text-destructive">{stat.max}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}