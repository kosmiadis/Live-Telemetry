import { VehicleScalarFieldEnum } from "@/app/generated/prisma/internal/prismaNamespace";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    const { vehicleName } = (await request.json()) as { vehicleName: string };
    
    try {
        if (!vehicleName) throw new Error('Vehicle name was not provided');

        const vehicle = await prisma.vehicle.findUnique({ 
            where: {
                vehicleName
            },
            select: {
                id: true,
                vehiclePerformance: true,
            }
        })

        if (!vehicle) throw new Error('Vehicle not found');

        //if a vehicle is already registered
        if (vehicle.id && !vehicle.vehiclePerformance) return NextResponse.json({ message: 'no'})

        return NextResponse.json({ vehicle });

    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 400 });
    }
}