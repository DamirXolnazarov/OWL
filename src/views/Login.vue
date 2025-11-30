<template>
  <section class="w-full h-full flex flex-row justify-center items-center">
    <div class="login w-[390px] shadow-md flex flex-col justify-between items-center bg-[#000] h-[430px]">
      <div class="title w-full flex justify-center">
        <span class="text-center text-5xl text-white">Login</span>
      </div>
      <div class="inputs h-[210px] flex flex-col justify-between w-full">
        <div class="input_email w-full flex flex-col justify-between h-[80px]">
          <div class="input_text w-full flex-row flex justify-between">
            <span class="email opacity-[80%] text-white">Email</span>
            <span class="opacity-[0]" :class="{visible: this.visible==false}">Incorrect password!</span>
          </div>
          <input v-model="email" :class="{visibleInp: this.visible==false}" placeholder="you@example.com" type="text" />
        </div>
        <div class="input_password w-full flex flex-col justify-between h-[110px]">
           <div class="input_text w-full flex-row flex justify-between">
            <span class="email opacity-[80%] text-white">Password</span>
            <span class="additionals">Forgot?</span>
          </div>
          <input v-model="password" :class="{visibleInp: this.visible==false}" type="password" placeholder="******" />
          <div class="create w-full flex flex-row justify-end">
            <span class="additionals text-right">Create an Account</span>
          </div>
        </div>
      </div>
      <div class="buttons w-full flex flex-justify justify-center">
        <button class="btn loginbtn" @click="check()">Log in</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      correct_account: false,
      visible: true,
    }
  },
  methods: {
    check() {
      for (let i of this.email.split('')) {
        if (i == '@' && this.email.split('@')[0] == this.password) {
          this.correct_account = true
          this.$router.push('/dashboard')

        } 
      }
      if (this.correct_account == false) {
        this.visible=false
      }
    },
  },
}
</script>

<style scoped>
.visibleInp{
  border: 2px solid red;
}
.visible{
  color: red;
  opacity: 100%;
  font-weight: 300;
}
.additionals{
  font-size: 16px;
  color: #0080FF;
  cursor: pointer;
  font-weight: 300;
}
.input_text .email {
  font-weight: 300;
  font-size: 19px;
  letter-spacing: 1px;
}
input {
  padding: 15px 15px;
  width: 330px;
  height: 45px;
  color: white;
  font-weight: normal;
  border: 2px solid #ffffff;
  border-radius: 9px;
}
input::placeholder{
  color: grey;
}
section {
  padding: 80px 0px;
  font-family: 'Poppins';
  font-weight: 600;
}
.login {
  padding: 35px 30px;
  border-radius: 15px;
}
.loginbtn {
  padding: 25px 50px;
  font-size: 27px;
  font-weight: 700;
}
</style>
