import {ContactPerson} from './contact-person';

export interface Csr {
  'data': Array<{
    '_id': {
      '$oid': string
    },
    'csr_id': string,
    'customer': string,
    'contact_person': ContactPerson,
    'slogan': string,
    'problem_description': string,
    'solution_description': string
  }>,
  'links': {
    'first': string,
    'last': string,
    'prev': string,
    'next': string
  },
  "meta": {
    "current_page": number,
    "per_page": number,
    "total": number
  }

}
