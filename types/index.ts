export interface Candidato {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Empleo {
  id: string;
  title: string;
}

export interface enviarDatosPostulacion {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}

export interface enviarRespuestaApp {
  ok: boolean;
}

export interface ApiRespuestaError {
  message?: string;
}
