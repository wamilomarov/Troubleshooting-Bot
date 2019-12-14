export interface Csr {
  'data': Array<{
    '_id': {
      '$oid': string
    },
    "csr_id": string,
    "customer": string,
    "contact_person": string,
    "contact_person_name": string,
    "contact_person_email": string,
    "slogan": string,
    "problem_description": string,
    "solution_description": string
  }>
}
