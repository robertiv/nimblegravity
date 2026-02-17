"use client";

import type { Candidato } from "@/types";

interface InfoCandidatoProps {
  candidato: Candidato;
}

interface Field {
  label: string;
  value: string;
}

export default function InfoCandidato({ candidato }: InfoCandidatoProps) {
  //console.log("Mostrando info del candidato:", candidato);
  //console.log("Nombre completo:", `${candidato.firstName} ${candidato.lastName}`);
  if (!candidato) return null;

  const fields: Field[] = [
    { label: "Nombre", value: `${candidato.firstName} ${candidato.lastName}` },
    { label: "Email", value: candidato.email },
    { label: "ID de Candidato", value: candidato.candidateId },
    { label: "ID de Aplicación", value: candidato.applicationId },
    { label: "UUID", value: candidato.uuid },
  ];

  return (
    <section className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
        Candidato encontrado
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-sm font-medium text-zinc-800 break-all">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
