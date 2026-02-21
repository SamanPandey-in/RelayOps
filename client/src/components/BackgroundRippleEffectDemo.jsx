"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

export default function BackgroundRippleEffectDemo() {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto">
            <BackgroundRippleEffect rows={20} cols={40} cellSize={60} />
        </div>
    );
}
