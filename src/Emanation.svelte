<script>
  /* And the words are the letters of the words said, electrically played */
  import { afterUpdate, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher()

  export let wordQueue;
  
  let theWord = "", letterInterval = false, letterSpan = 0;
  
  afterUpdate(() => {
    if (letterInterval === false && wordQueue.length > 0) {
      theWord = wordQueue[0];
      emanateLetterByLetter();
    }
	});
  
  function emanateLetterByLetter() {
    letterSpan = 0;
    dispatch('emanatingTheWord', theWord);
    letterInterval = setInterval(() => {
      if (letterSpan < theWord.length) {
        letterSpan++;
      } else {
        clearInterval(letterInterval);
        letterInterval = false;
        letterSpan = 0;
      };
    }, 250);
  };
</script>

<div class='the-word'>
  {#each theWord.substr(0, letterSpan) as letter, i (i)}
    <span class='letter'>
      {letter}
    </span>
  {/each}
</div>

<style>
  .the-word {
    width: 100%;
    text-align: center;
    font-size: 12vw;
    min-height: 10%;
  }

  .letter {
    margin: 0 -5px;
    /* border: 1px dotted red; */
  }
</style>