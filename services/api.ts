import type {
	Candidato,
	Empleo,
	enviarDatosPostulacion,
	enviarRespuestaApp,
	ApiRespuestaError,
} from "@/types";

const BASE_URL =
	process.env.API_BASE_URL ||
	"https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function buscarCandidatoPorEmail(
	email: string,
): Promise<Candidato> {
	const response = await fetch(
		`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
		{
			method: "GET",
			headers: { "Content-Type": "application/json" },
		},
	);

	if (!response.ok) {
		const responseError = await response.text();
		const error = JSON.parse(responseError || "{}") as ApiRespuestaError & {
			error?: string;
		};
		throw new Error(
			error.message ||
				error.error ||
				`Error: No se pudo obtener el candidato.`,
		);
	}

	return response.json() as Promise<Candidato>;
}

export async function buscarListaEmpleos(): Promise<Empleo[]> {
	const response = await fetch(`${BASE_URL}/api/jobs/get-list`, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	});

	if (!response.ok) {
		const responseError = await response.text();
		const error = JSON.parse(responseError || "{}") as ApiRespuestaError & {
			error?: string;
		};
		throw new Error(
			error.message ||
				error.error ||
				`Error: No se pudo obtener la lista de empleos.`,
		);
	}

	return response.json() as Promise<Empleo[]>;
}

export async function enviarPostulacion(
	datos: enviarDatosPostulacion,
): Promise<enviarRespuestaApp> {
	const requestBody = {
		uuid: datos.uuid,
		jobId: datos.jobId,
		candidateId: datos.candidateId,
		applicationId: datos.applicationId,
		repoUrl: datos.repoUrl,
	};

	const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(requestBody),
	});

	console.log("Payload enviado a apply-to-job:", requestBody);

	if (!response.ok) {
		const rawError = await response.text();
		let parsedError: (ApiRespuestaError & { error?: string }) | null = null;

		try {
			parsedError = JSON.parse(rawError || "{}") as ApiRespuestaError & {
				error?: string;
			};
		} catch {
			parsedError = null;
		}

		const backendMessage =
			parsedError?.message || parsedError?.error || rawError || "Sin detalle";

		console.error("Error en apply-to-job", {
			status: response.status,
			statusText: response.statusText,
			backendMessage,
			rawError,
			requestBody,
		});

		throw new Error(
			`Error al enviar postulación: ${backendMessage}`,
		);
	}

	return response.json() as Promise<enviarRespuestaApp>;
}
