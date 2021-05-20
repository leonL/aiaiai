<script>
import Verse from "./Verse.svelte";



  export let aLine;
  export let bLine;
  export let piId;
  export let verseIndex;

</script>

<div class='verse' {verseIndex} {piId}>
  <div class='couplet'>
    <div class='line'>
      {aLine}
    </div>
    <div class='line'>
      {bLine}
    </div>
  </div>
</div>


<style>
  .verse {
    margin: 5px 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: lightgrey;
  }

  .couplet {
    text-align: right;
    padding-right: 5px;
  }

  .line {
    color: black;
  }
</style>