import type {
  Candidato,
  Empleo,
  enviarDatosPostulacion,
  enviarRespuestaApp,
  ApiRespuestaError,
} from "@/types";

const BASE_URL = process.env.API_BASE_URL || "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function buscarCandidatoPorEmail(email: string): Promise<Candidato> {
  const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const responseError = await response.text();
    const error = JSON.parse(responseError || "{}") as ApiRespuestaError & { error?: string };
    throw new Error(error.message || error.error || `Error: No se pudo obtener el candidato.`);
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
    const error = JSON.parse(responseError || "{}") as ApiRespuestaError & { error?: string };
    throw new Error(error.message || error.error || `Error: No se pudo obtener la lista de empleos.`);
  }

  return response.json() as Promise<Empleo[]>;
}

export async function enviarPostulacion(
  datos: enviarDatosPostulacion
): Promise<enviarRespuestaApp> {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const responseError = await response.text();
    const error = JSON.parse(responseError || "{}") as ApiRespuestaError & { error?: string };
    throw new Error(error.message || error.error || `Error: No se pudo enviar la postulación.`);
  }

  return response.json() as Promise<enviarRespuestaApp>;
}
