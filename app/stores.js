import { writable } from 'svelte/store';

export const trendingResults = writable([])
export const trendingPage = writable(0)
export const trendingTotalPages = writable(0)
export const trendingTotalResults = writable(0)