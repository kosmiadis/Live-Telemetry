import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { H4, Muted } from "@/components/ui/typography";
import { Metadata } from "next"
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import DeleteVehicleForm from "./components/DeleteVehicleForm";
import VehicleStreamBinaryDataProvider from "./context/VehicleStreamDataContext";
import VehicleLayoutPerformanceContent from "./components/VehicleLayoutPerformanceContent";

export async function generateMetadata(
  { params }: { params: Promise<{ vehicleName: string }>},
): Promise<Metadata> {
  const { vehicleName } = await params;

  const vehicle = await prisma.vehicle.findUnique({
    where: {
      vehicleName
    },
    select: { id: true }
  })

  if (!vehicle) notFound();

  return {
    title: vehicleName
  }
}

export default async function VehicleDetailsLayout ({ children, params }: { children: ReactNode, params: Promise<{vehicleName: string}>}) {
  
  const { vehicleName} = await params;
  
  return <div className="py-2 md:px-4 w-full">
    <VehicleStreamBinaryDataProvider vehicleName={vehicleName}>
        <Suspense fallback={<VehicleHeaderSkeleton />}>
            <VehicleLayoutHeader params={params} />
        </Suspense>
        
        <Suspense fallback={<PerformanceDataSkeleton />}>
            <VehicleLayoutStaticPerformanceData params={params} />
        </Suspense>

        {children}
      </VehicleStreamBinaryDataProvider>
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
        select: { id: true, vehicleName: true, vehicleStats: true, createdAt: true }
    })

    //vehicle does not exist
    if (!vehicle) notFound();

    return <div className="flex flex-row  min-w-full items-center justify-between">
        <div className="flex items-center gap-2">
            <H4>{vehicle.vehicleName}</H4>
            <Muted>{vehicle.vehicleStats?.weight}kg | {vehicle.vehicleStats?.batteryVoltage}V | {new Date(vehicle.createdAt).toLocaleDateString()}</Muted>
        </div>
        <div className="w-min flex items-center gap-2">
            <Link href={'/'} className="text-nowrap"><Button className="hover:cursor-pointer">Go back</Button></Link>
            <DeleteVehicleForm vehicleId={vehicle.id}/>
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

    //vehicle does not exist
    if (!vehicle) notFound();

    //@ts-ignore
    return <VehicleLayoutPerformanceContent vehicle={vehicle}/>
}