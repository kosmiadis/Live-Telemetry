import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

        return NextResponse.json({ vehicle });

    } catch (e: any) {
        return NextResponse.json({ message: e.message }, { status: 400 });
    }
}

//route for keeping latest live performance stats in db
export async function PATCH (request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    
    if(!searchParams) throw new Error('Vehicle id search param is required');
    
    const vehicleId = searchParams.get("vehicleId");

    if (!vehicleId) throw new Error('Vehicle id search param is missing do ...?vehicleId=[...]')
    
    //contains all updates made during the live tracking 
    const body = await request.json();

    if (!body) throw new Error('Vehicle performance body was not provided');

    try {
        await prisma.vehicle.update({
            where: {
                id: parseInt(vehicleId)
            },
            data: {
                vehiclePerformance: {
                    update: body.vehiclePerformanceUpdates
                } 
            }
        })

        return NextResponse.json({ message: 'performance stored in db'});
    } catch (e: any) {
        console.log(e.message);
        return NextResponse.json({ message: e.message }, { status: 400 });
    }
}