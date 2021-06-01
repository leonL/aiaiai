<script>
  import { getContext, createEventDispatcher, onMount } from 'svelte';
  import CountdownLeader from './CountdownLeader.svelte';
  import { getRandomInt, secsToMillisecs, minsToMillisecs, haversine_distance } from './helpers.js';

  const dispatch = createEventDispatcher();
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let correspondingLocaleData;
  export let coupletIndex;
  export let iAmCouplet = false;
  export let revealLetters;

  let showLeader = true, showPiSlice = false, coupletHeight;
  $: halfCoupletHeight = Math.round(coupletHeight / 2);

  let renderAsLetters = true;

  $: if (revealLetters) revealLettersAtRandom();

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

  function revealLettersAtRandom() {
    let revealLettersInterval = setInterval(() => {

      let revealLineId = getConcealedLineId();
      
      if (revealLineId) { 
        let lineId = revealLineId, concealedLetterIdIndex = getRandomInt(concealedLetterIds[lineId].length - 1),
          concealedLetterId = concealedLetterIds[lineId].splice(concealedLetterIdIndex, 1);
        revealedLetterIds[lineId] = [...revealedLetterIds[lineId], ...concealedLetterId];
      } else {
        clearInterval(revealLettersInterval);
        setTimeout(() => { renderAsLetters = false }, secsToMillisecs(5))
        dispatch('allLettersRevealed', iAmCouplet);
      };
    }, iAmCouplet ? 0 : 1000);
  };

  function getConcealedLineId() {
    let concealedLineIds = [], concealedLineId = false;

    if (concealedLetterIds.a.length > 0) concealedLineIds.push('a');
    if (concealedLetterIds.b.length > 0) concealedLineIds.push('b');

    if (concealedLineIds.length === 2) {
      concealedLineId = concealedLineIds[getRandomInt(1)];
    } else if (concealedLineIds.length === 1) {
      concealedLineId = concealedLineIds[0];
    };
    return concealedLineId;
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

  function iAmFadeOptions() {
    let delay = isShekhinah ? 0 : secsToMillisecs(getRandomInt(25)),
      duration = isShekhinah ? minsToMillisecs(5) : secsToMillisecs(getRandomInt(15, 1));
    let options = {delay, duration};  
    return options;
  }
</script>

<div class='distich' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showLeader && halfCoupletHeight && halfCoupletHeight !== 0}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={halfCoupletHeight} delayFactor={coupletIndex}
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showLeader = false; dispatch('countdownStep', true) } } />
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
    font-size: 4vw;
    /* border: 1px dashed red; */
  }

  .line {
    min-height: 6vw;
    /* border: 1px solid green; */
  }

  .letter {
    opacity: 0;
    transition-property: opacity;
    transition-duration: 10s;
  }

  .revealed {
    opacity: 1;
  }
</style>