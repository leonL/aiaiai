<script>
  import { createEventDispatcher } from 'svelte';
  import Couplet from './Couplet.svelte';
  
  export let verse;
  
  let countdown = 0;
  const dispatch = createEventDispatcher();

  function addMetaDataToCouplet(couplet) {
    couplet.aWords = couplet.a.split(' ');
    couplet.aConcealedWords = Array.from(couplet.aWords, (_, i) => i);  
    couplet.bWords = couplet.b.split(' ');
    couplet.bConcealedWords = Array.from(couplet.bWords, (_, i) => i);
  };
  
  verse.couplets.forEach(couplet => {
    addMetaDataToCouplet(couplet); 
  });
  
  function countdownToReveal(_) {
    if (++countdown === verse.couplets.length) {
      let revealWordInterval = setInterval(() => {
        let linesWithConcealedWords = linesWithConcealedWordsByCoupletIndex();
        if (linesWithConcealedWords.length > 0) {
          revealWordAtRandom(linesWithConcealedWords);
        } else {
          dispatch('verseRevealed', true)
          clearInterval(revealWordInterval);
        };
      }, 750);
    };
  };

  function revealWordAtRandom(lines) {
    let randomLine = lines[getRandomIntInclusive(lines.length - 1)],
        concealedWordsIndex = verse.couplets[randomLine.coupletIndex][`${randomLine.line}ConcealedWords`],
        randomWordIndex = getRandomIntInclusive(concealedWordsIndex.length - 1);

    concealedWordsIndex.splice(randomWordIndex, 1);
    verse = verse; // trigger component update
  };

  function linesWithConcealedWordsByCoupletIndex() {
    let linesWithConcealedWords = [];
    verse.couplets.forEach((couplet, cIndex) => {
      if (couplet.aConcealedWords.length > 0) linesWithConcealedWords.push({coupletIndex: cIndex, line: 'a'});
      if (couplet.bConcealedWords.length > 0) linesWithConcealedWords.push({coupletIndex: cIndex, line: 'b'});
    });
    return linesWithConcealedWords; 
  } 

  function getRandomIntInclusive(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLineWords={couplet.aWords} aLineConcealedWords={couplet.aConcealedWords}
      bLineWords={couplet.bWords} bLineConcealedWords={couplet.bConcealedWords}
      piSlice={couplet.piSlice} coupletIndex={i}
      on:countdownStep={ () => countdownToReveal(i) } />
  {/each}
</div>

<style>
  .verse {
    display: flex;
		flex-direction: column;
    margin-bottom: 20px;
    /* border: 1px solid violet; */
  }
</style>