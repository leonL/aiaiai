<script>
	// import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	import amIWhatIam from './data/amIWhatIAm.js';
	import piCountdown from './data/piCointdown.js';
	
	import Verse from './Verse.svelte';
	import Letter from './Letter.svelte';

	export let title;

	let windowHeight;

	let countdown = piCountdown, countdownLength = countdown.length;
	let verseIndex = 0, poemLength = amIWhatIam.length;

	let firstVerseObj = { ...amIWhatIam[verseIndex], index: verseIndex };
	let verses = [];

	let poemElement, doomScrollInterval;

	function addVerse() {
		let nextVerse, nextCountdownIndex = ++verseIndex % countdownLength

		if (nextCountdownIndex < poemLength) {
			nextVerse = amIWhatIam[nextCountdownIndex];
		} else {
			let nextVersePid = countdown[nextCountdownIndex];
			nextVerse = amIWhatIam.filter(v => v.piId === nextVersePid)[0];
		}
		let nextVesrseObj = { ...nextVerse, index: verseIndex}
		let nextVerseSet = [...verses, nextVesrseObj];

		let firstVerseEl = poemElement.querySelector(".verse"),
			elBottomPosition = firstVerseEl.getBoundingClientRect().bottom;	

		if (elBottomPosition < 0) nextVerseSet.shift();

		verses = nextVerseSet;
		doomScroll();
		return true;
	}
	
	const options = { duration: 500 };

	$: duration = ((verseIndex + 1) % 3 === 0) ? 5000 : 1000;

	function doomScroll() {
		doomScrollInterval = setTimeout(() => {
			addVerse(); 
		}, duration);
	};

	function suspendDoomScroll() {
		clearTimeout(doomScrollInterval);
	};

	function handleKeydown(event) {
		if (event.keyCode === 73) suspendDoomScroll();
	};

	$: thirdOfWindowHeight = Math.round(windowHeight / 3);
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown} bind:innerHeight={windowHeight} />

<main bind:this={poemElement} >
	<Verse lineA={firstVerseObj.a} lineB={firstVerseObj.b} piId={firstVerseObj.piId} />
	<!-- {#each verses as verse (verse.index)}
	<div animate:flip={options} class="verse">
	</div>
	{/each}
	<Letter lineA={firstVerseObj.a} lineB={firstVerseObj.b} piId={firstVerseObj.piId} /> -->
</main>


<style>
	main {
		margin: 0;
		position: absolute;
		bottom: 0;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		text-align: center;
		font-size: 14px;
	}
	/* .verse {
		display: flex;
		justify-content: center;
		align-items: center;
  } */
</style>