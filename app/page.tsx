"use client";

import { useState } from "react";
import FormularioCorreo from "@/components/FormularioCorreo";
import InfoCandidato from "@/components/InfoCandidato";
import ListaEmpleos from "@/components/ListaEmpleos";
import type { Candidato } from "@/types";

export default function Home() {
  const [candidato, setCandidato] = useState<Candidato | null>(null);

  return (
    <main className="min-h-screen bg-zinc-100 py-10 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">
            Mini proyecto para postulacion (Nimble Gravity)
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Este proyecto es dedicado a mi postulacion como fullstack dev jr (Victor Roberti).
          </p>
        </div>

        {/* Step 1: Find candidate */}
        <FormularioCorreo InfoCandidato={setCandidato} />

        {/* Step 2: Show candidate info */}
        {candidato && <InfoCandidato candidato={candidato} />}

        {/* Step 3: Job listings */}
        <ListaEmpleos candidato={candidato} />

      </div>
    </main>
  );
}
