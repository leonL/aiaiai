<script>
  import Couplet from './Couplet.svelte';
  import { getRandomInt } from './helpers.js';
  
  export let verse;
  
  const coupletCount = 3;
  let countdown = 0, iAmCoupletIndex = getRandomInt(coupletCount - 1);

  function addLetterMetaDataToCouplet(couplet) {
    couplet.aLetters = couplet.a.split('');
    couplet.aConcealedLetters = Array.from(couplet.aLetters, (_, i) => i);  
    couplet.bLetters = couplet.b.split('');
    couplet.bConcealedLetters = Array.from(couplet.bLetters, (_, i) => i);
  };
  
  verse.couplets.forEach(couplet => {
    addLetterMetaDataToCouplet(couplet); 
  });
  
  function countdownToLetterFadeIn(_) {
    if (++countdown === verse.couplets.length) {
      let revealLettersInterval = setInterval(() => {
        let concealedLinesMeta = getConcealedLinesMetaData();
        if (concealedLinesMeta.length > 0) {
          revealLetterAtRandom(concealedLinesMeta);
        } else {
          clearInterval(revealLettersInterval);
        };
      }, 100);
    };
  };

  function revealLetterAtRandom(linesMetaData) {
    let selectedLineMeta = linesMetaData[getRandomInt(linesMetaData.length - 1)],
        concealedLettersIndicies = verse.couplets[selectedLineMeta.coupletIndex][`${selectedLineMeta.line}ConcealedLetters`],
        selectedLettersConcealedIndex = getRandomInt(concealedLettersIndicies.length - 1);

    let selectedLetterIndex = (concealedLettersIndicies.splice(selectedLettersConcealedIndex, 1))[0],
        selectedLineLetters = verse.couplets[selectedLineMeta.coupletIndex][`${selectedLineMeta.line}Letters`],
        selectedLetter = selectedLineLetters[selectedLetterIndex];
    verse = verse; // trigger component update
    return selectedLetter;
  };

  function getConcealedLinesMetaData() {
    let concealedLines = [];
    verse.couplets.forEach((couplet, cIndex) => {
      if (couplet.aConcealedLetters.length > 0) concealedLines.push({coupletIndex: cIndex, line: 'a'});
      if (couplet.bConcealedLetters.length > 0) concealedLines.push({coupletIndex: cIndex, line: 'b'});
    });
    return concealedLines; 
  };

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLineLetters={couplet.aLetters} aLineConcealedLetters={couplet.aConcealedLetters}
      bLineLetters={couplet.bLetters} bLineConcealedLetters={couplet.bConcealedLetters}
      piSlice={couplet.piSlice} coupletIndex={i} iAmCouplet={ iAmCoupletIndex === i }
      on:countdownStep={ () => countdownToLetterFadeIn(i) } on:verseSequenceComplete />
  {/each}
</div>

<style>
  .verse {
    position: relative;
    display: flex;
		flex-direction: column;
    margin-bottom: 20px;
    /* border: 1px solid violet; */
  }
</style>