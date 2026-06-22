'use server';

import { revalidatePath } from "next/cache";
import { defaultFormValuesType } from "../shemas/vehicle";
import { prisma } from "../lib/prisma";

type RegisterVehicleReturnStateType = {
    isError: boolean | undefined;
    message?: string | undefined;
};

export async function registerVehicleAction (_prevState: RegisterVehicleReturnStateType, formValues: defaultFormValuesType): Promise<RegisterVehicleReturnStateType> {
    try {
        await prisma.vehicle.create({
            data: {
                vehicleName: formValues.vehicleName,
                vehicleStats: {
                    create: {
                        batteryVoltage: formValues.batteryVoltage,
                        color: formValues.vehicleColor,
                        weight: formValues.vehicleWeight
                    }
                }
            }
        })
        revalidatePath('/');
        return { isError: false };
    }
    catch (e: any) {
        return { isError: true, message: 'Vehicle was not registered' };
    }
}