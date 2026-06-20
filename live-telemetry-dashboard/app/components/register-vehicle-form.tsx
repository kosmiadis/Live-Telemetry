'use client';

import { useForm } from '@tanstack/react-form';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useTransition } from 'react';
import { registerVehicleAction } from '../actions/registerVehicleActions';
import { defaultFormValuesType, formSchema } from '../shemas/vehicle';
import { isErrored } from 'stream';
import { toast } from 'sonner';


const defaultFormValues: defaultFormValuesType = {
    vehicleName: '',
    vehicleColor: '',
    vehicleWeight: 50,
    batteryVoltage: 20,
}

export default function RegisterVehicleForm ({ onSuccess }: { onSuccess: () => void }) {
    const startTransition = useTransition()[1];
    
    const [state, registerVehicle, isPending] = useActionState(registerVehicleAction, { isError: undefined });

    const form = useForm({
        defaultValues: defaultFormValues,
        validators: {
            onChange: formSchema
        },
        onSubmit: async ({ value: formValues }) => {
            startTransition(async () => {
                registerVehicle(formValues);
                onSuccess();
            });
        }
    })

    useEffect(() => {
        //run only if isError == true
        if (state.isError) {
            toast.error(state.message);
        }
    }, [state.isError])
    
    return <form className='p-4 flex flex-col gap-2' onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
    }}>
           {/* asyncDebounceMs is the minimum time that the user has stopped typing so a request is sent to see if vehicle with VehicleName exists already */}
           <form.Field asyncDebounceMs={500} name="vehicleName" children={(field) => <Field>
               <FieldLabel>Vehicle Name</FieldLabel>
               <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} name='vehicleName'/>
               {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive mt-1">
                        {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                    </p>
                )}
           </Field>} />

           <form.Field name="vehicleColor" children={(field) => <Field>
               <FieldLabel>Vehicle Color</FieldLabel>
               <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} name='vehicleColor'/>
               {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive mt-1">
                        {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                    </p>
                )}
           </Field>} />
            
           <form.Field name="vehicleWeight" children={(field) => <Field>
               <FieldLabel>Vehicle Weight</FieldLabel>
               <Input value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} type='number' name='vehicleWeight'/>
               {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive mt-1">
                        {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                    </p>
                )}
           </Field>} />
            
           <form.Field name="batteryVoltage" children={(field) => <Field>
               <FieldLabel>Battery Voltage</FieldLabel>
               <Input value={field.state.value} onChange={(e) => field.handleChange(parseInt(e.target.value))} type='number' name='batteryVoltage'/>
               {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive mt-1">
                        {field.state.meta.errors.map((err: any) => err.message).join(', ')}
                    </p>
                )}
           </Field>} />
                

            <form.Subscribe
              selector={(state) => [state.isSubmitting, state.canSubmit]}
              children={([isSubmitting, canSubmit]) => (
                <Button type="submit" disabled={isSubmitting || !canSubmit || isPending} className="w-full">
                  {((isSubmitting && canSubmit) || isPending) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering Vehicle...
                    </>
                  ) : (
                    "Register Vehicle"
                  )}
                </Button>
              )}
            />
            
       </form>
}