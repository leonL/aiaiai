<script>
  import { onMount, tick } from 'svelte';
  
  export let aLine;
  export let bLine;
  export let piId;
  export let coupletIndex;

  const aLineWords = aLine.split(' '), bLineWords = bLine.split(' '),
    allWords = [...aLineWords, ...bLineWords],
    allWordsCount = allWords.length;

  let wordIndex = 0, letterIndex = 0;

  $: currentWord = (wordIndex < allWordsCount) ? allWords[wordIndex] : false;
  $: wordLength = currentWord.length;

  onMount(async () => {
    while (wordIndex < allWordsCount) {
      await emanateLetters();
      wordIndex++;
      await tick();
    }
  });

  function emanateLetters() {
    letterIndex = 0;
    
    const emanateLettersPromise = new Promise(resolve => {
      let letterInterval = setInterval(() => {
        if (letterIndex < wordLength) {
          letterIndex++;
        } else {
          clearInterval(letterInterval);
          resolve(true);
        };
      }, 500);
    });
    return emanateLettersPromise;
  };

</script>

<div class='couplet' {coupletIndex} {piId}>
  <div class='line'>
    {#each aLineWords as word, i}
      <span style="color: {wordIndex >= i ? 'black' : 'white'}">{word} </span>
    {/each}
  </div>
  <div class='line'>
    {#each bLineWords as word, i}
      <span style="color: {wordIndex >= (i + aLineWords.length) ? 'black' : 'white'}">{word} </span>
    {/each}
  </div>
  {#if currentWord}
  <div class='emanation'>
    <span class='letters'>
      {#each currentWord as letter, i}
        <span style="color: {letterIndex >= i ? 'black' : 'white'}">{letter}</span>  
      {/each}
    </span>
  </div>
  {/if}
</div>

<style>
  .couplet {
    margin: 5px 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: right;
    /* border: 1px solid red; */
  }

  .emanation {
    text-align: center;
    /* border: 1px dotted black; */
  }
  .letters {
    font-size: 15vw;
    /* border: 1px dashed orange; */
  }
</style>