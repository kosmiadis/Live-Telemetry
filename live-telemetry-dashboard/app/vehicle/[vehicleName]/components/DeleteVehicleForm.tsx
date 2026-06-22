'use client';

import { deleteVehicleAction } from "@/app/actions/deleteVehicleAction";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export default function DeleteVehicleForm ({ vehicleId }: { vehicleId: number }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [state, deleteVehicle, isPending] = useActionState(deleteVehicleAction, { isSuccess: null, message: null });
    const [_isPending, startTransition] = useTransition();

    function handleDelete (e: any) {
        e.preventDefault();
        startTransition(() => {
            deleteVehicle(vehicleId);
        })
    }

    useEffect(() => {
        //the success section is handle in the deleteVehicleAction with a revalidatePath('/') and a redirect to homepage
        //here we handle only the success state
        if (state?.isSuccess == false){
              setIsOpen(false);
            toast.error(state?.message);
        }
      
    }, [state, router])

    return <>
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild> 
        <Button variant="secondary" className="hover:cursor-pointer">Delete Vehicle</Button>
      </AlertDialogTrigger>
      <AlertDialogContent onEscapeKeyDown={(e) => {
        if (isPending) {
            e.preventDefault()
        }
        }}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the vehicle.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => handleDelete(e)} variant={'destructive'} disabled={isPending}>{isPending ? 'Deleting...' : 'Delete'}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
}