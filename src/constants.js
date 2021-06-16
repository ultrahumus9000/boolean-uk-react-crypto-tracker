const API = "https://api.coingecko.com/api/v3";

export const STATUS_UPDATES = `${API}/status_updates`;
export const CRIPTO_LIST = `${API}/coins/markets?vs_currency=gbp`;
export const getCriptoUpdateUrl = (id) =>
  `${API}/simple/price?ids=${id}&vs_currencies=gbp&include_last_updated_at=true`;

function request(url) {
  return fetch(url).then((resp) => resp.json());
}
export function getCripto() {
  return request(CRIPTO_LIST);
}
export function getNews() {
  return request(STATUS_UPDATES);
}
export function updatePrice(id) {
  return request(getCriptoUpdateUrl(id));
}
