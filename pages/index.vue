<template>
  <div :class="$style.page">
    <div :class="$style.header">
      <input :class="$style.filter" type="text" v-model="search" @keyup="filter()" placeholder="Search" />
    </div>
    <section :class="$style.section">
      <ul :class="$style.list">
        <li :class="$style.item" v-for="dollar in dollars" @mouseover="setPage(dollar.page)">
          <a href :class="$style.number">{{dollar.key}}</a>
        </li>
      </ul>
    </section>
    <footer :class="$style.footer">
      <span :class="$style.phrase">PAGE {{page}} OF 1667 THIS TEN THOUSAND SERIAL NUMBERS ARE PART OF THE ONE MILLION DOLLAR BOOK. THE BOOK CONTAINS TEN THOUSAND PHOTOGRAPHS OF ONE HUNDRED DOLLAR BILLS FOR A TOTAL VALUE OF ONE MILLION UNITED STATES DOLLARS. PRINTED ON 1667 PAGES IN AN EDITION OF 100 NUMBERED AND SIGNED BOOKS. THIS WORK IS PROTECTED BY COPYRIGHT. ANY USE OUTSIDE THE GERMAN COPYRIGHT LAW WITHOUT OBTAINING PRIOR PERMISSION BY SASCHA HUNDORFF IS ILLEGAL. THE PUBLISHER IS RESPONSIBLE FOR CONTENT AND GRAPHICS. ALL RIGHTS RESERVED. THE ONE MILLION DOLLAR BOOK PROJECT IS AN ON DEMAND PRINT PROJECT. THIS DOCUMENT WAS PRINTED IN LOWEST QUALITY ON ONE HUNDRED PERCENT GERMAN RECYCLED PAPER. DATE OF PUBLICATION JULY 12TH 2013 LOS ANGELES CALIFORNIA U.S.A.</span>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      data: {},
      items: [],
      search: '',
      page: '',
      dollars: [],
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

  methods: {
    async getDollars () {
      let dollars = await axios.get('data/onemilliondollar.json')
      this.data = dollars.data
    },
    set () {
      this.items = Object.keys(this.data).map((k) => this.data[k])
      this.dollars = this.items
    },
    setPage (p) {
      this.page = p
    },
    filter () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (this.search.length > 0) {
          this.dollars = this.items.filter(item => (item.key.toLowerCase()).indexOf(this.search.toLowerCase()) > -1)
        } else {
          this.dollars = this.items
        }
      }, 200)
    }
  }
}
</script>

<style module>
.page {
  margin: 5em 2em;
}
.header {
  padding: 2em 0;
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
  text-align: center;
}
.number {
  font-size: 15px;
  display: block;
  &:hover,
  &:active {
    color: red;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  background: white;
  padding: 2em;
}
.phrase {
  font-family: Arial, sans-serif;
  font-weight: 300;
  font-size: 10px;
}
input[type=text].filter {
  width: 200px;
  color: black;
  padding: .3em .5em;
  ::placeholder {
    color: white;
  }
  &,
  &:hover, 
  &:focus {
    border: 1px solid black;
  }
}
</style>
