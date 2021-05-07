import { readable } from 'svelte/store';
import verses from './verses.js'
import PiCountdown from './piCointdown.js'

export const verseStore = readable(verses);
export const piCountdownStore = readable(PiCountdown)