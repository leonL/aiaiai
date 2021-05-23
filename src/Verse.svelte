<script>
  import { createEventDispatcher } from 'svelte';
  import Couplet from './Couplet.svelte';
  
  export let verse;
  
  let countdown = 0;
  const dispatch = createEventDispatcher();

  function wrapCouplet(c) {
    c.aWords = c.a.split(' ');
    c.aConcealedWords = Array.from(c.aWords, (_, i) => i);  
    c.bWords = c.b.split(' ');
    c.bConcealedWords = Array.from(c.bWords, (_, i) => i);
  };
  
  verse.couplets.forEach(couplet => {
    wrapCouplet(couplet); 
  });
  
  function revealWordsCountdown(_) {
    if (++countdown === verse.couplets.length) {
      let revealWordInterval = setInterval(() => {
        let linesWithConcealedWords = linesWithConcealedWordsByCoupletIndex();
        if (linesWithConcealedWords.length > 0) {
          revealWord(linesWithConcealedWords);
        } else {
          dispatch('verseRevealed', true)
          clearInterval(revealWordInterval);
        };
      }, 750);
    };
  };

  function revealWord(lines) {
    let randomLine = lines[getRandomIntInclusive(0, lines.length - 1)];
    let concealedWordsIndex = verse.couplets[randomLine.coupletIndex][`${randomLine.line}ConcealedWords`];
    let randomWordIndex = getRandomIntInclusive(0, concealedWordsIndex.length - 1);
    concealedWordsIndex.splice(randomWordIndex, 1);
    verse = verse;
  };

  function linesWithConcealedWordsByCoupletIndex() {
    let linesWithConcealedWords = [];
    verse.couplets.forEach((couplet, cIndex) => {
      if (couplet.aConcealedWords.length > 0) linesWithConcealedWords.push({coupletIndex: cIndex, line: 'a'});
      if (couplet.bConcealedWords.length > 0) linesWithConcealedWords.push({coupletIndex: cIndex, line: 'b'});
    });
    return linesWithConcealedWords; 
  } 

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLineWords={couplet.aWords} aLineConcealedWords={couplet.aConcealedWords}
      bLineWords={couplet.bWords} bLineConcealedWords={couplet.bConcealedWords}
      piSlice={couplet.piSlice} coupletIndex={i}
      on:countdownStep={ () => revealWordsCountdown(i) } />
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