<script setup>

</script>

<template>
  <footer class="footer">
    <div class="inner-footer">
      <div class="footer-menu">
        <h3>Follow Us</h3>
        <div class="f-icons">
          <img src="/images/facebook.png" alt="" class="f-icon">
          <img src="/images/twitter.png" alt="" class="f-icon">
          <img src="/images/instagram.png" alt="" class="f-icon">
          <img src="/images/youtube.png" alt="" class="f-icon">
        </div>
        <span class="copyright">&copy; 2023 All rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  .inner-footer {
    background-color: #fff;
    display: flex;
    justify-content: center;

    .footer-menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;

      .f-icons {

        img {
          width: 20px;
          height: 20px;
          margin: 10px 0;
          margin-right: 10px;
        }

        .copyright {
          font-weight: 300;
          font-size: 15px;
        }
      }
    }
  }
}
</style>