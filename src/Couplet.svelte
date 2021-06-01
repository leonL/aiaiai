<script>
  import { getContext, createEventDispatcher, onMount } from 'svelte';
  import CountdownLeader from './CountdownLeader.svelte';
  import { haversine_distance } from './helpers.js';

  const dispatch = createEventDispatcher();
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let correspondingLocaleData;
  export let coupletIndex;
  export let emanate;

  let showLeader = true, showPiSlice = false, coupletHeight;
  $: halfCoupletHeight = Math.round(coupletHeight / 2);

  let renderAsLetters = true;

  let letters = {a: aLine.split(''), b: bLine.split('')},
    aLettersWithIds = letters.a.map((l, i) => ( {id: i, letter: l} )),
    bLettersWithIds = letters.b.map((l, i) => ( {id: i, letter: l} )),
    lettersWithIds = {a: aLettersWithIds, b: bLettersWithIds};

  let aConcealedLetterIds = Array.from(letters.a, (_, i) => i),
    bConcealedLetterIds = Array.from(letters.b, (_, i) => i),
    concealedLetterIds = {a: aConcealedLetterIds, b: bConcealedLetterIds},
    revealedLetterIds = {a: [], b: []},
    revealedLettersWithIds = {a: [], b: []};

  $: {
    revealedLettersWithIds.a = lettersWithIds.a.filter((_, i) => revealedLetterIds.a.includes(i));
    revealedLettersWithIds.b = lettersWithIds.b.filter((_, i) => revealedLetterIds.b.includes(i));
  }

  function revealLettersSerially() {
    let lettersInterval = setInterval(() => {
      if (concealedLetterIds.a.length > 0) {
        revealedLetterIds.a = [...revealedLetterIds.a, concealedLetterIds.a.shift()];
      } else if (concealedLetterIds.b.length > 0) {
        revealedLetterIds.b = [...revealedLetterIds.b, concealedLetterIds.b.shift()];
      } else {
        clearInterval(lettersInterval);
        dispatch('allLettersRevealed', coupletIndex);
      }
    }, 100);
  };

  const deviceCoordinatesPromise = getContext('deviceCoordinates');
  let isNearbyLocale = false;

  function nearbyCorrespondingLocale(deviceCoords, meters = 50) {  
    let metersFromLocale = haversine_distance(deviceCoords, correspondingLocaleData) * 1000,
      nearby = false;
    if (metersFromLocale <= meters) nearby = true;
    return nearby; 
  };

  onMount(async () => {
    isNearbyLocale = await deviceCoordinatesPromise.then(
      coords => {  return nearbyCorrespondingLocale(coords) },
      err => { false }
    );
  });
</script>

<div class='distich' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showLeader && halfCoupletHeight && halfCoupletHeight !== 0}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={halfCoupletHeight} emanate={emanate} 
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showLeader = false; revealLettersSerially() } } />
      </div>
    {/if}
    {#if showPiSlice}
      {piSlice}
    {/if}
  </div>
  {#if renderAsLetters}
    <div class='couplet'>
      <div class='line'>
        {#each lettersWithIds.a as letterData (letterData.id)}
          <span class:revealed={revealedLetterIds.a.includes(letterData.id)}
            class='letter'>{letterData.letter}</span>
        {/each}
      </div>
      <div class='line'>
        {#each lettersWithIds.b as letterData (letterData.id)}
          <span class:revealed={revealedLetterIds.b.includes(letterData.id)}
            class='letter'>{letterData.letter}</span>
        {/each}
      </div>
    </div>
  {:else}
    <div class='couplet'>
      <div class='line'>{aLine}</div>
      <div class='line'>{bLine}</div>
    </div>
  {/if}
</div>

<style>
  .distich {
    margin: 5px 0;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    text-align: right;
    /* border: 1px dotted green; */
  }

  .pi-slice {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: 'Heebo', sans-serif;
    font-size: 3.5vw;
    font-weight: 400;
    width: 5%;
    /* border: 1px solid olivedrab; */
  }
  .countdown-leader {
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid orange; */
  }
  .couplet {
    flex-grow: 1;
    /* border: 1px dashed red; */
  }

  .line {
    min-height: 6vw;
    /* border: 1px solid green; */
  }

  .letter {
    opacity: 0;
  }

  .revealed {
    opacity: 1;
  }
</style>