'use server';

import { redirect } from "next/navigation";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteVehicleAction (_prevData: any, formData: FormData) {

    const vehicleId = formData.get('vehicleId') as string;

    try {
        await prisma.vehicle.delete({
            where: { id: parseInt(vehicleId) }
        })
        revalidatePath('/');
        
    } catch (e: any) {   
        console.log(e.message);
        //temporary
        throw e;
    }

    redirect('/')
}