import { readable } from 'svelte/store';
import verses from './verses.js'
import piDigits from './pi.js'

export const verseStore = readable(verses);
export const piStore = readable(piDigits)