<script>
  import { revelationChars, revelationCountdown } from './stores.js';
  import CountdownLeader from './CountdownLeader.svelte';

  export let mainWidth;

  let revelationCharacters, showCountdown;
  revelationChars.subscribe(value => {
    revelationCharacters = value;
  });
  revelationCountdown.subscribe(value => {
    showCountdown = value;
  }); 
</script>

<div class='magnifier'>
  <span class='revelation'>
    { revelationCharacters }
  </span>
  {#if showCountdown && mainWidth && mainWidth !== 0 }
    <div class='countdown-leader'>
      <CountdownLeader radiusMax={200} emanate={true}
      on:leaderWiped= { () => { revelationCountdown.update(_ => false) } } />
    </div>
  {/if}
</div>

<style>
  .magnifier {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .revelation {
    font-size: 20vw;
    text-align: center;
    /* border: 1px dotted red;  */
  }
  
  .magnifier .countdown-leader {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    /* border: 1px solid black;  */
  }

</style>