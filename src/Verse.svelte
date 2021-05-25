<script>
  import Couplet from './Couplet.svelte';
  import CoupletMagnifier from './CoupletMagnifier.svelte';
  
  export let verse;
  
  let countdown = 0, iAmCoupletIndex;
  $: iAmCoupletRevealed = iAmCoupletIndex !== undefined;

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

  function coupletRevealed(coupletIndex) {
    let iAmCoupletConcealed = !iAmCoupletRevealed;
    if (iAmCoupletConcealed) {
      iAmCoupletIndex = coupletIndex;
    }
    return true;
  };

  function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

</script>

<div class='verse'>
  {#each verse.couplets as couplet, i}
    <Couplet aLine={couplet.a} bLine={couplet.b}  
      aLineLetters={couplet.aLetters} aLineConcealedLetters={couplet.aConcealedLetters}
      bLineLetters={couplet.bLetters} bLineConcealedLetters={couplet.bConcealedLetters}
      piSlice={couplet.piSlice} coupletIndex={i} aiwia={ iAmCoupletRevealed && iAmCoupletIndex === i }
      on:countdownStep={ () => countdownToLetterFadeIn(i) }
      on:allLettersRevealed={ (event) => coupletRevealed(event.detail) } />
  {/each}
  {#if iAmCoupletRevealed}
    <CoupletMagnifier couplet={verse.couplets[iAmCoupletIndex]} on:iAmCoupletMagnified />
  {/if}
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