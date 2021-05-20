<script>
  
  export let aLine;
  export let bLine;
  export let piId;
  export let coupletIndex;

</script>

<div class='couplet' {coupletIndex} {piId}>
  <div class='line'>
    {aLine}
  </div>
  <div class='line'>
    {bLine}
  </div>
</div>

<style>
  .couplet {
    margin: 5px 5px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color:lightgrey;
    text-align: right;
  }
</style>