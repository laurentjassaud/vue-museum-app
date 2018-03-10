<template>
    <div class="wrapper">

        <i v-if="!listLoaded" class="loader"></i>

        <div class="wrapper" v-if="listLoaded">

            <div class="references" v-if="referencesOeuvres.length">
                <header class="references__header">
                    <h2 class="references__title">{{ listTitle }}</h2>
                    <span class="references__results" v-if="!shortList">{{ countResults }}</span>
                        <router-link 
                            v-if="shortList" 
                            class="references__link" 
                            :to="{name: 'home-category', params: {category: category}}"
                        >
                            Voir toutes les suggestions
                        </router-link>
                </header>
                <ul class="references__list">
                    <reference-list-item 
                        class = "references__item" 
                        v-for = "(reference, index) in referencesOeuvres" 
                        :reference = "reference"
                        :key = "`ref-${index}`"
                    />             
                </ul>
                <div class="references__nav" v-if="!shortList" :class="{'is-hidden' : currentPage === pages}">
                    <button @click="loadMore" class="button">Load More</button>
                </div>
            </div>

            <section v-if="!referencesOeuvres.length" class="not-found">
                <div class="not-found__content">
                    <h2 class="not-found__title" v-if="mode == 'search'">Nothing Found</h2>
                    <h2 class="not-found__title" v-if="mode == 'favorite'">You haven't added any favorite movies</h2>
                </div>
            </section>

        </div>
    </div>
</template>

<script>

import axios from 'axios'
import storage from '../store'
import ReferenceListItem from '@/components/ReferenceListItem.vue'

// Storage for removed favorite item
let removed

export default {

    name: 'ListOeuvres',

    props: [
        'type', 
        'mode', 
        'category', 
        'shortList'
    ],

    data() {
        return {
            referencesOeuvres: [],
            pages: '',
            results: '',
            currentPage: 1,
            listLoaded: false
        }
    },

    components: { ReferenceListItem },

    created() {
        console.log('ListOeuvres')
        this.listTitle = storage.categories[this.category]
        this.fetchCategory()    
    },

    computed: {
        request(){
            return 'https://api.art.rmngp.fr:443/v1/works/suggested?page=1&per_page=12'
        },
        countResults(){
            if(this.results > 1){
                return this.results + ' resultats';
            } else {
                return this.results + ' resultat';
            }
        }
    },

    methods: {
        fetchCategory() {
            axios.get(this.request, { headers: { ApiKey: storage.apikey } })
            .then( (response) => {
                console.log('result =>',response.data.hits)
                let data = response.data.hits.hits
                this.referencesOeuvres = data
                this.pages = 1
                this.results = 12
                this.listLoaded = true
                console.log( this.referencesOeuvres.length)
            })
            .catch( (error) => {
                console.log('error', error)
            })
        },
        loadMore() {
        
        }
    }
}

</script>

<style lang="scss">

    @import "../assets/scss/variables";
    @import "../assets/scss/media-queries";

    .references{
        padding: 10px;
        @include tablet-min{
            padding: 15px;
        }
        @include tablet-landscape-min{
            padding: 25px;
        }
        @include desktop-min{
            padding: 30px;
        }
        &__header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 10px;
            @include tablet-min{
                padding: 23px 15px;
            }
            @include tablet-landscape-min{
                padding: 16px 25px;
            }
            @include desktop-min{
                padding: 8px 30px;
            }
        }
        &__title{
            margin: 0;
            font-size: 16px;
            line-height: 16px;
            color: $c-dark;
            font-weight: 300;
            @include tablet-min{
                font-size: 18px;
                line-height: 18px;
            }
        }
        &__results{
            font-size: 12px;
            font-weight: 300;
            letter-spacing: 0.5px;
            color: rgba($c-dark, 0.5);
        }
        &__link{
            font-size: 12px;
            font-weight: 300;
            letter-spacing: 0.5px;
            color: rgba($c-dark, 0.5);
            text-decoration: none;
            transition: color 0.5s ease;
            &:after{
                content: " →";
            }
            &:hover{
                color: $c-dark;
            }
        }
        &__list{
            padding: 0;
            margin: 0;
            list-style: none;
            display: flex;
            flex-wrap: wrap;
        }
        &__item{
            padding: 10px;
            width: 50%;
            @include tablet-min{
                padding: 15px;
            }
            @include tablet-landscape-min{
                padding: 20px;
                width: 25%;
            }
            @include desktop-min{
                padding: 30px;
                width: 20%;
            }
        }
        &__nav{
            padding: 25px 0;
            text-align: center;
            &.is-hidden{
                display: none;
            }
        }
    }
</style>
