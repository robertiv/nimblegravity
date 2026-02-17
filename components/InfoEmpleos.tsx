"use client";

import { useState } from "react";
import { enviarPostulacion } from "@/services/api";
import type { Candidato, Empleo } from "@/types";

interface InfoEmpleosProps {
	empleo: Empleo;
	candidato: Candidato | null;
}

export default function InfoEmpleos({ empleo, candidato }: InfoEmpleosProps) {
	const [repoUrl, setRepoUrl] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<boolean>(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!repoUrl.trim() || !candidato) return;

		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const result = await enviarPostulacion({
				uuid: candidato.uuid,
				jobId: empleo.id,
				candidateId: candidato.candidateId,
				applicationId: candidato.applicationId,
				repoUrl: repoUrl.trim(),
			});      

			if (result?.ok === true) {
				setSuccess(true);
				setRepoUrl("");
			} else {
				throw new Error("Respuesta inesperada del servidor.");
			}
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="border border-zinc-200 rounded-md p-4 bg-zinc-50">
			<div className="flex items-start justify-between gap-4 mb-3">
				<div>
					<p className="text-xs text-zinc-400 font-medium uppercase tracking-wider mb-0.5">
						ID: {empleo.id}
					</p>
					<h4 className="text-sm font-semibold text-zinc-800">
						{empleo.title}
					</h4>
				</div>
				{success && (
					<span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-semibold text-green-700">
						<svg
							className="w-3.5 h-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2.5}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						Postulacion enviada con exito!
					</span>
				)}
			</div>

			{!success && (
				<form
					onSubmit={handleSubmit}
					className="flex flex-col sm:flex-row gap-2.5"
				>
					<input
						type="url"
						value={repoUrl}
						onChange={(e) => setRepoUrl(e.target.value)}
						placeholder="https://github.com/usuario/repositorio"
						required
						disabled={!candidato}
						className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-md bg-white text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
					/>
					<button
						type="submit"
						disabled={loading || !repoUrl.trim() || !candidato}
						className="px-4 py-2 text-sm font-semibold bg-zinc-900 text-white rounded-md hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition whitespace-nowrap"
					>
						{loading ? "Enviando..." : "Enviar"}
					</button>
				</form>
			)}

			{!candidato && !success && (
				<p className="mt-2 text-xs text-zinc-400 italic">
					Busca un candidato primero para poder postular.
				</p>
			)}

			{error && (
				<div className="mt-2 px-3 py-2 bg-red-50 border border-red-200 rounded-md">
					<p className="text-xs text-red-600">{error}</p>
				</div>
			)}
		</div>
	);
}
