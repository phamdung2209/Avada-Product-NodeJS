import {routePrefix} from '../config/app';

/**
 * @param url
 * @returns {string}
 */
export default function getUrl(url) {
  return routePrefix + url;
}
