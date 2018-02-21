<template>
  <div :class="$style.page">
    <div :class="$style.header">
      <input :class="$style.filter" type="text" v-model="search" @keyup="filter()" placeholder="Search" />
      <span :class="$style.count">{{zeroNumber(count)}}</span>
      <span :class="$style.pages">{{page}}/1667</span>
    </div>
    <section :class="$style.section">
      <ul :class="$style.list">
        <li :class="$style.item" v-for="dollar in dollars" @mouseover="setPage(dollar.page)" @mouseout="setPage('0000')">
          <span :class="$style.number">{{dollar.key}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      data: {},
      items: [],
      page: '0000',
      searchKey: '',
      dollars: [],
      count: 0,
      timer: null
    }
  },

  created () {
    this.getDollars()
      .then(this.set)
      .catch(error => {
        console.warn(error)
      })
  },

  computed: {
    search: {
      get () {
        return this.searchKey
      },
      set (val) {
        this.searchKey = val.toUpperCase()
      }
    }
  },

  methods: {
    async getDollars () {
      let dollars = await axios.get('data/onemilliondollar.json')
      this.data = dollars.data
    },
    set () {
      this.items = Object.keys(this.data).map((k) => this.data[k])
      this.dollars = this.items
      this.count = this.dollars.length
    },
    setPage (p) {
      this.page = p
    },
    filter () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.search.length > 0) {
          this.dollars = this.items.filter(item => (item.key.toLowerCase()).indexOf(this.search.toLowerCase()) > -1)
          this.count = this.dollars.length
        } else {
          this.dollars = this.items
          this.count = this.dollars.length
        }
      }, 200)
    },
    zeroNumber (number) {
      let zeros = ''
      let countLen = number.toString().length
      for (let i = countLen, l = 5; i < l; i++) { zeros += '0' }
      return `${zeros}${number}`
    }
  }
}
</script>

<style lang="scss" module>
body {
  font-size: 15px;
}
.page {
  margin: 2em;
}
.header {
  padding: .5em 0 2em;
}
.section {
  display: flex;
  overflow: hidden;
}
.list {  
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin: -5px;
}
.item {
  flex-basis: 110px;
  margin: 5px;
}
.number {
  display: block;
  &:hover,
  &:active {
    color: red;
    cursor: crosshair;
  }
}
input.filter {
  width: 200px;
  color: black;
  padding: .3em .5em;
  ::placeholder {
    color: white;
  }
  &,
  &:hover, 
  &:focus {
    border: 1px solid rgb(80,80,80);
  }
}

.count {
  margin-left: 18px;
}

.pages {
  margin-left: 18px;
}

@media (max-width: 460px) {
  .page {
    margin: 0 1em;
  }
  .header {
    padding: 2em 1em 0;
    position: fixed;
    right: 0;
    left: 0;
    background: white;
  }
  .section {
    padding: 15em 0 25em;
  }
  .list {
    flex-direction: column;
  }
  .item {
    flex-basis: auto;
  }
  .number {
    font-size: 11vw;
  }
  input.filter {
    width: 100%;
    font-size: 20px;
    margin-bottom: 15px;
  }
  .count,
  .pages {
    margin-left: 0;
    display: block;
    font-size: 11vw;
    padding: 5px 0;
  }
}
</style>
