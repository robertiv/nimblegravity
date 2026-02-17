"use client";

import { useState } from "react";
import { buscarCandidatoPorEmail } from "@/services/api";
import type { Candidato } from "@/types";

interface FormularioCorreoProps {
	InfoCandidato: (candidato: Candidato | null) => void;
}

export default function FormularioCorreo({
	InfoCandidato,
}: FormularioCorreoProps) {
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<Candidato | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		InfoCandidato(null);

		if (!email.trim()) return;

		setLoading(true);
		setError(null);

		try {
			const response = await buscarCandidatoPorEmail(email.trim());
			setData(response);
			InfoCandidato(response);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<section className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
			<h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-4">
				Identificación
			</h2>
			<h3 className="text-lg font-semibold text-zinc-800 mb-5">
				Buscar candidato por correo
			</h3>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col sm:flex-row gap-3"
			>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="correo@ejemplo.com"
					required
					className="flex-1 px-4 py-2.5 text-sm border border-zinc-200 rounded-md bg-zinc-50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition"
				/>
				<button
					type="submit"
					disabled={loading || !email.trim()}
					className="px-5 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-md hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
				>
					{loading ? "Buscando..." : "Buscar"}
				</button>
			</form>

			{error && (
				<div className="mt-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md">
					<p className="text-sm text-red-600">{error}</p>
				</div>
			)}
			{!error && data && (
				<div className="mt-4 px-4 py-3 bg-green-50 border border-green-200 rounded-md">
					<p className="text-sm text-green-600">
						Candidato encontrado!
					</p>
				</div>
			)}
		</section>
	);
}
