<script>
  import { onMount, createEventDispatcher } from 'svelte';

	export let lineA;
  export let lineB;
  export let number

  const dispatch = createEventDispatcher();
  let el;

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.boundingClientRect.top < 0 && entry.isIntersecting === false) {
        // console.log(`verse ${number}`);
        dispatch('verseRead');
        observer.unobserve(el);
      }
    });
  });

  onMount(() => {
    observer.observe(el);
  });
</script>

<div class='verse' {number} bind:this={el}>
  <div class='line-a'>{lineA}</div>
  <div class='line-b'>{lineB}</div>
</div>