<script lang="ts">
  import { removeNotificationById } from "$lib/helper/appNotifications";
  import { onMount } from "svelte";

  export let linkHref = "";
  export let disappearing: boolean;
  export let text: string;
  export let linkText = "View";
  export let notifId: number;

  const touch = {
    isDown: false,
    x: 0,
    startPosX: 0,
  };

  let moveNotifBy = "";

  function touchStartHandler(e: any) {
    console.log(e);
    touch.isDown = true;
    touch.x = e.clientX ?? e.touches[0].clientX;
    touch.startPosX = e.clientX ?? e.touches[0].clientX;
  }

  function touchEndHandler(e: any) {
    if (Math.abs(touch.startPosX - touch.x) > 100) {
      moveNotifBy = touch.x < touch.startPosX ? " - 100vw" : " + 100vw";

      disappearing = true;

      setTimeout(() => {
        removeNotificationById(notifId);
      }, 300);
    }

    touch.isDown = false;
    touch.x = 0;
    touch.startPosX = 0;
  }

  function touchMoveHandler(e: any) {
    if (touch.isDown) {
      touch.x = e.clientX ?? e.touches[0].clientX;
    }
  }

  onMount(() => {
    document.addEventListener("mouseup", touchEndHandler);
    document.addEventListener("touchend", touchEndHandler);
    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("mousemove", touchMoveHandler);

    return () => {
      document.removeEventListener("mouseup", touchEndHandler);
      document.removeEventListener("touchend", touchEndHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("mousemove", touchMoveHandler);
    };
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:touchstart={touchStartHandler}
  on:mousedown={touchStartHandler}
  class="app-notification {linkHref ? 'flex-between' : ''}"
  style="transform: translateX(calc(-50% {disappearing
    ? moveNotifBy
    : ` + ${-1 * (touch.startPosX - touch.x)}px`}
      ));
      
      opacity:{(
    touch.x < touch.startPosX
      ? touch.x / touch.startPosX
      : touch.startPosX / touch.x
  )
    ? touch.x < touch.startPosX
      ? touch.x / touch.startPosX
      : touch.startPosX / touch.x
    : touch.isDown && touch.x === 0
      ? 0
      : 1};transition:{!touch.isDown ? '.3s' : ''}"
>
  <p class="no-select">{text}</p>
  {#if linkHref}
    <a
      on:click={() => {
        removeNotificationById(notifId);
      }}
      class="hover-underline weight-500"
      href={linkHref}>{linkText}</a
    >
  {/if}
</div>
