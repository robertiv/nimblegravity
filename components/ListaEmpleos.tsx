"use client";

import { useState } from "react";
import { buscarListaEmpleos } from "@/services/api";
import InfoEmpleos from "./InfoEmpleos";
import type { Candidato, Empleo } from "@/types";

interface ListaEmpleosProps {
	candidato: Candidato | null;
}

export default function ListaEmpleos({ candidato }: ListaEmpleosProps) {
	const [empleos, setEmpleos] = useState<Empleo[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [fetched, setFetched] = useState<boolean>(false);

	async function handleFetch() {
		setLoading(true);
		setError(null);

		try {
			const data = await buscarListaEmpleos();
			setEmpleos(data);
			setFetched(true);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
			<h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
				Empleos
			</h2>
			<div className="flex items-center justify-between gap-4 mb-5">
				<h3 className="text-lg font-semibold text-zinc-800">
					Posiciones disponibles
				</h3>
				<button
					onClick={handleFetch}
					disabled={loading}
					className="px-5 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-md hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition whitespace-nowrap"
				>
					{loading
						? "Cargando..."
						: fetched
							? "Recargar lista"
							: "Obtener lista de empleos"}
				</button>
			</div>

			{error && (
				<div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md">
					<p className="text-sm text-red-600">{error}</p>
				</div>
			)}

			{fetched && empleos.length === 0 && !loading && !error && (
				<div className="py-10 text-center">
					<p className="text-sm text-zinc-400">
						No hay posiciones disponibles en este momento.
					</p>
				</div>
			)}

			{empleos.length > 0 && (
				<div className="flex flex-col gap-3">
					{empleos.map((empleo) => (
						<InfoEmpleos key={empleo.id} empleo={empleo} candidato={candidato} />
					))}
				</div>
			)}

			{!fetched && !loading && (
				<div className="py-8 text-center border border-dashed border-zinc-200 rounded-md">
					<p className="text-sm text-zinc-400">
						Haz clic en el botón para ver las posiciones
						disponibles.
					</p>
				</div>
			)}
		</section>
	);
}
