<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	import amIWhatIam from './data/amIWhatIAm.js';
	import piCountdown from './data/piCointdown.js';
	
	import Verse from './Verse.svelte';

	export let title;

	let countdown = piCountdown, countdownLength = countdown.length;
	let verseIndex = 0, poemLength = amIWhatIam.length;

	let firstVerseObj = { ...amIWhatIam[verseIndex], index: verseIndex };
	let verses = [firstVerseObj];

	let poemElement, doomScrollInterval;

	function addVerse() {
		let nextVerse, nextCountdownIndex = ++verseIndex % countdownLength

		if (nextCountdownIndex < poemLength) {
			nextVerse = amIWhatIam[nextCountdownIndex];
		} else {
			let nextVersePid = countdown[nextCountdownIndex];
			nextVerse = amIWhatIam.filter(v => v.pid === nextVersePid)[0];
		}
		let nextVesrseObj = { ...nextVerse, index: verseIndex}
		let nextVerseSet = [...verses, nextVesrseObj];

		let firstVerseEl = poemElement.querySelector(".verse"),
			elBottomPosition = firstVerseEl.getBoundingClientRect().bottom;	

		if (elBottomPosition < 0) nextVerseSet.shift();

		verses = nextVerseSet;
		return true;
	}
	
	const options = { duration: 0 };

	onMount(async () => {
		doomScroll();
	});

	function doomScroll() {
		doomScrollInterval = setInterval(() => {
			addVerse(); 
		}, 0);
	};

	function suspendDoomScroll() {
		clearInterval(doomScrollInterval);
	};

	function handleKeydown(event) {
		if (event.keyCode === 73) suspendDoomScroll();
	}
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<svelte:window on:keydown={handleKeydown}/>

<main bind:this={poemElement}>
	{#each verses as verse (verse.index)}
		<div animate:flip={options} class="verse" on:mousedown={suspendDoomScroll} on:touchstart={suspendDoomScroll} 
			on:mouseup={doomScroll} on:touchend={doomScroll}>
			<Verse lineA={verse.a} lineB={verse.b} number={verse.number} />
		</div>
	{/each}
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
	.verse {
    padding-bottom: 10px;
  }
</style>