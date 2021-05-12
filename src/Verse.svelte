<script>
	export let lineA;
  export let lineB;
  export let piId;

  let showCouplet = false;

  function theBigReveal() {
    showCouplet = true;
  };
</script>

{#if showCouplet}
<div class='couplet'>
  <div class='line-a'>{lineA}</div>
  <div class='line-b'>{lineB}</div>
</div>
{:else}
<div class='piId' on:mousedown={theBigReveal} >
  {piId}
</div>
{/if}

<style>
  .piId {
    font-size: 150px;
  }
</style>