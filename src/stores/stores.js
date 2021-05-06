import { readable } from 'svelte/store';
import verses from './verses.js'

export const verseStore = readable(verses);