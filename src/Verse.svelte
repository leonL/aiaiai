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
        let concealedLinesMeta = getConcealedLinesMetaData();
        if (concealedLinesMeta.length > 0) {
          revealWordAtRandom(concealedLinesMeta);
        } else {
          dispatch('verseRevealed', true)
          clearInterval(revealWordInterval);
        };
      }, 750);
    };
  };

  function revealWordAtRandom(linesMetaData) {
    let selectedLineMeta = linesMetaData[getRandomInt(linesMetaData.length - 1)],
        concealedWordIndicies = verse.couplets[selectedLineMeta.coupletIndex][`${selectedLineMeta.line}ConcealedWords`],
        selectedWordConcealedIndex = getRandomInt(concealedWordIndicies.length - 1);

    let selectedWordIndex = (concealedWordIndicies.splice(selectedWordConcealedIndex, 1))[0],
        selectedLineWords = verse.couplets[selectedLineMeta.coupletIndex][`${selectedLineMeta.line}Words`],
        selectedWord = selectedLineWords[selectedWordIndex];

    dispatch('wordRevealed', selectedWord);
    verse = verse; // trigger component update
  };

  function getConcealedLinesMetaData() {
    let concealedLines = [];
    verse.couplets.forEach((couplet, cIndex) => {
      if (couplet.aConcealedWords.length > 0) concealedLines.push({coupletIndex: cIndex, line: 'a'});
      if (couplet.bConcealedWords.length > 0) concealedLines.push({coupletIndex: cIndex, line: 'b'});
    });
    return concealedLines; 
  } 

  function getRandomInt(max, min = 0) {
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