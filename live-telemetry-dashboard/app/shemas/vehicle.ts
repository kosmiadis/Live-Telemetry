import z from "zod"


export const formSchema = z.object({
    vehicleName: z.string().nonempty('Please enter a name').min(3, 'Name must be at least 3 characters'),
    vehicleColor: z.string().nonempty('Please enter a color').min(3, 'Color must be at least 3 characters'),
    vehicleWeight: z.number().nonnegative('Weight can only be a positive value').min(50, 'Weight cannot be less than 50kg'),
    batteryVoltage: z.number().nonnegative('Battery Voltage can only be a positive value').min(20, 'Battery Voltage must be greater than 20V'),
})

export type defaultFormValuesType = z.infer<typeof formSchema>
