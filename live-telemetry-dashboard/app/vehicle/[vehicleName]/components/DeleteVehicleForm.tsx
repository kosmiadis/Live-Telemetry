'use client';

import { DeleteVehicleAction } from "@/app/actions/deleteVehicleAction";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useActionState } from "react";

export default function DeleteVehicleForm ({ vehicleId }: { vehicleId: number }) {
    const [_state, deleteAction, isPending] = useActionState(DeleteVehicleAction, null);
    
    return <form action={deleteAction}>
        <input name="vehicleId" defaultValue={vehicleId} hidden/>
        <Button disabled={isPending} variant={'destructive'} className="hover:cursor-pointer">Delete Vehicle</Button>
    </form>
}