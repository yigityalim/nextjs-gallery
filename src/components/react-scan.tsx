"use client";
// react-scan react'den önce import edilmeli!
import { scan } from "react-scan";

import { useEffect } from "react";

export function ReactScan({ scan: _scan }: Readonly<{ scan: boolean }>) {
    useEffect(() => {
        scan({
            enabled: _scan,
        });
    }, []);

    return null;
}