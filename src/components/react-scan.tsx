"use client";
// react-scan react'den önce import edilmeli!
import { scan } from "react-scan";

import { useEffect } from "react";

export function ReactScan() {
    useEffect(() => {
        scan({
            enabled: true,
        });
    }, []);

    return null;
}