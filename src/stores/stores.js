import { writable } from 'svelte/store';

import amIWhatIam from './verses.js'
import piCountdown from './piCointdown.js'

const {subscribe, set, update} = writable(0);

let nextVerseIndex = amIWhatIam.length;

const infiniteVerseStore = {
  subscribe,
  addVerse: () => update(currentVerseStore => {
    let nextCountdownIndex = nextVerseIndex % piCountdown.length, 
      nextVerseNumber = piCountdown[nextCountdownIndex],
      nextVerse = amIWhatIam.filter(v => v.number === nextVerseNumber )[0];
      
      // console.log(`next countdown index: ${nextCountdownIndex}`);
      // console.log(`next verse index: ${nextVerseIndex}`);
      // console.log(`next verse number: ${nextVerseNumber}`);

    currentVerseStore[nextVerseIndex] = {
      number: nextVerseNumber,
      a: nextVerse.a,
      b: nextVerse.b
    };

    nextVerseIndex++;

    return currentVerseStore;
  }),
  initialize: () => set(amIWhatIam)
};

infiniteVerseStore.initialize();

export default infiniteVerseStore;