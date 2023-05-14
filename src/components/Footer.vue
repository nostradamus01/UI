<script setup>
import { NDropdown, NAutoComplete, NBadge } from 'naive-ui';

</script>

<template>
  <footer class="footer">
    <div class="inner-footer">
      <div class="footer-menu">
        <h1 class="fMenuTitle">Follow Us</h1>
        <div class="fIcons">
          <img src="/images/facebook.png" alt="" class="fIcon">
          <img src="/images/twitter.png" alt="" class="fIcon">
          <img src="/images/instagram.png" alt="" class="fIcon">
          <img src="/images/youtube.png" alt="" class="fIcon">
        </div>
      </div>
      <div class="c-menu">
        <span class="copyright">&copy; 2023 All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  background-color: #fff;
  display: flex;
  justify-content: center;

  .inner-footer {
    height: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    cursor: pointer;
    flex-direction: column;

  }

  .fIcons {
    display: flex;
  }

  .fIcon {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .copyright {
    font-weight: 300;
    font-size: 15px;
  }
}
</style>