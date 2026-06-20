'use client';

import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import RegisterVehicleForm from "./register-vehicle-form";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterVehicle () {
    const [open, setOpen] = useState(false);

    function handleOnSuccess () {
      setOpen(false);
      toast.success('Vehicle was registered');
    }

    return<div className="pt-4">
          <div className="p-6 border border-dashed rounded-lg bg-card/50 flex flex-col gap-4">
            <div className="w-full max-w-sm">
              <Sheet modal open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                  <div className="hover:cursor-pointer hover:text-stone-600 dark:hover:text-stone-200 flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Register a New Vehicle
                  </div>
                  </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Register a new Vehicle</SheetTitle>
                    <SheetDescription>You can edit Vehicle's data after register in Vehicle Details page.</SheetDescription>
                  </SheetHeader>
                    <RegisterVehicleForm onSuccess={() => setOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
}