<script>
  import { onMount, createEventDispatcher, afterUpdate } from 'svelte';
  import { blur, fade } from 'svelte/transition';
  import CountdownLeader from './CountdownLeader.svelte';
  import { getRandomInt, secsToMillisecs, haversine_distance } from './helpers.js';
  import { quadOut } from 'svelte/easing';

  const dispatch = createEventDispatcher();
  
  export let aLine;
  export let bLine;
  export let piSlice;
  export let correspondingLocaleData;
  export let coupletIndex;
  export let iAmCouplet = false;
  export let revealLetters;

  let showCountdown = false, showPiSlice = false, renderAsLetters = true, coupletHeight, distanceFromLocale;

  navigator.geolocation.getCurrentPosition(pos => {
    distanceFromLocale = haversine_distance(pos.coords, correspondingLocaleData) * 1000;
  });

  onMount(() => {
    showCountdown = true;
	});

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
      };
    }, iAmCouplet ? 100 : (100 * getRandomInt(6, 3)));
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

  function sproutLetter(node, params) {
		return {
			delay: params.delay || 0,
			duration: params.duration || secsToMillisecs(10),
			easing: params.easing || quadOut,
			css: (t, _) => `font-size: ${t * 100}%; opacity: ${t}`
		};
	};

  const lettersCount = letters.a.length + letters.b.length;

  let lettersSproutedCount = 0,  showIamText = false;

  function letterSprouted() {
    lettersSproutedCount++;
    if (lettersSproutedCount >= lettersCount) {
      if (iAmCouplet) showIamText = true;
      renderAsLetters = false;
    }
  };

  function getBlurInOptions() {
    let options = {delay: 0, duration: 0, opacity: 100};
    if (iAmCouplet) options = {duration: secsToMillisecs(getRandomInt(120, 10)), opacity: 10};
    return options; 
  };

  function blurIntroStart() {
    if (iAmCouplet) dispatch('verseSequenceComplete', true);
  };

  function blurIntroEnd() {
    if (iAmCouplet && showIamText) showIamText = false;
  };

  function nearbyCorrespondingLocale(meters = 50) {
    let nearby = false;
    if (distanceFromLocale <= meters) nearby = true;
    return nearby; 
  };
</script>

<div class='distich' bind:clientHeight={coupletHeight} >
  <div class='pi-slice'>
    {#if showCountdown}
      <div class='countdown-leader'>
        <CountdownLeader radiusMax={Math.round(coupletHeight / 3)} delayFactor={coupletIndex}
          on:leaderDilated= { () => { showPiSlice = true; } }
          on:leaderWiped= { () => { showCountdown = false; dispatch('countdownStep', true) } } />
      </div>
    {/if}
    {#if showPiSlice}
      {piSlice}
    {/if}
  </div>
  {#if renderAsLetters}
    <div class='couplet'>
      <div class='line'>
        {#each revealedLettersWithIds.a as letterData (letterData.id)}
          <span in:sproutLetter|local on:introend={() => letterSprouted() }
            class='letter'>{letterData.letter}</span>
        {/each}
      </div>
      <div class='line'>
        {#each revealedLettersWithIds.b as letterData (letterData.id)}
          <span in:sproutLetter|local on:introend={() => letterSprouted() }
            class='letter'>{letterData.letter}</span>
        {/each}
      </div>
    </div>
  {:else}
    <div class='couplet' in:blur|local={getBlurInOptions()} 
      on:introstart={() => blurIntroStart()} on:introend={() => blurIntroEnd() }>
      <div class='line'>
        {#if showIamText}
          <span out:fade|local={{delay: secsToMillisecs(getRandomInt(25)), duration: secsToMillisecs(getRandomInt(15, 1)) }} 
            class='i-am'>{#if nearbyCorrespondingLocale()}Here {/if}I am </span>
        {/if}
        {aLine}
      </div>
      <div class='line'>
        {bLine}
      </div>
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
    min-height: 5.2vw;
    /* border: 1px solid green; */
  }
</style>