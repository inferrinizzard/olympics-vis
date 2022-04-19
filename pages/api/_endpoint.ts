const ENDPOINT = 'https://olympicsapi.herokuapp.com/api';

export const getRoute = (slugs: string[]) => `${ENDPOINT}/${slugs.join('/')}`;
