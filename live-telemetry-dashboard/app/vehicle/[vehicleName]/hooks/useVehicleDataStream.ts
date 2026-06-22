'use client';

import { useContext } from "react";
import { StreamDataCtx } from "../context/VehicleStreamDataContext";

export function useVehicleDataStream () {
    return useContext(StreamDataCtx);
}